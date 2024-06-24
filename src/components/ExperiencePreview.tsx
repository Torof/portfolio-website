import Link from "next/link";
import { experiences } from "@/lib/data";

export default function ExperiencePreview() {
  // Get recent experiences (latest 2)
  const recentExperiences = [...experiences].sort((a, b) => 
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  ).slice(0, 2);

  return (
    <section className="section relative">
      <div className="blob-background bottom-20 left-10 opacity-5"></div>
      <div className="container-custom relative z-10">
        <div className="text-center mb-14">
          <h2 className="section-title text-4xl font-bold">Recent Experience</h2>
        </div>
        
        <div className="space-y-8">
          {recentExperiences.map((exp, index) => (
            <div 
              key={exp.id} 
              className="card p-8 border border-[rgba(255,255,255,0.05)] backdrop-blur-sm hover:border-[rgba(2,132,201,0.2)] transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-semibold">{exp.position}</h3>
                  <p className="text-[var(--primary-400)] mb-2">{exp.company}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="inline-block px-3 py-1 rounded-full bg-[rgba(255,255,255,0.05)] text-[var(--dark-200)] text-sm">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
              </div>
              
              <p className="mb-6 text-[var(--dark-200)] leading-relaxed">{exp.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {exp.skills.slice(0, 5).map((skill) => (
                  <span 
                    key={skill} 
                    className="px-3 py-1 text-sm bg-[rgba(2,132,201,0.1)] text-[var(--primary-300)] rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {exp.skills.length > 5 && (
                  <span className="px-3 py-1 text-sm bg-[rgba(2,132,201,0.1)] text-[var(--primary-300)] rounded-full">
                    +{exp.skills.length - 5} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link href="/experience" className="btn-primary">
            View Full Experience
          </Link>
        </div>
      </div>
    </section>
  );
}