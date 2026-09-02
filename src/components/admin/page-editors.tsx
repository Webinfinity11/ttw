'use client';

import type {
  AboutPageContent,
  HomeContent,
  PageIntro,
  Perk,
  ProcessStep,
  ProjectsPageContent,
  ServicesPageContent,
  Stat,
} from '@/lib/types';
import { AreaRow, Block, LineList, PairList, PhotoList, TextRow } from './block-editors';
import { PhotoField } from './photo-picker';

/* ------------------------------ Общие поля -------------------------------- */

/** Шапка внутренней страницы — одинакова у всех разделов сайта. */
export function IntroFields({
  value,
  onChange,
}: {
  value: PageIntro;
  onChange(next: PageIntro): void;
}) {
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <TextRow
          label="Надпись над заголовком"
          value={value.eyebrow}
          onChange={(eyebrow) => onChange({ ...value, eyebrow })}
        />
        <TextRow
          label="Подпись в хлебных крошках"
          hint="Показывается вверху страницы после «Главная /»."
          value={value.breadcrumb}
          onChange={(breadcrumb) => onChange({ ...value, breadcrumb })}
        />
      </div>

      <TextRow
        label="Заголовок страницы"
        value={value.title}
        onChange={(title) => onChange({ ...value, title })}
      />

      <AreaRow
        label="Описание под заголовком"
        value={value.description}
        onChange={(description) => onChange({ ...value, description })}
      />

      <TextRow
        label="Заголовок вкладки браузера"
        hint="Он же показывается ссылкой в результатах поиска Google."
        value={value.metaTitle}
        onChange={(metaTitle) => onChange({ ...value, metaTitle })}
      />
    </>
  );
}

/* -------------------------------- Главная --------------------------------- */

export function HomeEditor({
  value,
  onChange,
}: {
  value: HomeContent;
  onChange(next: HomeContent): void;
}) {
  function set<K extends keyof HomeContent>(key: K, next: HomeContent[K]) {
    onChange({ ...value, [key]: next });
  }

  return (
    <>
      <Block
        title="Первый экран"
        hint="Самый верх главной: крупный заголовок, четыре подписи, лента плит, счётчики и кнопки."
      >
        <LineList
          label="Заголовок"
          hint="Каждая строка выезжает отдельно — разбейте фразу так, как она должна переноситься."
          items={value.hero.headline}
          onChange={(headline) => set('hero', { ...value.hero, headline })}
          placeholder="УКЛАДКА ПЛИТКИ"
        />

        <LineList
          label="Подписи под заголовком"
          hint="Идут в строку под чертой. Четыре штуки ложатся ровно в ширину экрана."
          items={value.hero.notes}
          onChange={(notes) => set('hero', { ...value.hero, notes })}
          addLabel="Добавить подпись"
        />

        <PhotoList
          label="Лента плит"
          hint="Кадры в один ряд под подписями. Ровно четыре смотрятся лучше всего — ряд рассчитан на них."
          items={value.hero.photos}
          onChange={(photos) => set('hero', { ...value.hero, photos })}
        />

        <PairList<Stat>
          label="Счётчики"
          hint="Цифры прокручиваются при загрузке. Знак «+» и процент пишите прямо в значении."
          items={value.hero.stats}
          onChange={(stats) => set('hero', { ...value.hero, stats })}
          blank={{ value: '', label: '' }}
          fields={[
            { key: 'value', label: 'Значение — 12+' },
            { key: 'label', label: 'Подпись — лет опыта с плиткой' },
          ]}
          addLabel="Добавить счётчик"
        />

        <div className="grid gap-5 md:grid-cols-2">
          <TextRow
            label="Кнопка заявки"
            value={value.hero.primaryCta}
            onChange={(primaryCta) => set('hero', { ...value.hero, primaryCta })}
          />
          <TextRow
            label="Кнопка на проекты"
            value={value.hero.secondaryCta}
            onChange={(secondaryCta) => set('hero', { ...value.hero, secondaryCta })}
          />
        </div>

        <TextRow
          label="Приписка у кнопок"
          value={value.hero.footnote}
          onChange={(footnote) => set('hero', { ...value.hero, footnote })}
        />
      </Block>

      <Block
        title="Секция «Сервисы»"
        hint="Только шапка секции. Сами услуги — в разделе «Услуги», их количество считается само."
      >
        <TextRow
          label="Заголовок"
          value={value.services.title}
          onChange={(title) => set('services', { ...value.services, title })}
        />
        <AreaRow
          label="Пояснение справа"
          value={value.services.subtitle}
          onChange={(subtitle) => set('services', { ...value.services, subtitle })}
        />
        <TextRow
          label="Подпись под цифрой"
          hint="Цифру подставляет сайт — это количество опубликованных услуг."
          value={value.services.counterLabel}
          onChange={(counterLabel) => set('services', { ...value.services, counterLabel })}
        />
      </Block>

      <Block title="Блок «О компании»" hint="Фотография слева, текст и принципы справа.">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-5">
            <TextRow
              label="Надпись над заголовком"
              value={value.about.eyebrow}
              onChange={(eyebrow) => set('about', { ...value.about, eyebrow })}
            />
            <LineList
              label="Заголовок"
              hint="Разбивается на строки так же, как на первом экране."
              items={value.about.title}
              onChange={(title) => set('about', { ...value.about, title })}
            />
            <AreaRow
              label="Текст"
              rows={5}
              value={value.about.text}
              onChange={(text) => set('about', { ...value.about, text })}
            />
          </div>

          <div className="space-y-5">
            <div>
              <span className="field-label">Фотография</span>
              <PhotoField
                src={value.about.photo.src}
                alt={value.about.photo.alt}
                onChange={(photo) => set('about', { ...value.about, photo })}
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextRow
                label="Цифра на кадре"
                value={value.about.badgeValue}
                onChange={(badgeValue) => set('about', { ...value.about, badgeValue })}
              />
              <TextRow
                label="Подпись под цифрой"
                value={value.about.badgeLabel}
                onChange={(badgeLabel) => set('about', { ...value.about, badgeLabel })}
              />
            </div>
            <TextRow
              label="Надпись на ссылке"
              value={value.about.linkLabel}
              onChange={(linkLabel) => set('about', { ...value.about, linkLabel })}
            />
          </div>
        </div>

        <PairList<Perk>
          label="Принципы"
          items={value.about.perks}
          onChange={(perks) => set('about', { ...value.about, perks })}
          blank={{ title: '', text: '' }}
          fields={[
            { key: 'title', label: 'Название — ФИКСИРОВАННАЯ СМЕТА' },
            { key: 'text', label: 'Пояснение', multiline: true },
          ]}
          addLabel="Добавить принцип"
        />

        <PairList<Stat>
          label="Цифры внизу блока"
          items={value.about.facts}
          onChange={(facts) => set('about', { ...value.about, facts })}
          blank={{ value: '', label: '' }}
          fields={[
            { key: 'value', label: 'Значение — 480+' },
            { key: 'label', label: 'Подпись — объектов' },
          ]}
          addLabel="Добавить цифру"
        />
      </Block>

      <Block
        title="Секция «Проекты»"
        hint="Только шапка. Сами проекты — в разделе «Проекты», на главную попадают первые шесть."
      >
        <TextRow
          label="Заголовок"
          value={value.portfolio.title}
          onChange={(title) => set('portfolio', { ...value.portfolio, title })}
        />
        <AreaRow
          label="Пояснение справа"
          value={value.portfolio.subtitle}
          onChange={(subtitle) => set('portfolio', { ...value.portfolio, subtitle })}
        />
        <TextRow
          label="Подпись под цифрой"
          value={value.portfolio.counterLabel}
          onChange={(counterLabel) => set('portfolio', { ...value.portfolio, counterLabel })}
        />
      </Block>

      <Block title="Блок «Почему мы»" hint="Нумерация пунктов проставляется сама по порядку.">
        <TextRow
          label="Заголовок"
          value={value.advantages.title}
          onChange={(title) => set('advantages', { ...value.advantages, title })}
        />
        <AreaRow
          label="Пояснение справа"
          value={value.advantages.subtitle}
          onChange={(subtitle) => set('advantages', { ...value.advantages, subtitle })}
        />
        <PairList<Perk>
          label="Пункты"
          items={value.advantages.items}
          onChange={(items) => set('advantages', { ...value.advantages, items })}
          blank={{ title: '', text: '' }}
          fields={[
            { key: 'title', label: 'Название — ГИДРОИЗОЛЯЦИЯ' },
            { key: 'text', label: 'Пояснение', multiline: true },
          ]}
        />
      </Block>

      <Block title="Галерея внизу" hint="Лента с перелистыванием в самом низу главной.">
        <div className="grid gap-5 md:grid-cols-2">
          <TextRow
            label="Надпись над заголовком"
            value={value.carousel.eyebrow}
            onChange={(eyebrow) => set('carousel', { ...value.carousel, eyebrow })}
          />
          <TextRow
            label="Заголовок"
            value={value.carousel.title}
            onChange={(title) => set('carousel', { ...value.carousel, title })}
          />
        </div>
        <PhotoList
          label="Кадры ленты"
          hint="Порядок кадров — порядок перелистывания. Описание можно не заполнять: кадры декоративные."
          items={value.carousel.photos}
          onChange={(photos) => set('carousel', { ...value.carousel, photos })}
          withAlt={false}
        />
      </Block>
    </>
  );
}

/* -------------------------------- Услуги ---------------------------------- */

export function ServicesEditor({
  value,
  onChange,
}: {
  value: ServicesPageContent;
  onChange(next: ServicesPageContent): void;
}) {
  const detail = value.detail;

  function setDetail<K extends keyof typeof detail>(key: K, next: (typeof detail)[K]) {
    onChange({ ...value, detail: { ...detail, [key]: next } });
  }

  return (
    <>
      <Block
        title="Шапка страницы со списком услуг"
        hint="Сами услуги — их названия, цены, описания и фотографии — в разделе «Услуги» слева."
      >
        <IntroFields value={value.intro} onChange={(intro) => onChange({ ...value, intro })} />
      </Block>

      <Block
        title="Страница отдельной услуги"
        hint="Эти подписи одинаковы для всех услуг. Название, цена и текст каждой услуги правятся в разделе «Услуги»."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <TextRow
            label="Заголовок над ценой"
            value={detail.priceLabel}
            onChange={(next) => setDetail('priceLabel', next)}
          />
          <TextRow
            label="Надпись на кнопке заявки"
            value={detail.ctaLabel}
            onChange={(next) => setDetail('ctaLabel', next)}
          />
        </div>

        <AreaRow
          label="Примечание под ценой"
          hint="Объясняет, почему цена указана «от»."
          value={detail.priceNote}
          onChange={(next) => setDetail('priceNote', next)}
        />

        <div className="grid gap-5 md:grid-cols-3">
          <TextRow
            label="Подпись у телефона"
            value={detail.phoneLabel}
            onChange={(next) => setDetail('phoneLabel', next)}
          />
          <TextRow
            label="Заголовок «смежные услуги»"
            value={detail.relatedTitle}
            onChange={(next) => setDetail('relatedTitle', next)}
          />
          <TextRow
            label="Ссылка на все услуги"
            value={detail.relatedLinkLabel}
            onChange={(next) => setDetail('relatedLinkLabel', next)}
          />
        </div>
      </Block>
    </>
  );
}

/* -------------------------------- Проекты --------------------------------- */

export function ProjectsEditor({
  value,
  onChange,
}: {
  value: ProjectsPageContent;
  onChange(next: ProjectsPageContent): void;
}) {
  const detail = value.detail;

  function setDetail<K extends keyof typeof detail>(key: K, next: (typeof detail)[K]) {
    onChange({ ...value, detail: { ...detail, [key]: next } });
  }

  return (
    <>
      <Block
        title="Шапка страницы портфолио"
        hint="Сами объекты — их названия, фотографии, площадь и сроки — в разделе «Проекты» слева."
      >
        <IntroFields value={value.intro} onChange={(intro) => onChange({ ...value, intro })} />
      </Block>

      <Block
        title="Страница отдельного проекта"
        hint="Подписи одинаковы для всех объектов. Значения к ним подставляются из карточки проекта."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <TextRow
            label="Подпись «площадь»"
            value={detail.areaLabel}
            onChange={(next) => setDetail('areaLabel', next)}
          />
          <TextRow
            label="Подпись «категория»"
            value={detail.categoryLabel}
            onChange={(next) => setDetail('categoryLabel', next)}
          />
          <TextRow
            label="Подпись «срок»"
            value={detail.durationLabel}
            onChange={(next) => setDetail('durationLabel', next)}
          />
          <TextRow
            label="Подпись «локация»"
            value={detail.locationLabel}
            onChange={(next) => setDetail('locationLabel', next)}
          />
        </div>

        <TextRow
          label="Заголовок блока материалов"
          value={detail.materialsTitle}
          onChange={(next) => setDetail('materialsTitle', next)}
        />

        <div className="grid gap-5 md:grid-cols-2">
          <TextRow
            label="Заголовок призыва к заявке"
            value={detail.ctaTitle}
            onChange={(next) => setDetail('ctaTitle', next)}
          />
          <TextRow
            label="Надпись на кнопке"
            value={detail.ctaLabel}
            onChange={(next) => setDetail('ctaLabel', next)}
          />
        </div>

        <AreaRow
          label="Текст призыва к заявке"
          value={detail.ctaText}
          onChange={(next) => setDetail('ctaText', next)}
        />

        <div className="grid gap-5 md:grid-cols-2">
          <TextRow
            label="Заголовок «другие проекты»"
            value={detail.relatedTitle}
            onChange={(next) => setDetail('relatedTitle', next)}
          />
          <TextRow
            label="Ссылка на всё портфолио"
            value={detail.relatedLinkLabel}
            onChange={(next) => setDetail('relatedLinkLabel', next)}
          />
        </div>
      </Block>
    </>
  );
}

/* --------------------------------- О нас ---------------------------------- */

export function AboutEditor({
  value,
  onChange,
}: {
  value: AboutPageContent;
  onChange(next: AboutPageContent): void;
}) {
  function set<K extends keyof AboutPageContent>(key: K, next: AboutPageContent[K]) {
    onChange({ ...value, [key]: next });
  }

  return (
    <>
      <Block title="Шапка страницы" hint="Верх страницы: крошки, надзаголовок, название и описание.">
        <IntroFields value={value.intro} onChange={(intro) => set('intro', intro)} />
      </Block>

      <Block title="История" hint="Фотография слева, рассказ о мастерской и цифры справа.">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-5">
            <TextRow
              label="Надпись над заголовком"
              value={value.story.eyebrow}
              onChange={(eyebrow) => set('story', { ...value.story, eyebrow })}
            />
            <TextRow
              label="Заголовок"
              value={value.story.title}
              onChange={(title) => set('story', { ...value.story, title })}
            />
          </div>
          <div>
            <span className="field-label">Фотография</span>
            <PhotoField
              src={value.story.photo.src}
              alt={value.story.photo.alt}
              onChange={(photo) => set('story', { ...value.story, photo })}
            />
          </div>
        </div>

        <LineList
          label="Текст — по абзацу на строку"
          hint="Каждая строка выводится отдельным абзацем."
          items={value.story.paragraphs}
          onChange={(paragraphs) => set('story', { ...value.story, paragraphs })}
          addLabel="Добавить абзац"
        />

        <PairList<Stat>
          label="Цифры под текстом"
          items={value.story.facts}
          onChange={(facts) => set('story', { ...value.story, facts })}
          blank={{ value: '', label: '' }}
          fields={[
            { key: 'value', label: 'Значение — 12+' },
            { key: 'label', label: 'Подпись — лет с плиткой' },
          ]}
          addLabel="Добавить цифру"
        />
      </Block>

      <Block title="Принципы" hint="Нумерация проставляется сама по порядку.">
        <TextRow
          label="Заголовок"
          value={value.values.title}
          onChange={(title) => set('values', { ...value.values, title })}
        />
        <AreaRow
          label="Пояснение справа"
          value={value.values.subtitle}
          onChange={(subtitle) => set('values', { ...value.values, subtitle })}
        />
        <PairList<Perk>
          label="Пункты"
          items={value.values.items}
          onChange={(items) => set('values', { ...value.values, items })}
          blank={{ title: '', text: '' }}
          fields={[
            { key: 'title', label: 'Название — ОДИН МАСТЕР НА ОБЪЕКТЕ' },
            { key: 'text', label: 'Пояснение', multiline: true },
          ]}
        />
      </Block>

      <Block title="Как работаем" hint="Этапы лентой. Номера этапов проставляются сами.">
        <TextRow
          label="Заголовок"
          value={value.process.title}
          onChange={(title) => set('process', { ...value.process, title })}
        />
        <AreaRow
          label="Пояснение справа"
          value={value.process.subtitle}
          onChange={(subtitle) => set('process', { ...value.process, subtitle })}
        />
        <PairList<ProcessStep>
          label="Этапы"
          items={value.process.steps}
          onChange={(steps) => set('process', { ...value.process, steps })}
          blank={{ duration: '', title: '', text: '' }}
          fields={[
            { key: 'duration', label: 'Срок — 2–5 дней' },
            { key: 'title', label: 'Название этапа' },
            { key: 'text', label: 'Что происходит', multiline: true },
          ]}
          addLabel="Добавить этап"
        />
      </Block>
    </>
  );
}
