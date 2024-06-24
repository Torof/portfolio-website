import Link from "next/link";
import { personalInfo } from "@/lib/data";
import ScrollIndicator from "@/components/ScrollIndicator";

export default function HeroSection() {
  return (
    <section className="relative flex items-start pt-32 md:pt-40 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="blob-background top-0 left-0 opacity-5"></div>
      <div className="blob-background bottom-0 right-0 opacity-5"></div>
      
      <div className="w-full relative z-10 px-4">
        <div className="flex flex-col md:flex-row items-start justify-start gap-12">
          <div className="md:w-1/2 md:ml-8 lg:ml-16 xl:ml-24 animate-[fadeIn_1s_ease-in-out]">
            <div className="mb-2 inline-block py-1 px-3 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-sm text-[var(--primary-300)]">
              Full Stack Web3 Developer
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white text-left">
              {personalInfo.name}
            </h1>
            
            <p className="text-xl mb-8 text-[var(--dark-200)] leading-relaxed max-w-lg text-left">
              Experienced blockchain developer specializing in smart contracts, DeFi, and NFTs. 
              Building the decentralized future, one line of code at a time.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/experience" className="btn-primary">
                View Experience
              </Link>
              <Link href="/projects" className="btn-outline">
                Explore Projects
              </Link>
            </div>
            
            <div className="mt-10 flex items-center gap-2">
              <div className="w-12 h-0.5 bg-[var(--primary-400)]"></div>
              <p className="text-[var(--dark-300)]">Blockchain developer since {personalInfo.startedBlockchain}</p>
            </div>
          </div>
          
          <div className="hidden md:block md:w-5/12 animate-[fadeIn_1s_ease-in-out_0.5s_both] absolute right-8 lg:right-16 xl:right-32">
            <div className="relative">
              {/* Glowing effect behind profile */}
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[var(--primary-500)] to-[var(--secondary-500)] opacity-75 blur-xl"></div>
              
              {/* Circular profile frame */}
              <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-2 border-[rgba(255,255,255,0.1)] glow-effect">
                {/* Placeholder for profile image */}
                <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center">
                  <span className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-400)] to-[var(--secondary-400)]">
                    SD
                  </span>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-5 -right-10 w-20 h-20 rounded-full bg-[var(--accent-blue)] opacity-10 blur-xl"></div>
              <div className="absolute -bottom-5 -left-10 w-24 h-24 rounded-full bg-[var(--accent-purple)] opacity-10 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add ScrollIndicator component */}
      <ScrollIndicator />
    </section>
  );
}