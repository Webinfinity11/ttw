/**
 * Доменные модели проекта.
 *
 * Эти типы намеренно описаны так, чтобы их можно было один в один перенести
 * в schema.prisma: у каждой сущности есть строковый `id`, флаг публикации и
 * (там где это важно) поле `order` для ручной сортировки.
 */

export type ID = string;

export type ServiceCategory =
  | 'Укладка'
  | 'Под ключ'
  | 'Подготовка'
  | 'Гидроизоляция'
  | 'Обработка'
  | 'Демонтаж'
  | 'Экстерьер';

export interface Service {
  id: ID;
  slug: string;
  title: string;
  description: string;
  /** Развёрнутое описание для страницы услуги */
  details?: string;
  image: string;
  /** Цена «от», в лари */
  price: number;
  unit: string;
  category: ServiceCategory;
  features: string[];
  published: boolean;
  order: number;
}

export type ProjectCategory =
  | 'Ванные'
  | 'Кухни'
  | 'Керамогранит'
  | 'XXL'
  | 'Мозаика'
  | 'Террасы'
  | 'Лестницы';

export interface Project {
  id: ID;
  slug: string;
  title: string;
  description: string;
  category: ProjectCategory;
  /** Обложка */
  image: string;
  /** Дополнительные фотографии */
  images: string[];
  /** Площадь, м² */
  area: number;
  materials: string;
  location: string;
  duration: string;
  published: boolean;
  order: number;
}

export interface PriceItem {
  id: ID;
  title: string;
  price: number;
  unit: string;
  category: string;
  note?: string;
  published: boolean;
  order: number;
}

export interface Review {
  id: ID;
  name: string;
  role?: string;
  text: string;
  rating: number;
  photo: string;
  date: string;
  published: boolean;
}

export type LeadStatus = 'new' | 'in_progress' | 'contacted' | 'done';

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'Новая',
  in_progress: 'В работе',
  contacted: 'Связались',
  done: 'Завершена',
};

export interface Lead {
  id: ID;
  name: string;
  phone: string;
  service: string;
  message?: string;
  date: string;
  status: LeadStatus;
}

export interface FaqItem {
  id: ID;
  question: string;
  answer: string;
  published: boolean;
  order: number;
}

export interface SiteSettings {
  companyName: string;
  phone: string;
  whatsapp: string;
  telegram: string;
  email: string;
  city: string;
  workingHours: string;
  address: string;
  about: string;
}

/** Полный снимок данных — то, что позже будет отдавать реальный backend. */
export interface DataSnapshot {
  services: Service[];
  projects: Project[];
  prices: PriceItem[];
  reviews: Review[];
  leads: Lead[];
  faq: FaqItem[];
  settings: SiteSettings;
}
