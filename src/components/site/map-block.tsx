/**
 * Карта города без внешних ключей: встраиваемая карта Google по адресу
 * из настроек. Светлые тайлы приводятся к тёмной теме фильтром (см. globals.css).
 */
export function MapBlock({ address, city }: { address: string; city: string }) {
  const query = encodeURIComponent(address || city);

  return (
    <div className="border border-graphite-700 bg-graphite-900">
      <div className="relative h-[320px] w-full overflow-hidden lg:h-[380px]">
        <iframe
          title={`Карта: ${address || city}`}
          src={`https://maps.google.com/maps?q=${query}&z=14&hl=ru&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="map-frame absolute inset-0 h-full w-full border-0"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-graphite-700 px-5 py-4">
        <div>
          <p className="meta">АДРЕС</p>
          <p className="mt-1 text-[15px] text-stone-100">{address}</p>
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${query}`}
          target="_blank"
          rel="noreferrer"
          className="link-underline text-[15px]"
        >
          <span>ОТКРЫТЬ В КАРТАХ</span>
          <span className="text-[20px] font-light">↗</span>
        </a>
      </div>
    </div>
  );
}
