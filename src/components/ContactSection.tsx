import Link from "next/link";
import { personalInfo } from "@/lib/data";

export default function ContactSection() {
  return (
    <section className="section relative">
      <div className="blob-background bottom-0 right-0 opacity-5"></div>
      <div className="container-custom relative z-10 max-w-4xl">
        <div className="text-center mb-14">
          <h2 className="section-title text-4xl font-bold">Get In Touch</h2>
        </div>
        
        <div className="card p-8 border border-[rgba(255,255,255,0.05)] backdrop-blur-sm">
          <div className="text-center mb-8">
            <p className="text-lg text-[var(--dark-200)]">
              Interested in working together or have a project in mind?
              I'm always open to discussing new opportunities and challenges.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-6 text-center hover:bg-[rgba(255,255,255,0.05)] transition-all">
              <div className="mb-4 inline-flex w-16 h-16 rounded-full bg-[rgba(2,132,201,0.1)] items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-8 h-8 text-[var(--primary-400)]"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Send an Email</h3>
              <p className="text-[var(--dark-300)] mb-4">Drop me a line anytime, I'll get back to you as soon as possible.</p>
              <a 
                href={`mailto:${personalInfo.email}`}
                className="text-[var(--primary-400)] hover:underline inline-flex items-center"
              >
                {personalInfo.email}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </div>
            
            <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-6 text-center hover:bg-[rgba(255,255,255,0.05)] transition-all">
              <div className="mb-4 inline-flex w-16 h-16 rounded-full bg-[rgba(124,58,237,0.1)] items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-8 h-8 text-[var(--secondary-400)]"
                >
                  <path d="M16 22v-3a5 5 0 0 0-5-5H5a5 5 0 0 0-5 5v3"></path>
                  <circle cx="8" cy="9" r="4"></circle>
                  <polyline points="17 4 22 9 17 14"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Connect Professionally</h3>
              <p className="text-[var(--dark-300)] mb-4">Follow my work updates and connect with me on LinkedIn.</p>
              <a 
                href="https://www.linkedin.com/in/scott-devines/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--secondary-400)] hover:underline inline-flex items-center"
              >
                LinkedIn Profile
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="text-center">
            <Link href="/contact" className="btn-primary px-8 py-3">
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}