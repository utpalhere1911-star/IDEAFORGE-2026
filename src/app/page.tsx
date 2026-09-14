import AnnouncementsSection from "@/components/AnnouncementsSection";
import ForgeAbout from "@/components/ForgeAbout";
import ForgeCTA from "@/components/ForgeCTA";
import ForgeFAQ from "@/components/ForgeFAQ";
import ForgeFooter from "@/components/ForgeFooter";
import ForgeTimeline from "@/components/ForgeTimeline";
import GuidelinesSection from "@/components/GuidelinesSection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import PrizesSection from "@/components/PrizesSection";
import ThemesSection from "@/components/ThemesSection";
import WhySection from "@/components/WhySection";
import BackgroundVideo from "@/components/BackgroundVideo";

export default function Home() {
  return (
    <div className="forge-page" id="top">
      <BackgroundVideo />
      <Navbar />
      <main>
        <HeroSection />
        <ForgeAbout />
        <ThemesSection />
        <WhySection />
        <PrizesSection />
        <ForgeTimeline />
        <GuidelinesSection />
        <AnnouncementsSection />
        <ForgeFAQ />
        <ForgeCTA />
      </main>
      <ForgeFooter />
    </div>
  );
}
