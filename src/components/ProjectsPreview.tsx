import Link from "next/link";
import { projects } from "@/lib/data";

export default function ProjectsPreview() {
  // Filter for featured projects
  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section className="section relative bg-[rgba(255,255,255,0.02)]">
      <div className="blob-background top-20 right-10 opacity-5"></div>
      <div className="container-custom relative z-10">
        <div className="text-center mb-14">
          <h2 className="section-title text-4xl font-bold">Featured Projects</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <div key={project.id} className="card project-card overflow-hidden flex flex-col h-full border border-[rgba(255,255,255,0.05)] hover:border-[rgba(124,58,237,0.2)] transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-[#16213e] to-[#1a1a2e] relative overflow-hidden">
                {/* Project preview image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center project-card-image">
                  <div className="w-16 h-16 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--secondary-400)]">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                </div>
                
                {/* Project name overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent flex items-end">
                  <h3 className="text-xl font-semibold p-4">{project.title}</h3>
                </div>
              </div>
              
              <div className="p-6 flex-grow">
                <p className="text-[var(--dark-200)] mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 text-xs bg-[rgba(124,58,237,0.1)] text-[var(--secondary-300)] rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-[rgba(124,58,237,0.1)] text-[var(--secondary-300)] rounded-full">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="px-6 pb-6 mt-auto">
                <Link 
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center text-[var(--secondary-400)] hover:text-[var(--secondary-300)] transition-colors"
                >
                  View Project
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link href="/projects" className="btn-primary">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}