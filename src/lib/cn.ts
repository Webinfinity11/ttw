/** Компактный аналог clsx — склеивает классы, отбрасывая пустые значения. */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}

/** Цена в лари: 80 -> «80 ₾» */
export function formatPrice(value: number): string {
  return `${new Intl.NumberFormat('ru-RU').format(value)} ₾`;
}

/** ISO-дата -> «31 авг 2026» */
export function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/** ISO-дата -> «31 авг, 09:12» */
export function formatDateTime(value: string): string {
  return new Date(value).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** «Нино Гвазава» -> «НГ» — для аватара без фотографии. */
export function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}
