import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import TrendingProducts from "@/components/home/TrendingProducts";
import FlashSale from "@/components/home/FlashSale";
import StatsSection from "@/components/home/StatsSection";
import Testimonials from "@/components/home/Testimonials";
import FeaturedBanner from "@/components/home/FeaturedBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <TrendingProducts />
      <FlashSale />
      <FeaturedBanner />
      <StatsSection />
      <Testimonials />
    </>
  );
}
