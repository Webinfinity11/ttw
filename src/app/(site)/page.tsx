import { AboutSection } from '@/components/site/about-section';
import { Advantages } from '@/components/site/advantages';
import { CtaSection } from '@/components/site/cta-section';
import { Hero } from '@/components/site/hero';
import { PortfolioSection } from '@/components/site/portfolio-section';
import { ServicesSection } from '@/components/site/services-section';
import { TileCarousel } from '@/components/site/tile-carousel';
import { getProjects, getServices, getSettings } from '@/lib/data/content';

export default async function HomePage() {
  const [services, projects, settings] = await Promise.all([
    getServices(),
    getProjects(),
    getSettings(),
  ]);

  return (
    <>
      <Hero />
      <ServicesSection services={services} />
      <AboutSection />
      <PortfolioSection projects={projects} />
      <Advantages />
      <TileCarousel />
      <CtaSection settings={settings} />
    </>
  );
}
