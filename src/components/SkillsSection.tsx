import Link from "next/link";
import { skills } from "@/lib/data";

export default function SkillsSection() {
  // Group skills by category
  const blockchainSkills = skills.filter(skill => skill.category === "blockchain");
  const frontendSkills = skills.filter(skill => skill.category === "frontend");
  const otherSkills = skills.filter(skill => 
    skill.category !== "blockchain" && skill.category !== "frontend"
  );

  return (
    <section className="section relative bg-[rgba(255,255,255,0.02)]">
      <div className="blob-background top-40 right-20 opacity-5"></div>
      <div className="container-custom relative z-10">
        <div className="text-center mb-14">
          <h2 className="section-title text-4xl font-bold">Technical Skills</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Blockchain Skills */}
          <div className="card p-6 border border-[rgba(2,132,201,0.2)] backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-[rgba(2,132,201,0.2)] flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary-400)]">
                  <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                  <polyline points="17 2 12 7 7 2"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--primary-400)]">
                Blockchain
              </h3>
            </div>
            
            <div className="space-y-4">
              {blockchainSkills.slice(0, 5).map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[var(--dark-200)]">{skill.name}</span>
                    <span className="text-[var(--primary-400)] text-sm">
                      {skill.level}/5
                    </span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress"
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Frontend Skills */}
          <div className="card p-6 border border-[rgba(124,58,237,0.2)] backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-[rgba(124,58,237,0.2)] flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--secondary-400)]">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--secondary-400)]">
                Frontend
              </h3>
            </div>
            
            <div className="space-y-4">
              {frontendSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[var(--dark-200)]">{skill.name}</span>
                    <span className="text-[var(--secondary-400)] text-sm">
                      {skill.level}/5
                    </span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress"
                      style={{ 
                        width: `${(skill.level / 5) * 100}%`,
                        background: "var(--gradient-purple)" 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Other Skills */}
          <div className="card p-6 border border-[rgba(6,182,212,0.2)] backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-[rgba(6,182,212,0.2)] flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent-cyan)]">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--accent-cyan)]">
                Other Skills
              </h3>
            </div>
            
            <div className="space-y-4">
              {otherSkills.slice(0, 5).map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[var(--dark-200)]">{skill.name}</span>
                    <span className="text-[var(--accent-cyan)] text-sm">
                      {skill.level}/5
                    </span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress"
                      style={{ 
                        width: `${(skill.level / 5) * 100}%`,
                        background: "linear-gradient(135deg, #06b6d4, #0ea5e9)" 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <Link href="/skills" className="btn-outline">
            View All Skills
          </Link>
        </div>
      </div>
    </section>
  );
}