import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, parse } from 'path';

const PUBLIC = 'public/images';
const GALLERY = join(PUBLIC, 'gallery');
const THUMBS = join(GALLERY, 'thumbs');

const AVIF_QUALITY = 65;
const THUMB_AVIF_QUALITY = 60;
const THUMB_WEBP_QUALITY = 70;
const THUMB_MAX_WIDTH = 600;

async function generateHeroAvif() {
    for (const name of ['background', 'background-mobile']) {
        const src = join(PUBLIC, `${name}.webp`);
        const dest = join(PUBLIC, `${name}.avif`);
        await sharp(src)
            .avif({ quality: AVIF_QUALITY, effort: 6 })
            .toFile(dest);
        const stats = await sharp(dest).metadata();
        console.log(`  ${name}.avif: ${stats.width}x${stats.height}`);
    }
}

async function generateGalleryVariants() {
    await mkdir(THUMBS, { recursive: true });

    const files = await readdir(GALLERY);
    const webpFiles = files.filter(f => f.endsWith('.webp'));

    for (const file of webpFiles) {
        const { name } = parse(file);
        const src = join(GALLERY, file);

        // Thumbnail AVIF (max 600px wide)
        await sharp(src)
            .resize(THUMB_MAX_WIDTH, null, { withoutEnlargement: true })
            .avif({ quality: THUMB_AVIF_QUALITY, effort: 6 })
            .toFile(join(THUMBS, `${name}.avif`));

        // Thumbnail WebP fallback
        await sharp(src)
            .resize(THUMB_MAX_WIDTH, null, { withoutEnlargement: true })
            .webp({ quality: THUMB_WEBP_QUALITY })
            .toFile(join(THUMBS, `${name}.webp`));

        // Full-res AVIF for lightbox
        await sharp(src)
            .avif({ quality: AVIF_QUALITY, effort: 6 })
            .toFile(join(GALLERY, `${name}.avif`));
    }
    console.log(`  Generated ${webpFiles.length * 3} gallery variants`);
}

async function generateProfileAvif() {
    const src = join(PUBLIC, 'profile_picture.jpg');
    await sharp(src)
        .resize(600, 800, { withoutEnlargement: true })
        .avif({ quality: AVIF_QUALITY, effort: 6 })
        .toFile(join(PUBLIC, 'profile_picture.avif'));
    console.log('  profile_picture.avif');
}

console.log('Generating image variants...');
await generateHeroAvif();
await generateGalleryVariants();
await generateProfileAvif();
console.log('Done!');
