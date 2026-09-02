'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, RotateCcw, Save } from 'lucide-react';
import { useAdminData } from '@/components/admin/data-provider';
import { useToast } from '@/components/admin/toast';
import { AdminPageHeader } from '@/components/admin/ui';
import {
  AreaRow,
  Block,
  LineList,
  PairList,
  PhotoList,
  TextRow,
} from '@/components/admin/block-editors';
import { PhotoField } from '@/components/admin/photo-picker';
import type { HomeContent, Perk, Stat } from '@/lib/types';

/**
 * Редактор содержимого главной страницы.
 *
 * Блоки идут в том же порядке, что и на сайте, поэтому правку легко
 * сверить с живой страницей. Сохранение — одной кнопкой на всю страницу.
 */
export default function AdminPagesPage() {
  const { pages, updateHome, ready } = useAdminData();
  const { notify } = useToast();

  const [home, setHome] = useState<HomeContent>(pages.home);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setHome(pages.home);
  }, [pages.home]);

  const dirty = JSON.stringify(home) !== JSON.stringify(pages.home);

  /** Правка одного блока, остальные не трогаем. */
  function set<K extends keyof HomeContent>(key: K, value: HomeContent[K]) {
    setHome((prev) => ({ ...prev, [key]: value }));
  }

  async function save() {
    setSaving(true);
    await updateHome(home);
    setSaving(false);
    notify('Главная страница сохранена');
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Страницы"
        description="Тексты и фотографии главной страницы. Блоки идут в том же порядке, что и на сайте."
        action={
          <>
            <Link
              href="/"
              target="_blank"
              className="btn border border-graphite-100 bg-white px-5 py-2.5 text-graphite-500 hover:border-graphite-300 hover:text-graphite-900"
            >
              <ExternalLink className="h-4 w-4" /> Открыть сайт
            </Link>
            <button
              disabled={!dirty || saving || !ready}
              onClick={() => setHome(pages.home)}
              className="btn border border-graphite-100 bg-white px-5 py-2.5 text-graphite-500 hover:border-graphite-300 hover:text-graphite-900"
            >
              <RotateCcw className="h-4 w-4" /> Отменить
            </button>
            <button disabled={!dirty || saving || !ready} onClick={save} className="btn-dark px-5 py-2.5">
              <Save className="h-4 w-4" />
              {saving ? 'Сохраняем…' : 'Сохранить'}
            </button>
          </>
        }
      />

      <Block
        title="Первый экран"
        hint="Самый верх главной: крупный заголовок, четыре подписи, лента плит, счётчики и кнопки."
      >
        <LineList
          label="Заголовок"
          hint="Каждая строка выезжает отдельно — разбейте фразу так, как она должна переноситься."
          items={home.hero.headline}
          onChange={(headline) => set('hero', { ...home.hero, headline })}
          placeholder="УКЛАДКА ПЛИТКИ"
        />

        <LineList
          label="Подписи под заголовком"
          hint="Идут в строку под чертой. Четыре штуки ложатся ровно в ширину экрана."
          items={home.hero.notes}
          onChange={(notes) => set('hero', { ...home.hero, notes })}
          addLabel="Добавить подпись"
        />

        <PhotoList
          label="Лента плит"
          hint="Кадры в один ряд под подписями. Ровно четыре смотрятся лучше всего — ряд рассчитан на них."
          items={home.hero.photos}
          onChange={(photos) => set('hero', { ...home.hero, photos })}
        />

        <PairList<Stat>
          label="Счётчики"
          hint="Цифры прокручиваются при загрузке. Значок «+» и знак процента можно писать прямо в значении."
          items={home.hero.stats}
          onChange={(stats) => set('hero', { ...home.hero, stats })}
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
            value={home.hero.primaryCta}
            onChange={(primaryCta) => set('hero', { ...home.hero, primaryCta })}
          />
          <TextRow
            label="Кнопка на проекты"
            value={home.hero.secondaryCta}
            onChange={(secondaryCta) => set('hero', { ...home.hero, secondaryCta })}
          />
        </div>

        <TextRow
          label="Приписка у кнопок"
          value={home.hero.footnote}
          onChange={(footnote) => set('hero', { ...home.hero, footnote })}
        />
      </Block>

      <Block
        title="Секция «Сервисы»"
        hint="Только шапка секции. Сами услуги редактируются в разделе «Услуги», их количество считается само."
      >
        <TextRow
          label="Заголовок"
          value={home.services.title}
          onChange={(title) => set('services', { ...home.services, title })}
        />
        <AreaRow
          label="Пояснение справа"
          value={home.services.subtitle}
          onChange={(subtitle) => set('services', { ...home.services, subtitle })}
        />
        <TextRow
          label="Подпись под цифрой"
          hint="Цифру подставляет сайт — это количество опубликованных услуг."
          value={home.services.counterLabel}
          onChange={(counterLabel) => set('services', { ...home.services, counterLabel })}
        />
      </Block>

      <Block title="Блок «О компании»" hint="Фотография слева, текст и принципы справа.">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-5">
            <TextRow
              label="Надпись над заголовком"
              value={home.about.eyebrow}
              onChange={(eyebrow) => set('about', { ...home.about, eyebrow })}
            />
            <LineList
              label="Заголовок"
              hint="Разбивается на строки так же, как на первом экране."
              items={home.about.title}
              onChange={(title) => set('about', { ...home.about, title })}
            />
            <AreaRow
              label="Текст"
              rows={5}
              value={home.about.text}
              onChange={(text) => set('about', { ...home.about, text })}
            />
          </div>

          <div className="space-y-5">
            <div>
              <span className="field-label">Фотография</span>
              <PhotoField
                src={home.about.photo.src}
                alt={home.about.photo.alt}
                onChange={(photo) => set('about', { ...home.about, photo })}
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextRow
                label="Цифра на кадре"
                value={home.about.badgeValue}
                onChange={(badgeValue) => set('about', { ...home.about, badgeValue })}
              />
              <TextRow
                label="Подпись под цифрой"
                value={home.about.badgeLabel}
                onChange={(badgeLabel) => set('about', { ...home.about, badgeLabel })}
              />
            </div>
            <TextRow
              label="Надпись на ссылке"
              value={home.about.linkLabel}
              onChange={(linkLabel) => set('about', { ...home.about, linkLabel })}
            />
          </div>
        </div>

        <PairList<Perk>
          label="Принципы"
          items={home.about.perks}
          onChange={(perks) => set('about', { ...home.about, perks })}
          blank={{ title: '', text: '' }}
          fields={[
            { key: 'title', label: 'Название — ФИКСИРОВАННАЯ СМЕТА' },
            { key: 'text', label: 'Пояснение', multiline: true },
          ]}
          addLabel="Добавить принцип"
        />

        <PairList<Stat>
          label="Цифры внизу блока"
          items={home.about.facts}
          onChange={(facts) => set('about', { ...home.about, facts })}
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
          value={home.portfolio.title}
          onChange={(title) => set('portfolio', { ...home.portfolio, title })}
        />
        <AreaRow
          label="Пояснение справа"
          value={home.portfolio.subtitle}
          onChange={(subtitle) => set('portfolio', { ...home.portfolio, subtitle })}
        />
        <TextRow
          label="Подпись под цифрой"
          value={home.portfolio.counterLabel}
          onChange={(counterLabel) => set('portfolio', { ...home.portfolio, counterLabel })}
        />
      </Block>

      <Block title="Блок «Почему мы»" hint="Нумерация пунктов проставляется сама по порядку.">
        <TextRow
          label="Заголовок"
          value={home.advantages.title}
          onChange={(title) => set('advantages', { ...home.advantages, title })}
        />
        <AreaRow
          label="Пояснение справа"
          value={home.advantages.subtitle}
          onChange={(subtitle) => set('advantages', { ...home.advantages, subtitle })}
        />
        <PairList<Perk>
          label="Пункты"
          items={home.advantages.items}
          onChange={(items) => set('advantages', { ...home.advantages, items })}
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
            value={home.carousel.eyebrow}
            onChange={(eyebrow) => set('carousel', { ...home.carousel, eyebrow })}
          />
          <TextRow
            label="Заголовок"
            value={home.carousel.title}
            onChange={(title) => set('carousel', { ...home.carousel, title })}
          />
        </div>
        <PhotoList
          label="Кадры ленты"
          hint="Порядок кадров — порядок перелистывания. Описание можно не заполнять: кадры здесь декоративные."
          items={home.carousel.photos}
          onChange={(photos) => set('carousel', { ...home.carousel, photos })}
          withAlt={false}
        />
      </Block>
    </div>
  );
}
