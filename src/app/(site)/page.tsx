import { AboutSection } from '@/components/site/about-section';
import { Advantages } from '@/components/site/advantages';
import { CtaSection } from '@/components/site/cta-section';
import { Hero } from '@/components/site/hero';
import { PortfolioSection } from '@/components/site/portfolio-section';
import { ServicesSection } from '@/components/site/services-section';
import { TileCarousel } from '@/components/site/tile-carousel';
import { getHomeContent, getProjects, getServices, getSettings } from '@/lib/data/content';

export default async function HomePage() {
  const [services, projects, settings, home] = await Promise.all([
    getServices(),
    getProjects(),
    getSettings(),
    getHomeContent(),
  ]);

  return (
    <>
      <Hero content={home.hero} />
      <ServicesSection services={services} intro={home.services} />
      <AboutSection content={home.about} />
      <PortfolioSection projects={projects} intro={home.portfolio} />
      <Advantages content={home.advantages} />
      <TileCarousel content={home.carousel} />
      <CtaSection settings={settings} />
    </>
  );
}
