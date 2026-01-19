import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import SequentialLayout from "@/components/SequentialLayout";
import SectionTransition from "@/components/SectionTransition";
import FloatingOrbs from "@/components/FloatingOrbs";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Floating Orbs for Visual Interest */}
      <FloatingOrbs />

      {/* Hero Section */}
      <HeroSection />

      {/* About Me Section */}
      <SectionTransition>
        <section className="section section-transition relative overflow-hidden">
          <div className="container-custom relative z-10">
            <div className="md:w-3/4 mx-auto relative overflow-hidden rounded-xl p-8 transition-all duration-300 backdrop-blur-sm glass-card">
              <AboutSection />
            </div>
          </div>
        </section>
      </SectionTransition>

      <SectionTransition delay={0.1}>
        <SequentialLayout />
      </SectionTransition>

      <SectionTransition delay={0.15}>
        <ContactSection />
      </SectionTransition>
    </div>
  );
}