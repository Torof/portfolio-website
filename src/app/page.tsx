import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperiencePreview from "@/components/ExperiencePreview";
import ProjectsPreview from "@/components/ProjectsPreview";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with About Me below it */}
      <div className="relative">
        <HeroSection />
        {/* Position About Me with the same left alignment as the hero text */}
        <div className="px-4 md:w-1/2 md:ml-8 lg:ml-16 xl:ml-24 pb-20">
          <AboutSection />
        </div>
      </div>
      
      {/* Regular sections that take full width */}
      <SkillsSection />
      <ExperiencePreview />
      <ProjectsPreview />
      <ContactSection />
    </div>
  );
}