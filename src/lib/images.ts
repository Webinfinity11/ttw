/**
 * Фотографии для демо-контента.
 *
 * Все снимки — реальные фото плитки, плиточных работ и готовых интерьеров
 * (Unsplash, авторы в public/tiles/CREDITS.txt). Лежат локально в /public/gallery.
 *
 * `photo(seed)` подбирает кадр по смыслу: по ключевым словам в seed
 * определяется тема, внутри темы кадр выбирается детерминированно —
 * один и тот же seed всегда даёт одну и ту же картинку.
 *
 * Когда появится загрузка файлов в админке, эти пути просто заменятся
 * ссылками из хранилища.
 */

const POOLS = {
  bath: ['bath-1.jpg', 'bath-2.jpg', 'bath-3.jpg', 'bath-4.jpg', 'bath-5.jpg'],
  kitchen: ['kitchen-1.jpg', 'kitchen-2.jpg', 'kitchen-3.jpg'],
  floor: ['floor-1.jpg', 'floor-2.jpg', 'floor-3.jpg', 'floor-4.jpg', 'floor-5.jpg'],
  mosaic: ['mosaic-1.jpg', 'mosaic-2.jpg', 'mosaic-3.jpg'],
  terrace: ['terrace-1.jpg', 'terrace-2.jpg', 'terrace-3.jpg'],
  stairs: ['stairs-1.jpg', 'stairs-2.jpg', 'stairs-3.jpg'],
  work: ['work-1.jpg', 'work-2.jpg', 'work-3.jpg', 'work-4.jpg', 'work-5.jpg', 'work-6.jpg'],
  texture: ['texture-1.jpg', 'texture-2.jpg', 'texture-3.jpg', 'texture-4.jpg'],
} as const;

type PoolName = keyof typeof POOLS;

/** Порядок важен: более узкие правила идут первыми. */
const RULES: Array<[RegExp, PoolName]> = [
  [/bath|vann|sanuz|dush|shower|guest|vake|graph/, 'bath'],
  [/kitchen|kuh|fartuk|island|backsplash|sab/, 'kitchen'],
  [/mosaic|mos-|mozaika/, 'mosaic'],
  [/terr|ter-|balc|balkon/, 'terrace'],
  [/stair|lestn|entry|stupen|step/, 'stairs'],
  [/xxl|slab|porcelain|keramogranit|hall|holl|floor|marble|mramor/, 'floor'],
  [
    /work|tiler|laying|demol|screed|level|waterproof|epoxy|grout|cut|seal|niche|hole|master|about|prep|45/,
    'work',
  ],
];

function hash(value: string): number {
  let result = 0;
  for (let i = 0; i < value.length; i += 1) {
    result = (result * 31 + value.charCodeAt(i)) >>> 0;
  }
  return result;
}

export function photo(seed: string, _width?: number, _height?: number): string {
  const key = seed.toLowerCase();
  const pool: PoolName = RULES.find(([pattern]) => pattern.test(key))?.[1] ?? 'texture';
  const list = POOLS[pool];
  return `/gallery/${list[hash(key) % list.length]}`;
}

/** Прямая ссылка на кадр из набора — когда нужен конкретный снимок. */
export function galleryPhoto(name: string): string {
  return `/gallery/${name}`;
}
