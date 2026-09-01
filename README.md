# KERAMA Tbilisi — сайт плиточника + админ-панель

Next.js 15 (App Router) · TypeScript · Tailwind CSS · mock-данные.

## Запуск

```bash
cd C:\Users\levka\projects\plitka-tbilisi
npm install      # уже выполнено
npm run dev      # http://localhost:3000
```

Прод-сборка: `npm run build && npm start`.

## Адреса

| Что | URL |
|---|---|
| Главная | http://localhost:3000 |
| Услуги (21 шт.) | /services, /services/[slug] |
| Проекты (7 категорий) | /projects, /projects/[slug] |
| Цены + FAQ | /prices |
| О компании | /about |
| Контакты | /contacts |
| **Админ-панель** | **/admin** |

Админка: `/admin`, `/admin/services`, `/admin/projects`, `/admin/prices`,
`/admin/reviews`, `/admin/leads`, `/admin/faq`, `/admin/settings`.

**Пароля нет** — авторизация не делалась на этом этапе (её ставим вместе с backend).
Ссылка на админку есть в футере сайта.

## Данные

Всё на mock-данных. Правки в админке сохраняются в `localStorage` браузера и
переживают перезагрузку. Кнопка **«Сбросить демо-данные»** — в `/admin/settings`.

Изображения — placeholder с `picsum.photos` (генерируются в `src/lib/images.ts`).

## Структура

```
src/
  app/
    (site)/           публичный сайт (header/footer/модалка заявки)
    admin/            дашборд-лейаут и все CRUD-страницы
  components/
    site/             секции публичного сайта
    admin/            шелл, UI-кит, тосты, провайдер данных
    ui/               Reveal, SectionHeading
  lib/
    types.ts          доменные модели (1:1 переносятся в schema.prisma)
    mock/             демо-данные
    data/
      content.ts      источник данных для публичного сайта (async)
      mock-api.ts     CRUD-API админки (сигнатуры повторяют будущий REST)
      storage.ts      localStorage-хранилище демо-режима
```

## Подключение PostgreSQL + Prisma позже

1. `schema.prisma` пишется по `src/lib/types.ts` (id, published, order уже есть).
2. В `src/lib/data/content.ts` тела функций меняются на `prisma.*.findMany(...)`.
3. В `src/lib/data/mock-api.ts` тела методов меняются на `fetch('/api/...')`.
   Страницы админки и компоненты при этом не меняются.
4. `storage.ts` удаляется.

## Цвета

Акцент — изумрудно-бирюзовый `accent`, база — холодный графит `graphite`,
светлый фон — `stone`. Все три палитры лежат в `tailwind.config.ts`;
поменять фирменный цвет = поменять значения в блоке `accent`.
