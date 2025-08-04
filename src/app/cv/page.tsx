'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function CVPage() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadCV = async (format: 'pdf' | 'html') => {
    setIsDownloading(true);
    try {
      const response = await fetch(`/api/cv?format=${format}`);
      
      if (!response.ok) {
        throw new Error('Failed to generate CV');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `scott-devines-cv.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading CV:', error);
      alert('Failed to download CV. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className={`min-h-screen relative ${
      theme === 'theme-light' 
        ? 'bg-gradient-to-br from-gray-50 to-blue-50' 
        : 'bg-gradient-to-br from-slate-900 to-slate-800'
    }`}>
      <div className="container-custom py-24">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold light-text mb-6">
            Download My CV
          </h1>
          <p className="text-xl light-text opacity-80 max-w-3xl mx-auto">
            Get a comprehensive overview of my blockchain development experience, skills, and achievements in a professional format.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* PDF Download */}
            <motion.div
              className={`relative p-8 rounded-2xl border backdrop-blur-md transition-all duration-300 group hover:scale-105 ${
                theme === 'theme-light'
                  ? 'bg-gradient-to-br from-red-50/90 to-pink-50/90 border-red-200 hover:border-red-300'
                  : 'bg-gradient-to-br from-red-900/30 to-pink-900/30 border-red-700/50 hover:border-red-600/50'
              }`}
              whileHover={{ y: -5 }}
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-red-400 to-pink-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              
              <div className="relative z-10 text-center">
                <div className="text-6xl mb-6">📄</div>
                <h3 className="text-2xl font-bold light-text mb-4">
                  PDF Format
                </h3>
                <p className="light-text opacity-80 mb-6">
                  Professional PDF format, perfect for job applications and printing. Optimized for ATS systems.
                </p>
                <button
                  onClick={() => downloadCV('pdf')}
                  disabled={isDownloading}
                  className={`inline-flex items-center px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                    theme === 'theme-light'
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white'
                      : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white'
                  } ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isDownloading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      Download PDF
                      <svg 
                        className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* HTML Preview */}
            <motion.div
              className={`relative p-8 rounded-2xl border backdrop-blur-md transition-all duration-300 group hover:scale-105 ${
                theme === 'theme-light'
                  ? 'bg-gradient-to-br from-blue-50/90 to-indigo-50/90 border-blue-200 hover:border-blue-300'
                  : 'bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-blue-700/50 hover:border-blue-600/50'
              }`}
              whileHover={{ y: -5 }}
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              
              <div className="relative z-10 text-center">
                <div className="text-6xl mb-6">🌐</div>
                <h3 className="text-2xl font-bold light-text mb-4">
                  HTML Preview
                </h3>
                <p className="light-text opacity-80 mb-6">
                  View the CV in your browser first, or download as HTML for web-based applications.
                </p>
                <button
                  onClick={() => downloadCV('html')}
                  disabled={isDownloading}
                  className={`inline-flex items-center px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                    theme === 'theme-light'
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                  } ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isDownloading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      Preview HTML
                      <svg 
                        className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>

          {/* CV Preview Section */}
          <motion.div
            className={`mt-16 p-8 rounded-2xl border backdrop-blur-md ${
              theme === 'theme-light'
                ? 'bg-gradient-to-br from-white/90 to-gray-50/90 border-gray-200'
                : 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-700'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold light-text mb-6 text-center">
              What's Included in My CV
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold light-text mb-4 flex items-center">
                  <span className="text-2xl mr-3">💼</span>
                  Professional Experience
                </h4>
                <ul className="space-y-2 light-text opacity-80">
                  <li>• 6+ years of blockchain development</li>
                  <li>• Leadership roles and team management</li>
                  <li>• Major project achievements</li>
                  <li>• Client testimonials and results</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold light-text mb-4 flex items-center">
                  <span className="text-2xl mr-3">🛠️</span>
                  Technical Skills
                </h4>
                <ul className="space-y-2 light-text opacity-80">
                  <li>• Smart Contract Standards (ERC-20, ERC-721, etc.)</li>
                  <li>• DeFi Protocols and Yield Farming</li>
                  <li>• Security & Auditing</li>
                  <li>• Layer 2 Solutions</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold light-text mb-4 flex items-center">
                  <span className="text-2xl mr-3">🏆</span>
                  Achievements
                </h4>
                <ul className="space-y-2 light-text opacity-80">
                  <li>• Hackathon victories and recognitions</li>
                  <li>• Jury member at Alyra Blockchain School</li>
                  <li>• Community contributions</li>
                  <li>• Published articles and tutorials</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold light-text mb-4 flex items-center">
                  <span className="text-2xl mr-3">📚</span>
                  Education & Certifications
                </h4>
                <ul className="space-y-2 light-text opacity-80">
                  <li>• Blockchain development certifications</li>
                  <li>• Continuous learning and upskilling</li>
                  <li>• Industry workshops and conferences</li>
                  <li>• Open source contributions</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}