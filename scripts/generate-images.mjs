import sharp from 'sharp';
import { readdir, mkdir, stat, readFile, writeFile } from 'fs/promises';
import { join, parse } from 'path';

const PUBLIC = 'public/images';
const GALLERY = join(PUBLIC, 'gallery');
const THUMBS = join(GALLERY, 'thumbs');

// Manifest of source files already converted; lets reruns skip unchanged
// sources. Local only — gitignored, never deployed.
const CACHE_FILE = 'scripts/.image-cache.json';

const AVIF_QUALITY = 65;
const THUMB_AVIF_QUALITY = 60;
const THUMB_WEBP_QUALITY = 70;
const THUMB_MAX_WIDTH = 600;
const MID_AVIF_QUALITY = 60;
const MID_MAX_WIDTH = 1200;
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const OG_JPEG_QUALITY = 82;

// Every parameter that affects output bytes. A mismatch with the cached
// manifest invalidates the whole cache and forces full regeneration.
const GENERATION_PARAMS = {
    AVIF_QUALITY,
    THUMB_AVIF_QUALITY,
    THUMB_WEBP_QUALITY,
    THUMB_MAX_WIDTH,
    MID_AVIF_QUALITY,
    MID_MAX_WIDTH,
    OG_WIDTH,
    OG_HEIGHT,
    OG_JPEG_QUALITY,
};

const stats = { generated: 0, skipped: 0 };

async function loadCache() {
    try {
        const data = JSON.parse(await readFile(CACHE_FILE, 'utf8'));
        if (
            JSON.stringify(data.params) !== JSON.stringify(GENERATION_PARAMS)
        ) {
            console.log('  Parameters changed, regenerating all variants');
            return {};
        }
        return data;
    } catch {
        return {};
    }
}

async function saveCache(cache) {
    await writeFile(
        CACHE_FILE,
        JSON.stringify({ params: GENERATION_PARAMS, entries: cache.entries })
    );
}

async function fileState(path) {
    const { mtimeMs, size } = await stat(path);
    return { mtimeMs, size };
}

// A source is up to date when its mtime/size match the manifest entry
// and every expected output file still exists on disk.
async function isUpToDate(cache, src, outputs) {
    const entry = cache.entries?.[src];
    if (!entry) return false;
    try {
        const current = await fileState(src);
        if (
            current.mtimeMs !== entry.mtimeMs ||
            current.size !== entry.size
        ) {
            return false;
        }
        for (const output of outputs) await stat(output);
        return true;
    } catch {
        return false;
    }
}

async function remember(cache, src) {
    cache.entries ??= {};
    cache.entries[src] = await fileState(src);
}

async function generateHeroAvif(cache) {
    for (const name of ['background', 'background-mobile']) {
        const src = join(PUBLIC, `${name}.webp`);
        const dest = join(PUBLIC, `${name}.avif`);
        if (await isUpToDate(cache, src, [dest])) {
            stats.skipped++;
            continue;
        }
        await sharp(src)
            .avif({ quality: AVIF_QUALITY, effort: 6 })
            .toFile(dest);
        const meta = await sharp(dest).metadata();
        console.log(`  ${name}.avif: ${meta.width}x${meta.height}`);
        await remember(cache, src);
        stats.generated++;
    }
}

async function generateGalleryVariants(cache) {
    await mkdir(THUMBS, { recursive: true });

    const files = await readdir(GALLERY);
    const webpFiles = files.filter(f => f.endsWith('.webp'));

    for (const file of webpFiles) {
        const { name } = parse(file);
        const src = join(GALLERY, file);
        const outputs = [
            join(THUMBS, `${name}.avif`),
            join(THUMBS, `${name}.webp`),
            join(GALLERY, `${name}-mid.avif`),
            join(GALLERY, `${name}.avif`),
        ];
        if (await isUpToDate(cache, src, outputs)) {
            stats.skipped += outputs.length;
            continue;
        }

        // Thumbnail AVIF (max 600px wide)
        await sharp(src)
            .resize(THUMB_MAX_WIDTH, null, { withoutEnlargement: true })
            .avif({ quality: THUMB_AVIF_QUALITY, effort: 6 })
            .toFile(outputs[0]);

        // Thumbnail WebP fallback
        await sharp(src)
            .resize(THUMB_MAX_WIDTH, null, { withoutEnlargement: true })
            .webp({ quality: THUMB_WEBP_QUALITY })
            .toFile(outputs[1]);

        // Mid-size AVIF for desktop gallery tiles (max 1200px wide)
        await sharp(src)
            .resize(MID_MAX_WIDTH, null, { withoutEnlargement: true })
            .avif({ quality: MID_AVIF_QUALITY, effort: 6 })
            .toFile(outputs[2]);

        // Full-res AVIF for lightbox
        await sharp(src)
            .avif({ quality: AVIF_QUALITY, effort: 6 })
            .toFile(outputs[3]);

        await remember(cache, src);
        stats.generated += outputs.length;
    }
}

async function generateOgImage(cache) {
    // Open Graph image 1200x630. JPEG for social scraper compatibility
    // (Facebook/WhatsApp/LinkedIn do not reliably support AVIF/WebP).
    const src = join(PUBLIC, 'background.webp');
    const dest = join(PUBLIC, 'og-image.jpg');
    if (await isUpToDate(cache, src, [dest])) {
        stats.skipped++;
        return;
    }
    await sharp(src)
        .resize(OG_WIDTH, OG_HEIGHT, { fit: 'cover' })
        .jpeg({ quality: OG_JPEG_QUALITY, mozjpeg: true })
        .toFile(dest);
    console.log('  og-image.jpg: 1200x630');
    await remember(cache, src);
    stats.generated++;
}

async function generateProfileAvif(cache) {
    const src = join(PUBLIC, 'profile_picture.jpg');
    const dest = join(PUBLIC, 'profile_picture.avif');
    if (await isUpToDate(cache, src, [dest])) {
        stats.skipped++;
        return;
    }
    await sharp(src)
        .resize(600, 800, { withoutEnlargement: true })
        .avif({ quality: AVIF_QUALITY, effort: 6 })
        .toFile(dest);
    console.log('  profile_picture.avif');
    await remember(cache, src);
    stats.generated++;
}

console.log('Generating image variants...');
const cache = await loadCache();
await generateHeroAvif(cache);
await generateGalleryVariants(cache);
await generateOgImage(cache);
await generateProfileAvif(cache);
await saveCache(cache);
console.log(
    `Done! ${stats.generated} generated, ${stats.skipped} skipped (up to date)`
);
