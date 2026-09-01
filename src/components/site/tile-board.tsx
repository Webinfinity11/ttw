import Image from 'next/image';
import { cn } from '@/lib/cn';

export interface TileSample {
  src: string;
  label: string;
}

/**
 * Реальные фотографии материалов (Unsplash, см. public/tiles/CREDITS.txt).
 * Кадрируются в форму плиты — фон снимка не виден.
 */
export const TILES: TileSample[] = [
  { src: '/tiles/porcelain.jpg', label: 'керамогранит' },
  { src: '/tiles/marble.jpg', label: 'мрамор XXL' },
  { src: '/tiles/terrazzo.jpg', label: 'натуральный камень' },
  { src: '/tiles/mosaic.jpg', label: 'мозаика' },
];

/** Плита: фотография + светлая кромка, тень и «торец» снизу. */
function TilePlate({
  tile,
  index,
  priority,
}: {
  tile: TileSample;
  index: number;
  priority?: boolean;
}) {
  return (
    <div className={cn('relative h-full w-full tile-enter', `tile-enter-${index + 1}`)}>
      <div className="absolute inset-0 overflow-hidden shadow-[0_28px_50px_-18px_rgba(0,0,0,0.85)] ring-1 ring-white/20">
        <Image
          src={tile.src}
          alt={tile.label}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 45vw, 220px"
          className="object-cover"
        />
        {/* блик сверху и торец плиты снизу — объём без вырезания фона */}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/45" />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-black/45" />
        <span className="absolute bottom-2.5 left-3 font-mono text-[10px] uppercase tracking-wide text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,.9)]">
          {tile.label}
        </span>
      </div>
    </div>
  );
}

/**
 * Панель образцов в hero.
 * Плитки въезжают по очереди: сначала две верхние, затем две нижние.
 */
export function TileBoard() {
  return (
    <div className="relative hidden min-h-[580px] items-center justify-center lg:flex">
      <div className="frame-enter relative h-[460px] w-[460px] overflow-hidden border border-white/25 bg-white/[0.06] p-6 backdrop-blur-[2px] [transform:rotate(-8deg)]">
        <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-5">
          {TILES.map((tile, index) => (
            <TilePlate key={tile.label} tile={tile} index={index} priority={index < 2} />
          ))}
        </div>

        {/* блик, пробегающий по панели после того, как плитки встали */}
        <span className="board-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      </div>

      {/* ярлыки прилетают последними, когда выкладка собрана */}
      <span
        className="animate-fade-up absolute -right-4 top-10 bg-accent-500 px-4 py-2.5 text-sm font-medium text-white shadow-lift"
        style={{ animationDelay: '1.5s' }}
      >
        Плитка любого формата
      </span>
      <span
        className="animate-fade-up absolute -left-6 bottom-12 bg-white px-4 py-2.5 text-sm font-semibold text-graphite-950 shadow-lift"
        style={{ animationDelay: '1.7s' }}
      >
        Запил под 45°
      </span>
    </div>
  );
}

/** Мобильный вариант: та же очерёдность появления. */
export function TileStrip() {
  return (
    <div className="mt-12 grid grid-cols-2 gap-4 lg:hidden">
      {TILES.map((tile, index) => (
        <div key={tile.label} className="relative h-28">
          <TilePlate tile={tile} index={index} />
        </div>
      ))}
    </div>
  );
}
