import { Footer } from '@/components/site/footer';
import { Header } from '@/components/site/header';
import { QuoteProvider } from '@/components/site/quote-dialog';
import { ThemeShell } from '@/components/site/theme';
import { getServices, getSettings } from '@/lib/data/content';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);

  return (
    <QuoteProvider services={services.map((s) => s.title)} phone={settings.phone}>
      <ThemeShell>
        <Header phone={settings.phone} companyName={settings.companyName} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} services={services} />
      </ThemeShell>
    </QuoteProvider>
  );
}
