import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import SequentialLayout from "@/components/SequentialLayout";
import SectionTransition from "@/components/SectionTransition";
import FloatingOrbs from "@/components/FloatingOrbs";
import SkillsTable from "@/components/SkillsTable";
import ViewCounter from "@/components/ViewCounter";
import { fetchProjectsFromGitHub } from '@/lib/services/projects';

export default async function Home() {
  // Fetch projects server-side, exactly like the projects page
  const projects = await fetchProjectsFromGitHub();
  return (
    <div className="min-h-screen relative">
      {/* Floating Orbs for Visual Interest */}
      <FloatingOrbs />

      {/* View Counter - Fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <ViewCounter pageId="home" />
      </div>
      
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
        <SkillsTable />
      </SectionTransition>
      
      <SectionTransition delay={0.15}>
        <SequentialLayout projects={projects} />
      </SectionTransition>

      <SectionTransition delay={0.2}>
        <ContactSection />
      </SectionTransition>
    </div>
  );
}