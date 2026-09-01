import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-6 text-center">
      <p className="font-display text-[7rem] font-black leading-none tracking-tightest text-stone-300">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl font-black">Страница не найдена</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-graphite-500">
        Возможно, страница была перемещена или её адрес изменился.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-dark">
          На главную
        </Link>
        <Link href="/services" className="btn-outline">
          Услуги
        </Link>
      </div>
    </div>
  );
}
