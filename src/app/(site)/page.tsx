import { AboutSection } from '@/components/site/about-section';
import { Advantages } from '@/components/site/advantages';
import { CtaSection } from '@/components/site/cta-section';
import { HeroCarousel } from '@/components/site/hero-carousel';
import { HeroStats } from '@/components/site/hero-stats';
import { PortfolioSection } from '@/components/site/portfolio-section';
import { PricesSection } from '@/components/site/prices-section';
import { Process } from '@/components/site/process';
import { ReviewsSection } from '@/components/site/reviews-section';
import { ServicesSection } from '@/components/site/services-section';
import { getPrices, getProjects, getReviews, getServices, getSettings } from '@/lib/data/content';

export default async function HomePage() {
  const [services, projects, prices, reviews, settings] = await Promise.all([
    getServices(),
    getProjects(),
    getPrices(),
    getReviews(),
    getSettings(),
  ]);

  return (
    <>
      <HeroCarousel phone={settings.phone} />
      <HeroStats />
      <ServicesSection services={services} />
      <AboutSection />
      <PortfolioSection projects={projects} />
      <Advantages />
      <PricesSection prices={prices} />
      <Process />
      <ReviewsSection reviews={reviews} />
      <CtaSection settings={settings} />
    </>
  );
}
