/**
 * Демо-изображения.
 *
 * Все картинки приходят из одного хелпера — чтобы позже заменить их на
 * реальные загруженные файлы, достаточно поменять только этот модуль
 * (или сами URL в данных).
 */
export function photo(seed: string, width = 1200, height = 900): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}
