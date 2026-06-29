import HomeHero from "@/components/home/HomeHero";
import WhoForSection from "@/components/home/WhoForSection";
import ImpactStats from "@/components/home/ImpactStats";
import PersonaShowcase from "@/components/PersonaShowcase";
import PartnersSection from "@/components/home/PartnersSection";
import InstagramSection from "@/components/home/InstagramSection";
import CtaSection from "@/components/home/CtaSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <WhoForSection />
      <ImpactStats />
      <PersonaShowcase />
      <InstagramSection />
       <PartnersSection />
      <CtaSection />
      <Footer />
    </>
  );
}
