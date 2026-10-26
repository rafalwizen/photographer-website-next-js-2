export interface Photo {
    id: number;
    src: string;
    size: "small" | "medium" | "large";
    alt: string;
}

function extractName(photo: Photo): string {
    return photo.src.replace('/images/gallery/', '').replace('.webp', '');
}

export function getThumbSrc(photo: Photo): string {
    return `/images/gallery/thumbs/${extractName(photo)}.avif`;
}

export function getMidSrc(photo: Photo): string {
    return `/images/gallery/${extractName(photo)}-mid.avif`;
}

export function getFullSrc(photo: Photo): string {
    return `/images/gallery/${extractName(photo)}.avif`;
}

export const photos: Photo[] = [
    {id: 1, src: "/images/gallery/1-1.webp", size: "medium", alt: "Fotografia ślubna – ceremonia zaślubin w kościele, para młoda przed ołtarzem"},
    {id: 2, src: "/images/gallery/1-4.webp", size: "large", alt: "Fotografia ślubna – ceremonia zaślubin w kościele, przysięga małżeńska"},
    {id: 3, src: "/images/gallery/1-3.webp", size: "small", alt: "Fotografia ślubna – ceremonia zaślubin w kościele, moment błogosławieństwa"},
    {id: 4, src: "/images/gallery/1-4a.webp", size: "small", alt: "Fotografia ślubna – ceremonia zaślubin w kościele, kadr z bliska na parę młodą"},
    {id: 5, src: "/images/gallery/1-6.webp", size: "small", alt: "Fotografia ślubna – ceremonia zaślubin w kościele, wyjście pary młodej"},
    {id: 6, src: "/images/gallery/3-4.webp", size: "large", alt: "Fotografia ślubna – portrety pary młodej w plenerze, ogólny plan"},
    {id: 7, src: "/images/gallery/3-2.webp", size: "medium", alt: "Fotografia ślubna – portrety pary młodej w plenerze, kadr z bliska"},
    {id: 8, src: "/images/gallery/3-1.webp", size: "small", alt: "Fotografia ślubna – portrety pary młodej w plenerze, zdjęcie w naturalnym świetle"},
    {id: 9, src: "/images/gallery/4-3.webp", size: "large", alt: "Fotografia ślubna – przyjęcie weselne, pierwszy taniec nowożeńców"},
    {id: 10, src: "/images/gallery/4-1.webp", size: "medium", alt: "Fotografia ślubna – przyjęcie weselne, zabawa weselna na parkiecie"},
    {id: 11, src: "/images/gallery/4-2.webp", size: "small", alt: "Fotografia ślubna – przyjęcie weselne, kadr reportażowy z gośćmi"},
    {id: 12, src: "/images/gallery/4-0.webp", size: "small", alt: "Fotografia ślubna – przyjęcie weselne, tort weselny i toasty"},
    {id: 13, src: "/images/gallery/4-7.webp", size: "large", alt: "Fotografia ślubna – przyjęcie weselne, emocje i zabawa do białego rana"},
    {id: 14, src: "/images/gallery/4-4.webp", size: "medium", alt: "Fotografia ślubna – przyjęcie weselne, rzut bukietem panny młodej"},
    {id: 15, src: "/images/gallery/5-2.webp", size: "medium", alt: "Fotografia ślubna – przygotowania panny młodej, makijaż i fryzura"},
    {id: 16, src: "/images/gallery/5-1.webp", size: "large", alt: "Fotografia ślubna – przygotowania panny młodej, suknia ślubna i detale"},
    {id: 17, src: "/images/gallery/6-1.webp", size: "small", alt: "Fotografia ślubna – ślub cywilny, wymiana obrączek"},
    {id: 18, src: "/images/gallery/6-2.webp", size: "small", alt: "Fotografia ślubna – ślub cywilny, przysięga przed urzędnikiem"},
    {id: 19, src: "/images/gallery/6-3.webp", size: "small", alt: "Fotografia ślubna – ślub cywilny, pierwszy pocałunek jako małżeństwo"},
    {id: 20, src: "/images/gallery/6-4.webp", size: "medium", alt: "Fotografia ślubna – ślub cywilny, podpisywanie aktu małżeństwa"},
    {id: 21, src: "/images/gallery/6-5.webp", size: "large", alt: "Fotografia ślubna – ślub cywilny, kadr na parę młodą"},
    {id: 22, src: "/images/gallery/7-1.webp", size: "large", alt: "Fotografia ślubna – plener ślubny o zachodzie słońca, kadr z bliska"},
    {id: 23, src: "/images/gallery/7-2.webp", size: "small", alt: "Fotografia ślubna – plener ślubny o zachodzie słońca, sylwetki pary młodej"},
    {id: 24, src: "/images/gallery/7-3.webp", size: "small", alt: "Fotografia ślubna – plener ślubny, zdjęcie w złotej godzinie"},
    {id: 25, src: "/images/gallery/7-4.webp", size: "small", alt: "Fotografia ślubna – plener ślubny, para młoda w otoczeniu natury"},
    {id: 26, src: "/images/gallery/7-5.webp", size: "small", alt: "Fotografia ślubna – plener ślubny, romantyczny kadr w naturalnym świetle"},
    {id: 27, src: "/images/gallery/8-1.webp", size: "medium", alt: "Fotografia ślubna – reportaż z wesela, goście i toasty"},
    {id: 28, src: "/images/gallery/8-2.webp", size: "small", alt: "Fotografia ślubna – reportaż z wesela, niezaplanowane emocje"},
    {id: 29, src: "/images/gallery/9-1.webp", size: "small", alt: "Fotografia ślubna – detale ślubne, obrączki na bliskim planie"},
    {id: 30, src: "/images/gallery/9-2.webp", size: "medium", alt: "Fotografia ślubna – detale ślubne, bukiet panny młodej"},
    {id: 31, src: "/images/gallery/9-4.webp", size: "large", alt: "Fotografia ślubna – portret panny młodej w sukni ślubnej"},
    {id: 32, src: "/images/gallery/9-3.webp", size: "medium", alt: "Fotografia ślubna – portret pana młodego w garniturze"},
    {id: 33, src: "/images/gallery/9-6.webp", size: "small", alt: "Fotografia ślubna – para młoda razem, kadr z bliska"},
    {id: 34, src: "/images/gallery/9-7.webp", size: "medium", alt: "Fotografia ślubna – para młoda razem, ujęcie ogólne"},
    {id: 35, src: "/images/gallery/9-8.webp", size: "small", alt: "Fotografia ślubna – sesja ślubna w plenerze"},
    {id: 36, src: "/images/gallery/9-9.webp", size: "large", alt: "Fotografia ślubna – detale ślubne, obrączki, bukiet i podkółki"},
    {id: 37, src: "/images/gallery/9-10.webp", size: "medium", alt: "Fotografia ślubna – para młoda, kadr pełen emocji"},
    {id: 38, src: "/images/gallery/9-10a.webp", size: "small", alt: "Fotografia ślubna – kadr reportażowy z dnia ślubu"},
    {id: 39, src: "/images/gallery/9-11.webp", size: "large", alt: "Fotografia ślubna – zdjęcie ślubne w naturalnym świetle"},
    {id: 40, src: "/images/gallery/9-12.webp", size: "medium", alt: "Fotografia ślubna – para młoda podczas sesji ślubnej"},
    {id: 41, src: "/images/gallery/9-13.webp", size: "large", alt: "Fotografia ślubna – wzruszający moment dnia ślubu"},
    {id: 42, src: "/images/gallery/9-14.webp", size: "medium", alt: "Fotografia ślubna – spojrzenia pary młodej, kadr z bliska"},
    {id: 43, src: "/images/gallery/9-15.webp", size: "small", alt: "Fotografia ślubna – detale weselne na stole"},
    {id: 44, src: "/images/gallery/9-15a.webp", size: "small", alt: "Fotografia ślubna – para młoda w plenerze, ujęcie z drugiego planu"},
    {id: 45, src: "/images/gallery/10-1.webp", size: "small", alt: "Fotografia ślubna – czarno-biały portret pary młodej"},
    {id: 46, src: "/images/gallery/10-3.webp", size: "large", alt: "Fotografia ślubna – czarno-białe zdjęcie pary młodej w plenerze"},
    {id: 47, src: "/images/gallery/10-5.webp", size: "small", alt: "Fotografia ślubna – czarno-biały portret panny młodej"},
    {id: 48, src: "/images/gallery/10-4.webp", size: "large", alt: "Fotografia ślubna – czarno-biała fotografia ślubna, kadr z bliska"},
    {id: 49, src: "/images/gallery/10-5a.webp", size: "small", alt: "Fotografia ślubna – czarno-białe portrety ślubne w naturalnym świetle"},
    {id: 50, src: "/images/gallery/10-8.webp", size: "small", alt: "Fotografia ślubna – czarno-białe zdjęcie pary młodej, ujęcie ogólne"},
    {id: 51, src: "/images/gallery/10-7.webp", size: "small", alt: "Fotografia ślubna – czarno-biały kadr reportażowy z dnia ślubu"},
    {id: 52, src: "/images/gallery/10-6.webp", size: "large", alt: "Fotografia ślubna – czarno-biała sesja ślubna, kadr pełen emocji"},
    {id: 53, src: "/images/gallery/10-10.webp", size: "small", alt: "Fotografia ślubna – czarno-białe portrety pary młodej w plenerze"},
];
