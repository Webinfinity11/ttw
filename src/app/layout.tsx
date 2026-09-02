import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tiling Work — укладка плитки и керамогранита в Тбилиси',
  description:
    'Профессиональная укладка плитки, керамогранита и XXL-плит в Тбилиси. Ванные под ключ, гидроизоляция, запил под 45°.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
