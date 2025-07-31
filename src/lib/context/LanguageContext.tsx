'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load language from localStorage or browser language
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      // Default to browser language if French, otherwise English
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('fr')) {
        setLanguage('fr');
      }
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const t = (key: string, variables?: Record<string, string | number>): string => {
    let text = (translations[language] as Record<string, string>)?.[key] || (translations.en as Record<string, string>)[key] || key;
    
    if (variables) {
      Object.entries(variables).forEach(([key, value]) => {
        text = text.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
      });
    }
    
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Translations object - we'll expand this
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.experience': 'Experience',
    'nav.education': 'Education',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.vibe-coding': 'Vibe Coding',
    'nav.contact': 'Contact',

    // Home page
    'hero.title': 'Blockchain Developer',
    'hero.subtitle': 'Experienced blockchain developer specializing in smart contracts, DeFi, and NFTs. Building the decentralized future, one line of code at a time.',
    'hero.cta': 'View Experience',
    'hero.projects': 'Explore Projects',
    'hero.contact': 'Get In Touch',
    'hero.experienceYears': 'Blockchain developer since {year}',
    'hero.tagline': 'Full Stack Web3 Developer',

    // About section
    'about.title': 'About Me',
    'about.description': 'Passionate blockchain developer with expertise in smart contracts, DeFi protocols, and decentralized applications. I combine technical excellence with creative problem-solving to deliver robust Web3 solutions.',
    'about.skills': 'Technical Skills',
    'about.interests.vibe': 'Vibe coding sessions with ambient music and flow states',
    'about.vibeButton': 'Vibe Coding',
    'about.whatIDo': 'What I Do',
    'about.card1.text': 'I\'m a passionate blockchain developer with expertise in smart contract development, having started my journey in {year}. With over {experience} years in the blockchain space, I\'ve gained deep experience in Solidity, EVM, DeFi, and NFTs.',
    'about.card2.text': 'I enjoy building fullstack Decentralized Applications (dApps) from conception to production, with a focus on security, efficiency, and user experience. My background includes working with various blockchain platforms and technologies, always staying at the cutting edge.',
    'about.card3.text': 'Currently expanding my expertise to include Rust, Solana, and Polkadot, I\'m constantly learning and adapting to the evolving blockchain landscape.',
    'about.item1': 'Design and develop secure, efficient smart contracts',
    'about.item2': 'Build full-stack dApps with modern frontend technologies',
    'about.item3': 'Audit and optimize existing blockchain projects',
    'about.item4': 'Create and implement token economies and NFT systems',

    // Skills section
    'skills.blockchain': 'Blockchain',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.tools': 'Tools & Others',
    'skills.hard': 'Hard Skills',
    'skills.soft': 'Soft Skills', 
    'skills.mad': 'Mad Skills',
    'skills.matrix': 'Skills Matrix',
    
    // Hard Skills
    'skills.solidity': 'Solidity & Smart Contracts',
    'skills.react': 'React & Next.js',
    'skills.typescript': 'TypeScript & JavaScript',
    'skills.vibeCoding': 'Vibe Coding',
    'skills.web3': 'Web3 & Blockchain',
    'skills.nodejs': 'Node.js & Express',
    'skills.hardhat': 'Hardhat & Foundry',
    'skills.git': 'Git & Version Control',
    
    // Soft Skills
    'skills.listening': 'Active Listening',
    'skills.motivation': 'Team Motivation',
    'skills.leadership': 'Supportive Leadership',
    'skills.problemSolving': 'Problem Solving',
    'skills.collaboration': 'Team Collaboration',
    'skills.communication': 'Communication',
    'skills.adaptability': 'Adaptability',
    'skills.criticalThinking': 'Critical Thinking',
    
    // Mad Skills
    'skills.canyoning': 'Canyoning',
    'skills.climbing': 'Rock Climbing',
    'skills.paragliding': 'Paragliding',
    'skills.hiking': 'Hiking & Trekking',
    'skills.lateNightCoding': 'Late Night Coding',
    'skills.hackathons': 'Hackathon Participation',
    'skills.auditing': 'Smart Contract Auditing',
    'skills.gasOptimization': 'Gas Optimization Obsession',
    
    // Experience page
    'experience.title': 'Professional Experience',
    'experience.subtitle': 'My journey through the blockchain and web development landscape, building innovative solutions and growing expertise.',
    'experience.achievements': 'KEY ACHIEVEMENTS',
    'experience.clickForAchievements': 'CLICK FOR ACHIEVEMENTS',
    'experience.clickForDetails': 'CLICK TO GO BACK',
    'experience.recent': 'Recent Experience',
    'experience.viewFull': 'View Full Experience',
    'experience.more': '+{count} more',
    'experience.noAchievements': 'No specific achievements listed for this role.',
    'experience.present': 'PRESENT',

    // Education page
    'education.title': 'Education',
    'education.subtitle': 'My academic journey through blockchain technology, smart contract development, and decentralized systems.',
    'education.skillsAcquired': 'SKILLS ACQUIRED',
    'education.courseDetails': 'COURSE DETAILS',
    'education.clickForDetails': 'CLICK FOR DETAILS',
    'education.clickForSkills': 'CLICK FOR SKILLS',
    'education.certifications': 'Certifications',
    'education.certificationsSubtitle': 'Professional certifications and specialized training programs.',

    // Projects page
    'projects.title': 'My Projects',
    'projects.subtitle': 'A collection of blockchain projects, smart contracts, and DApps pulled directly from my GitHub repositories.',
    'projects.github': 'GitHub',
    'projects.demo': 'Live Demo',
    'projects.githubStats': 'GitHub Statistics',
    'projects.githubStatsSubtitle': 'Real-time metrics showcasing my development activity and language expertise',
    'projects.loading': 'Projects Loading...',
    'projects.loadingDescription': 'Fetching the latest projects from GitHub. Please refresh if this takes too long.',
    'projects.noProjects': 'No Projects Found',
    'projects.noProjectsDescription': 'Unable to fetch projects from GitHub at this time.',

    // Contact page
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Let\'s discuss your next blockchain project.',
    'contact.buildTogether': 'Let\'s Build Together',
    'contact.vision': 'Ready to bring your blockchain vision to life? I specialize in creating robust smart contracts, innovative DeFi solutions, and seamless Web3 experiences.',
    'contact.innovate': 'Ready to Innovate?',
    'contact.discuss': 'From smart contract audits to full-stack dApp development, let\'s discuss how we can push the boundaries of what\'s possible in Web3.',
    'contact.startConversation': 'Start the Conversation',
    'contact.connect': 'Let\'s Connect',
    'contact.ready': 'Ready to collaborate on blockchain projects or discuss Web3 opportunities? Get in touch!',
    'contact.linkedin.description': 'Connect with me professionally and see my career journey in blockchain development.',
    'contact.linkedin.cta': 'Connect on LinkedIn',
    'contact.github.description': 'Explore my code repositories, contributions, and open-source blockchain projects.',
    'contact.github.cta': 'View my repositories',
    'contact.email.description': 'Reach out directly for project inquiries, collaborations, or business opportunities.',
    'contact.aboutMe': 'About Me',
    'contact.nationality': 'French Nationality',
    'contact.languages': 'Languages:',
    'contact.yearsExperience': '{years}+ Years Experience',
    'contact.projectsDelivered': '{count}+ Projects Delivered',
    'contact.responseTime': '{time}h Response Time',
    'contact.focusCore': 'Focus on Core Logic',
    'contact.focusCoreDescription': 'More time for smart contract optimization and security',

    // Vibe Coding page
    'vibe-coding.title': 'Vibe Coding',
    'vibe-coding.subtitle': 'Coding with AI-powered tools and ambient vibes.',
    'vibe-coding.description': 'The Future of Development',
    'vibe-coding.aiPowered': 'AI-Powered',
    'vibe-coding.productivity': 'Enhanced Productivity',
    'vibe-coding.workflow': 'Enhanced Workflow',
    'vibe-coding.blockchainDev': 'Blockchain Development',
    'vibe-coding.aiAcceleration': 'AI Acceleration',
    'vibe-coding.approach': 'is my approach to blockchain development where powerful AI tools amplify my core expertise in Solidity and smart contract architecture.',
    'vibe-coding.whileIArchitect': 'While I architect, write, optimize, and audit smart contracts myself, AI accelerates everything else—building frontends, backends, and integrations at 10x speed to create complete dApp ecosystems.',
    'vibe-coding.coreExpertise': 'Core Blockchain Expertise',
    'vibe-coding.aiArsenal': 'AI Arsenal',
    'vibe-coding.arsenalSubtitle': 'The powerful AI tools that ignite my development velocity',
    'vibe-coding.impactMetrics': 'Impact Metrics',
    'vibe-coding.fasterFrontend': 'Faster Frontend Development',
    'vibe-coding.fasterFrontendDesc': 'From weeks to days for complete dApp interfaces',
    'vibe-coding.reducedIntegration': 'Reduced Integration Time',
    'vibe-coding.reducedIntegrationDesc': 'Seamless Web3 connectivity and API development',
    'vibe-coding.result': 'Result: Complete dApp ecosystems delivered in record time, without compromising on smart contract quality or security.',

    // Vibe Coding Core Expertise Items
    'vibe-coding.core.architecture': 'Smart Contract Architecture & Design',
    'vibe-coding.core.solidity': 'Solidity Development & Optimization',
    'vibe-coding.core.gas': 'Gas Efficiency & Security Patterns',
    'vibe-coding.core.deployment': 'Contract Deployment & Configuration',
    'vibe-coding.core.auditing': 'Security Auditing & Code Review',
    'vibe-coding.core.defi': 'DeFi Protocol Logic & Tokenomics',

    // Vibe Coding AI-Powered Items
    'vibe-coding.ai.frontend': 'React/Next.js Frontend Development',
    'vibe-coding.ai.backend': 'Node.js Backend & API Creation',
    'vibe-coding.ai.web3': 'Ethers.js Web3 Integrations',
    'vibe-coding.ai.ui': 'UI/UX Design & Component Libraries',
    'vibe-coding.ai.testing': 'Testing Suites & Automation',
    'vibe-coding.ai.docs': 'Documentation & Deployment Scripts',

    // AI Tools
    'vibe-coding.tool.claude.name': 'Claude Sonnet',
    'vibe-coding.tool.claude.desc': 'Advanced reasoning for complex architecture decisions and code reviews',
    'vibe-coding.tool.cursor.name': 'Cursor IDE',
    'vibe-coding.tool.cursor.desc': 'AI-powered code completion and refactoring at lightning speed',
    'vibe-coding.tool.copilot.name': 'GitHub Copilot',
    'vibe-coding.tool.copilot.desc': 'Intelligent code suggestions and boilerplate generation',
    'vibe-coding.tool.chatgpt.name': 'ChatGPT 4',
    'vibe-coding.tool.chatgpt.desc': 'Complex problem solving and technical documentation',
    'vibe-coding.tool.perplexity.name': 'Perplexity',
    'vibe-coding.tool.perplexity.desc': 'Real-time research and latest protocol documentation',
    'vibe-coding.tool.v0.name': 'v0 by Vercel',
    'vibe-coding.tool.v0.desc': 'Rapid UI prototyping and component generation',

    // Tech Stack Section  
    'techStack.title': 'My Tech Stack',
    'techStack.description': 'Technologies and tools I use to bring blockchain projects to life. My expertise spans from smart contract development to frontend implementation and backend integration.',
    
    // Featured Projects Section
    'featuredProjects.title': 'Featured Projects',
    'featuredProjects.description': 'Explore my recent blockchain development work, including smart contracts, DeFi applications, and web3 integrations. Each project showcases different aspects of my technical skills.',

    // GitHub Stats
    'github.topLanguages': 'Top Languages',
    'github.viewProfile': 'View GitHub Profile',
    'github.repositories': 'Repositories',
    'github.followers': 'Followers',
    'github.following': 'Following',
    'github.stars': 'Stars',
    'github.commits': 'Commits',
    'github.contributions': 'Contributions',
    'github.thisYear': 'This Year',

    // Experience Data Translations
    'exp.ledgity.position': 'Lead Blockchain Developer',
    'exp.ledgity.description': 'Led the blockchain development team in creating secure, efficient smart contracts and dApps.',
    'exp.ledgity.achievement.1': 'Developed robust, secure smart contracts using Solidity on Ethereum L1 and L2.',
    'exp.ledgity.achievement.2': 'Conducted code reviews and audits to ensure high-quality, bug-free code before deployment.',
    'exp.ledgity.achievement.3': 'Integrated decentralized applications (dApps) with smart contracts to enhance user experience.',
    'exp.ledgity.achievement.4': 'Managed the deployment and maintenance of smart contracts on multiple blockchain networks.',
    'exp.ledgity.achievement.5': 'Developed user-friendly interfaces for complex blockchain functions to improve accessibility.',

    'exp.freelance.position': 'Freelance Smart Contract Developer',
    'exp.freelance.description': 'Provided blockchain development services to various clients, focusing on smart contract creation and dApp development.',
    'exp.freelance.achievement.1': 'Created a staking contract for NFTs that successfully minted over 21 million ERC20 tokens and currently holding 1400+ NFTs in staking.',
    'exp.freelance.achievement.2': 'Developed and deployed decentralized applications on EVM Blockchains using Solidity, React.js, Next.js.',
    'exp.freelance.achievement.3': 'Collaborated with clients to define project requirements and deliver scalable solutions.',
    'exp.freelance.achievement.4': 'Integrated oracles for real-time data feeds into smart contracts.',
    'exp.freelance.achievement.5': 'Created and managed ERC-20 and ERC-721 token standards for various projects.',
    'exp.freelance.achievement.6': 'Conducted thorough testing using frameworks like Foundry and Hardhat.',

    'exp.tasc.position': 'CEO',
    'exp.tasc.description': 'Founded and led a company developing a Play-to-Earn blockchain game.',
    'exp.tasc.achievement.1': 'Founded a company to build a P2E game and led a team of developers using Agile methodologies (SCRUM).',
    'exp.tasc.achievement.2': 'Developed and implemented strategic vision to drive company growth and profitability.',
    'exp.tasc.achievement.3': 'Managed crisis communications effectively to maintain brand integrity.',
    'exp.tasc.achievement.4': 'Developed smart contracts for in-game assets using Solidity.',
    'exp.tasc.achievement.5': 'Implemented an Ethereum-based token economy to enhance player engagement.',

    'exp.future-institution.position': 'Lead Smart Contract Developer',
    'exp.future-institution.description': 'Led the development of smart contracts for a blockchain game.',
    'exp.future-institution.achievement.1': 'Led the development of smart contracts for a Blockchain game.',
    'exp.future-institution.achievement.2': 'Led the design and implementation of robust smart contracts on Ethereum.',
    'exp.future-institution.achievement.3': 'Implemented token standards, including ERC20 and ERC721, to facilitate token creation and management.',

    'exp.bitcoin-vietnam.position': 'Intern Web3 Developer',
    'exp.bitcoin-vietnam.description': 'Gained initial blockchain development experience through internship focused on Web3 technologies.',
    'exp.bitcoin-vietnam.achievement.1': 'Researched ERC20 tokens, and created an ERC20 token for the company.',
    'exp.bitcoin-vietnam.achievement.2': 'Collaborated with a team to develop decentralized applications (dApps) using Ethereum blockchain.',
    'exp.bitcoin-vietnam.achievement.3': 'Assisted in smart contract development using Solidity to automate processes and enhance security.',
    'exp.bitcoin-vietnam.achievement.4': 'Maintained the front-end of the website',

    'exp.alyra-jury.position': 'Technical Jury',
    'exp.alyra-jury.description': 'Evaluating and certifying the next generation of blockchain developers by assessing their final DApp projects, ensuring they meet industry standards for smart contract security, architecture, and innovation.',
    'exp.alyra-jury.achievement.1': 'September 2023 - Finney Jury - POAP: https://collectors.poap.xyz/token/6970868',
    'exp.alyra-jury.achievement.2': 'April 2024 - Lovelace Jury - POAP: https://collectors.poap.xyz/token/7112109',
    'exp.alyra-jury.achievement.3': 'July 2024 - Turing Jury - POAP: https://collectors.poap.xyz/token/7191799',
    'exp.alyra-jury.achievement.4': 'April 2025 - Galilée Jury - POAP: https://collectors.poap.xyz/token/7390138',
    'exp.alyra-jury.achievement.5': 'January 2025 - Hamilton Jury - POAP: https://collectors.poap.xyz/token/7390139',

    'exp.chiliz-hackathon.position': 'Hackathon Participant',
    'exp.chiliz-hackathon.description': 'Built "Chiliz Got Talent" - an innovative platform for sports talent discovery on Chiliz blockchain.',
    'exp.chiliz-hackathon.achievement.1': 'Developed full-stack dApp with React TypeScript frontend',
    'exp.chiliz-hackathon.achievement.2': 'Implemented smart contracts for talent verification and rewards',
    'exp.chiliz-hackathon.achievement.3': 'Created backend API with Handlebars templating',
    'exp.chiliz-hackathon.achievement.4': 'Delivered working prototype within hackathon timeframe',
    'exp.chiliz-hackathon.achievement.5': 'Team name: RedCodeChilizPeppers',

    'exp.eth-global-hackathon.position': 'Hackathon Participant',
    'exp.eth-global-hackathon.description': 'Built AATBA Profile - Trustless & Verifiable Profile with Security & Privacy, fully on-chain.',
    'exp.eth-global-hackathon.achievement.1': 'Developed on-chain identity management platform using Soul Bound Tokens (SBT)',
    'exp.eth-global-hackathon.achievement.2': 'Implemented Token Bound Accounts (TBA) with ERC6551 standard',
    'exp.eth-global-hackathon.achievement.3': 'Integrated Account Abstraction using ERC4337',
    'exp.eth-global-hackathon.achievement.4': 'Deployed across multiple testnets: Scroll Sepolia, Mantle, Mumbai Polygon',
    'exp.eth-global-hackathon.achievement.5': 'Created live demo at aatba.org',
    'exp.eth-global-hackathon.achievement.6': 'Collaborated with international team of 5 developers',

    'exp.careerzen-hackathon.position': 'Hackathon Participant',
    'exp.careerzen-hackathon.description': 'Built CareerZen - a blockchain-based career verification platform using NFTs to authenticate work history and enable anonymous professional networking.',
    'exp.careerzen-hackathon.achievement.1': 'Created career NFT system for verified work history and certifications',
    'exp.careerzen-hackathon.achievement.2': 'Implemented privacy-preserving profile sharing with approval mechanism',
    'exp.careerzen-hackathon.achievement.3': 'Built anonymous professional networking features for Asian job market needs',
    'exp.careerzen-hackathon.achievement.4': 'Tackled gasless transaction implementation with ecrecover signature verification',
    'exp.careerzen-hackathon.achievement.5': 'Enabled third-party career validation from mentors, hackathons, and instructors',

    // Education Data Translations
    'edu.rareskills.degree': 'Blockchain Development',
    'edu.rareskills.field': 'DeFi deepdive, NFT & ERC20, Testing & auditing, EVM deepdive: Yul/assembly/HUFF',
    'edu.rareskills.description': 'RareSkills is a premium blockchain education platform founded by Jeffrey Scholz, focusing on advanced smart contract security and optimization. This intensive program covers cutting-edge DeFi protocols, advanced ERC standards implementation, comprehensive testing methodologies, security auditing practices, and low-level EVM programming including Yul and assembly language. The curriculum is designed for experienced developers seeking expertise in blockchain security and gas optimization.',

    'edu.consensys.degree': 'Blockchain Development',
    'edu.consensys.field': 'Dapp, Ethereum, Solidity, React.js, Blockchain clients',
    'edu.consensys.description': 'ConsenSys Academy is the educational arm of ConsenSys, the leading Ethereum software company founded by Joseph Lubin. This comprehensive program provides enterprise-grade blockchain education, covering full-stack decentralized application development, Ethereum ecosystem architecture, advanced Solidity programming, React.js integration for Web3 frontends, and blockchain client implementation. The academy is recognized for producing industry-ready blockchain developers.',

    'edu.alyra.degree': 'Blockchain Development',
    'edu.alyra.field': 'Ethereum, Smart Contracts, Dapp Development',
    'edu.alyra.description': 'Alyra is France\'s leading blockchain school, offering comprehensive training programs in blockchain technology and smart contract development. This foundational program provides hands-on experience with Ethereum blockchain, smart contract architecture and deployment, decentralized application development, and blockchain fundamentals. Alyra is known for its practical approach to blockchain education and strong industry connections in the European blockchain ecosystem.',

    'edu.alyra-solana.degree': 'Solana Developer',
    'edu.alyra-solana.field': 'Solana blockchain, Rust programming, Anchor framework, SPL tokens',
    'edu.alyra-solana.description': 'Advanced Solana development program at Alyra focusing on high-performance blockchain development. This specialized course covers Solana\'s unique architecture, Rust programming for blockchain applications, the Anchor development framework, and SPL token creation. Students learn to build scalable decentralized applications on one of the fastest blockchains, mastering Solana\'s account model, program deployment, and integration with Web3 frontends.',

    'edu.udemy-rust-code.degree': 'Learn to Code with Rust',
    'edu.udemy-rust-code.field': 'Complete Rust programming course covering fundamentals, memory management, and systems programming',
    'edu.udemy-rust-code.description': 'A comprehensive Rust programming course that covers the language from fundamentals to advanced concepts. The course focuses on Rust\'s unique ownership system, memory safety without garbage collection, and systems programming capabilities. Students learn to build high-performance applications with zero-cost abstractions, concurrent programming, and robust error handling patterns that make Rust ideal for blockchain and systems development.',

    'edu.udemy-react-complete.degree': 'React - The Complete Guide',
    'edu.udemy-react-complete.field': 'Comprehensive React course including Redux, Hooks, Context API, and modern React patterns',
    'edu.udemy-react-complete.description': 'An in-depth React course covering modern React development patterns and best practices. The course includes advanced state management with Redux and Context API, modern React Hooks for functional programming, component lifecycle optimization, and performance techniques. Essential for building sophisticated Web3 frontends and decentralized applications with React.',

    'edu.udemy-nodejs-complete.degree': 'The Complete Node.js Developer Course',
    'edu.udemy-nodejs-complete.field': 'Full-stack Node.js development with Express, MongoDB, authentication, and API building',
    'edu.udemy-nodejs-complete.description': 'A comprehensive Node.js course covering server-side JavaScript development, RESTful API design, database integration with MongoDB, authentication systems, and deployment strategies. The course emphasizes building scalable backend services that can support blockchain applications and integrate with Web3 infrastructure for complete full-stack development.',

    'edu.udemy-react-zero-mastery.degree': 'Complete React Developer - Zero to Mastery',
    'edu.udemy-react-zero-mastery.field': 'Advanced React development including TypeScript, testing, performance optimization, and deployment',
    'edu.udemy-react-zero-mastery.description': 'An advanced React development course that takes students from beginner to expert level. Covers TypeScript integration for type-safe React applications, comprehensive testing strategies, performance optimization techniques, and production deployment workflows. Particularly valuable for building robust Web3 interfaces and decentralized application frontends with professional-grade code quality.',

    'edu.udemy-rust-crash.degree': 'Ultimate Rust Crash Course',
    'edu.udemy-rust-crash.field': 'Intensive Rust programming bootcamp focusing on practical applications and best practices',
    'edu.udemy-rust-crash.description': 'An intensive Rust programming bootcamp designed for rapid skill acquisition. The course focuses on Rust\'s unique ownership model, borrowing and lifetime concepts, trait system for code reuse, and concurrent programming patterns. Emphasizes practical applications and industry best practices, making it perfect for developers transitioning to blockchain development where performance and safety are critical.',

    'edu.udemy-linux-complete.degree': 'Complete Linux Training Course',
    'edu.udemy-linux-complete.field': 'Comprehensive Linux administration covering command line, system administration, and DevOps practices',
    'edu.udemy-linux-complete.description': 'A comprehensive Linux administration course covering command-line mastery, system administration, server management, and DevOps practices. The course includes shell scripting automation, network configuration, security hardening, and deployment strategies. Essential skills for managing blockchain node infrastructure and deploying decentralized applications in production environments.',

    'edu.udemy-solidity-advanced.degree': 'Advanced Solidity - Yul and Assembly',
    'edu.udemy-solidity-advanced.field': 'Deep dive into Solidity optimization using Yul intermediate language and EVM assembly programming',
    'edu.udemy-solidity-advanced.description': 'An advanced course focusing on low-level Solidity optimization techniques using Yul intermediate language and EVM assembly programming. Students learn to write highly optimized smart contracts, understand EVM internals, implement custom opcodes, and achieve significant gas savings. Critical knowledge for professional smart contract development and auditing in the DeFi space.',

    'edu.udemy-solidity-gas.degree': 'Advanced Solidity - Gas Optimization',
    'edu.udemy-solidity-gas.field': 'Advanced techniques for optimizing smart contract gas usage and understanding EVM internals',
    'edu.udemy-solidity-gas.description': 'A specialized course dedicated to smart contract gas optimization and EVM efficiency. Covers advanced techniques for reducing transaction costs, storage optimization patterns, function call efficiency, and EVM-level optimizations. Students learn to analyze gas consumption, implement cost-effective design patterns, and build economically sustainable smart contracts for production DeFi protocols.',

    // Common
    'common.learnMore': 'Learn More',
    'common.getStarted': 'Get Started',
    'common.viewAll': 'View All',
    'common.showLess': 'Show less',
    'common.viewMore': 'View {count} more {type} technologies',
    'common.viewAllProjects': 'View All Projects',
    'common.active': 'Active',
    'common.clickToView': 'Click to view',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.experience': 'Expérience',
    'nav.education': 'Éducation',
    'nav.skills': 'Compétences',
    'nav.projects': 'Projets',
    'nav.vibe-coding': 'Vibe Coding',
    'nav.contact': 'Contact',

    // Home page
    'hero.title': 'Développeur Blockchain',
    'hero.subtitle': 'Développeur blockchain expérimenté spécialisé dans les contrats intelligents, la DeFi et les NFTs. Construisant l\'avenir décentralisé, une ligne de code à la fois.',
    'hero.cta': 'Voir l\'Expérience',
    'hero.projects': 'Explorer les Projets',
    'hero.contact': 'Me Contacter',
    'hero.experienceYears': 'Développeur blockchain depuis {year}',
    'hero.tagline': 'Développeur Web3 Full Stack',

    // About section
    'about.title': 'À Propos de Moi',
    'about.description': 'Développeur blockchain passionné avec une expertise en contrats intelligents, protocoles DeFi et applications décentralisées. Je combine l\'excellence technique avec la résolution créative de problèmes pour livrer des solutions Web3 robustes.',
    'about.skills': 'Compétences Techniques',
    'about.interests.vibe': 'Sessions de vibe coding avec musique ambiante et états de flow',
    'about.vibeButton': 'Vibe Coding',
    'about.whatIDo': 'Ce Que Je Fais',
    'about.card1.text': 'Je suis un développeur blockchain passionné avec une expertise en développement de contrats intelligents, ayant commencé mon parcours en {year}. Avec plus de {experience} années dans l\'espace blockchain, j\'ai acquis une expérience approfondie en Solidity, EVM, DeFi et NFTs.',
    'about.card2.text': 'J\'aime construire des Applications Décentralisées (dApps) complètes de la conception à la production, en mettant l\'accent sur la sécurité, l\'efficacité et l\'expérience utilisateur. Mon expérience inclut le travail avec diverses plateformes et technologies blockchain, restant toujours à la pointe.',
    'about.card3.text': 'Élargissant actuellement mon expertise pour inclure Rust, Solana et Polkadot, j\'apprends et m\'adapte constamment au paysage blockchain en évolution.',
    'about.item1': 'Concevoir et développer des contrats intelligents sécurisés et efficaces',
    'about.item2': 'Construire des dApps complètes avec des technologies frontend modernes',
    'about.item3': 'Auditer et optimiser les projets blockchain existants',
    'about.item4': 'Créer et implémenter des économies de tokens et systèmes NFT',

    // Skills section
    'skills.blockchain': 'Blockchain',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.tools': 'Outils & Autres',
    'skills.hard': 'Hard Skills',
    'skills.soft': 'Soft Skills',
    'skills.mad': 'Mad Skills',
    'skills.matrix': 'Skills Matrix',
    
    // Hard Skills
    'skills.solidity': 'Solidity & Contrats Intelligents',
    'skills.react': 'React & Next.js',
    'skills.typescript': 'TypeScript & JavaScript',
    'skills.vibeCoding': 'Vibe Coding',
    'skills.web3': 'Web3 & Blockchain',
    'skills.nodejs': 'Node.js & Express',
    'skills.hardhat': 'Hardhat & Foundry',
    'skills.git': 'Git & Contrôle de Version',
    
    // Soft Skills
    'skills.listening': 'Écoute Active',
    'skills.motivation': 'Motivation d\'Équipe',
    'skills.leadership': 'Leadership Bienveillant',
    'skills.problemSolving': 'Résolution de Problèmes',
    'skills.collaboration': 'Collaboration d\'Équipe',
    'skills.communication': 'Communication',
    'skills.adaptability': 'Adaptabilité',
    'skills.criticalThinking': 'Pensée Critique',
    
    // Mad Skills
    'skills.canyoning': 'Canyoning',
    'skills.climbing': 'Escalade',
    'skills.paragliding': 'Parapente',
    'skills.hiking': 'Randonnée & Trekking',
    'skills.lateNightCoding': 'Codage Nocturne',
    'skills.hackathons': 'Participation aux Hackathons',
    'skills.auditing': 'Audit de Contrats Intelligents',
    'skills.gasOptimization': 'Obsession d\'Optimisation du Gas',
    
    // Experience page
    'experience.title': 'Expérience Professionnelle',
    'experience.subtitle': 'Mon parcours dans le développement blockchain et web, construisant des solutions innovantes et développant mon expertise.',
    'experience.achievements': 'RÉALISATIONS CLÉS',
    'experience.clickForAchievements': 'CLIQUER POUR RÉALISATIONS',
    'experience.clickForDetails': 'CLIQUER POUR RETOUR',
    'experience.recent': 'Expérience Récente',
    'experience.viewFull': 'Voir l\'Expérience Complète',
    'experience.more': '+{count} de plus',
    'experience.noAchievements': 'Aucune réalisation spécifique listée pour ce poste.',
    'experience.present': 'PRÉSENT',

    // Education page
    'education.title': 'Éducation',
    'education.subtitle': 'Mon parcours académique à travers la technologie blockchain, le développement de contrats intelligents et les systèmes décentralisés.',
    'education.skillsAcquired': 'COMPÉTENCES ACQUISES',
    'education.courseDetails': 'DÉTAILS DU COURS',
    'education.clickForDetails': 'CLIQUER POUR DÉTAILS',
    'education.clickForSkills': 'CLIQUER POUR COMPÉTENCES',
    'education.certifications': 'Certifications',
    'education.certificationsSubtitle': 'Certifications professionnelles et programmes de formation spécialisés.',

    // Projects page
    'projects.title': 'Mes Projets',
    'projects.subtitle': 'Une collection de projets blockchain, contrats intelligents et DApps récupérés directement de mes référentiels GitHub.',
    'projects.github': 'GitHub',
    'projects.demo': 'Démo Live',
    'projects.githubStats': 'Statistiques GitHub',
    'projects.githubStatsSubtitle': 'Métriques en temps réel montrant mon activité de développement et expertise en langages',
    'projects.loading': 'Chargement des Projets...',
    'projects.loadingDescription': 'Récupération des derniers projets depuis GitHub. Veuillez actualiser si cela prend trop de temps.',
    'projects.noProjects': 'Aucun Projet Trouvé',
    'projects.noProjectsDescription': 'Impossible de récupérer les projets depuis GitHub pour le moment.',

    // Contact page
    'contact.title': 'Me Contacter',
    'contact.subtitle': 'Discutons de votre prochain projet blockchain.',
    'contact.buildTogether': 'Construisons Ensemble',
    'contact.vision': 'Prêt à donner vie à votre vision blockchain ? Je me spécialise dans la création de contrats intelligents robustes, de solutions DeFi innovantes et d\'expériences Web3 transparentes.',
    'contact.innovate': 'Prêt à Innover ?',
    'contact.discuss': 'Des audits de contrats intelligents au développement complet de dApps, discutons de la façon dont nous pouvons repousser les limites du possible dans le Web3.',
    'contact.startConversation': 'Commencer la Conversation',
    'contact.connect': 'Connectons-nous',
    'contact.ready': 'Prêt à collaborer sur des projets blockchain ou discuter d\'opportunités Web3 ? Contactez-moi !',
    'contact.linkedin.description': 'Connectez-vous avec moi professionnellement et découvrez mon parcours dans le développement blockchain.',
    'contact.linkedin.cta': 'Se connecter sur LinkedIn',
    'contact.github.description': 'Explorez mes référentiels de code, contributions et projets blockchain open-source.',
    'contact.github.cta': 'Voir mes référentiels',
    'contact.email.description': 'Contactez-moi directement pour des demandes de projets, collaborations ou opportunités d\'affaires.',
    'contact.aboutMe': 'À Propos de Moi',
    'contact.nationality': 'Nationalité Française',
    'contact.languages': 'Langues :',
    'contact.yearsExperience': '{years}+ Années d\'Expérience',
    'contact.projectsDelivered': '{count}+ Projets Livrés',
    'contact.responseTime': '{time}h Temps de Réponse',
    'contact.focusCore': 'Focus sur la Logique Cœur',
    'contact.focusCoreDescription': 'Plus de temps pour l\'optimisation et la sécurité des contrats intelligents',

    // Vibe Coding page
    'vibe-coding.title': 'Vibe Coding',
    'vibe-coding.subtitle': 'Développement avec des outils alimentés par IA et des ambiances zen.',
    'vibe-coding.description': 'L\'Avenir du Développement',
    'vibe-coding.aiPowered': 'Alimenté par IA',
    'vibe-coding.productivity': 'Productivité Améliorée',
    'vibe-coding.workflow': 'Développement Accéléré',
    'vibe-coding.blockchainDev': 'Développement Blockchain',
    'vibe-coding.aiAcceleration': 'Accélération IA',
    'vibe-coding.approach': 'est mon approche du développement blockchain où de puissants outils IA amplifient mon expertise principale en Solidity et architecture de contrats intelligents.',
    'vibe-coding.whileIArchitect': 'Pendant que j\'architecture, écris, optimise et audite les contrats intelligents moi-même, l\'IA accélère tout le reste—construire les frontends, backends et intégrations à une vitesse 10x pour créer des écosystèmes dApp complets.',
    'vibe-coding.coreExpertise': 'Expertise Blockchain Fondamentale',
    'vibe-coding.aiArsenal': 'Arsenal IA',
    'vibe-coding.arsenalSubtitle': 'Les puissants outils IA qui enflamment ma vélocité de développement',
    'vibe-coding.impactMetrics': 'Métriques d\'Impact',
    'vibe-coding.fasterFrontend': 'Développement Frontend Plus Rapide',
    'vibe-coding.fasterFrontendDesc': 'De semaines à jours pour des interfaces dApp complètes',
    'vibe-coding.reducedIntegration': 'Temps d\'Intégration Réduit',
    'vibe-coding.reducedIntegrationDesc': 'Connectivité Web3 et développement API transparents',
    'vibe-coding.result': 'Résultat : Écosystèmes dApp complets livrés en temps record, sans compromettre la qualité ou la sécurité des contrats intelligents.',
    // Vibe Coding Core Expertise Items
    'vibe-coding.core.architecture': 'Architecture et Conception de Contrats Intelligents',
    'vibe-coding.core.solidity': 'Développement et Optimisation Solidity',
    'vibe-coding.core.gas': 'Efficacité Gas et Patterns de Sécurité',
    'vibe-coding.core.deployment': 'Déploiement et Configuration de Contrats',
    'vibe-coding.core.auditing': 'Audit de Sécurité et Revue de Code',
    'vibe-coding.core.defi': 'Logique de Protocole DeFi et Tokenomics',
    // Vibe Coding AI-Powered Items
    'vibe-coding.ai.frontend': 'Développement Frontend React/Next.js',
    'vibe-coding.ai.backend': 'Création Backend Node.js et API',
    'vibe-coding.ai.web3': 'Intégrations Web3 Ethers.js',
    'vibe-coding.ai.ui': 'Design UI/UX et Bibliothèques de Composants',
    'vibe-coding.ai.testing': 'Suites de Tests et Automatisation',
    'vibe-coding.ai.docs': 'Documentation et Scripts de Déploiement',
    // AI Tools
    'vibe-coding.tool.claude.name': 'Claude Sonnet',
    'vibe-coding.tool.claude.desc': 'Raisonnement avancé pour les décisions d\'architecture complexes et revues de code',
    'vibe-coding.tool.cursor.name': 'Cursor IDE',
    'vibe-coding.tool.cursor.desc': 'Complétion de code et refactoring alimentés par IA à la vitesse de l\'éclair',
    'vibe-coding.tool.copilot.name': 'GitHub Copilot',
    'vibe-coding.tool.copilot.desc': 'Suggestions de code intelligentes et génération de code standard',
    'vibe-coding.tool.chatgpt.name': 'ChatGPT 4',
    'vibe-coding.tool.chatgpt.desc': 'Résolution de problèmes complexes et documentation technique',
    'vibe-coding.tool.perplexity.name': 'Perplexity',
    'vibe-coding.tool.perplexity.desc': 'Recherche en temps réel et documentation de protocoles récents',
    'vibe-coding.tool.v0.name': 'v0 by Vercel',
    'vibe-coding.tool.v0.desc': 'Prototypage UI rapide et génération de composants',

    // Tech Stack Section  
    'techStack.title': 'Ma Stack Technique',
    'techStack.description': 'Technologies et outils que j\'utilise pour donner vie aux projets blockchain. Mon expertise s\'étend du développement de contrats intelligents à l\'implémentation frontend et l\'intégration backend.',
    
    // Featured Projects Section
    'featuredProjects.title': 'Projets En Vedette',
    'featuredProjects.description': 'Explorez mon travail récent de développement blockchain, incluant contrats intelligents, applications DeFi, et intégrations web3. Chaque projet met en valeur différents aspects de mes compétences techniques.',

    // GitHub Stats
    'github.topLanguages': 'Langages Principaux',
    'github.viewProfile': 'Voir le Profil GitHub',
    'github.repositories': 'Référentiels',
    'github.followers': 'Abonnés',
    'github.following': 'Abonnements',
    'github.stars': 'Étoiles',
    'github.commits': 'Commits',
    'github.contributions': 'Contributions',
    'github.thisYear': 'Cette Année',

    // Experience Data Translations
    'exp.ledgity.position': 'Développeur Blockchain Principal',
    'exp.ledgity.description': 'Dirigé l\'équipe de développement blockchain pour créer des contrats intelligents sécurisés et efficaces et des dApps.',
    'exp.ledgity.achievement.1': 'Développé des contrats intelligents robustes et sécurisés utilisant Solidity sur Ethereum L1 et L2.',
    'exp.ledgity.achievement.2': 'Effectué des révisions de code et audits pour garantir un code de haute qualité, sans bugs avant le déploiement.',
    'exp.ledgity.achievement.3': 'Intégré des applications décentralisées (dApps) avec des contrats intelligents pour améliorer l\'expérience utilisateur.',
    'exp.ledgity.achievement.4': 'Géré le déploiement et la maintenance de contrats intelligents sur plusieurs réseaux blockchain.',
    'exp.ledgity.achievement.5': 'Développé des interfaces conviviales pour des fonctions blockchain complexes afin d\'améliorer l\'accessibilité.',

    'exp.freelance.position': 'Développeur Smart Contract Freelance',
    'exp.freelance.description': 'Fourni des services de développement blockchain à divers clients, en me concentrant sur la création de contrats intelligents et le développement de dApps.',
    'exp.freelance.achievement.1': 'Créé un contrat de staking pour les NFTs qui a avec succès minté plus de 21 millions de tokens ERC20 et détient actuellement plus de 1400 NFTs en staking.',
    'exp.freelance.achievement.2': 'Développé et déployé des applications décentralisées sur les blockchains EVM utilisant Solidity, React.js, Next.js.',
    'exp.freelance.achievement.3': 'Collaboré avec les clients pour définir les exigences du projet et livrer des solutions évolutives.',
    'exp.freelance.achievement.4': 'Intégré des oracles pour les flux de données en temps réel dans les contrats intelligents.',
    'exp.freelance.achievement.5': 'Créé et géré les standards de tokens ERC-20 et ERC-721 pour divers projets.',
    'exp.freelance.achievement.6': 'Effectué des tests approfondis utilisant des frameworks comme Foundry et Hardhat.',

    'exp.tasc.position': 'PDG',
    'exp.tasc.description': 'Fondé et dirigé une entreprise développant un jeu blockchain Play-to-Earn.',
    'exp.tasc.achievement.1': 'Fondé une entreprise pour construire un jeu P2E et dirigé une équipe de développeurs utilisant les méthodologies Agiles (SCRUM).',
    'exp.tasc.achievement.2': 'Développé et implémenté une vision stratégique pour stimuler la croissance et la rentabilité de l\'entreprise.',
    'exp.tasc.achievement.3': 'Géré efficacement les communications de crise pour maintenir l\'intégrité de la marque.',
    'exp.tasc.achievement.4': 'Développé des contrats intelligents pour les actifs du jeu utilisant Solidity.',
    'exp.tasc.achievement.5': 'Implémenté une économie de tokens basée sur Ethereum pour améliorer l\'engagement des joueurs.',

    'exp.future-institution.position': 'Développeur Smart Contract Principal',
    'exp.future-institution.description': 'Dirigé le développement de contrats intelligents pour un jeu blockchain.',
    'exp.future-institution.achievement.1': 'Dirigé le développement de contrats intelligents pour un jeu Blockchain.',
    'exp.future-institution.achievement.2': 'Dirigé la conception et l\'implémentation de contrats intelligents robustes sur Ethereum.',
    'exp.future-institution.achievement.3': 'Implémenté les standards de tokens, incluant ERC20 et ERC721, pour faciliter la création et la gestion de tokens.',

    'exp.bitcoin-vietnam.position': 'Stagiaire Développeur Web3',
    'exp.bitcoin-vietnam.description': 'Acquis une expérience initiale de développement blockchain grâce à un stage axé sur les technologies Web3.',
    'exp.bitcoin-vietnam.achievement.1': 'Recherché les tokens ERC20, et créé un token ERC20 pour l\'entreprise.',
    'exp.bitcoin-vietnam.achievement.2': 'Collaboré avec une équipe pour développer des applications décentralisées (dApps) utilisant la blockchain Ethereum.',
    'exp.bitcoin-vietnam.achievement.3': 'Assisté dans le développement de contrats intelligents utilisant Solidity pour automatiser les processus et améliorer la sécurité.',
    'exp.bitcoin-vietnam.achievement.4': 'Maintenu le front-end du site web',

    'exp.alyra-jury.position': 'Jury Technique',
    'exp.alyra-jury.description': 'Évaluation et certification de la prochaine génération de développeurs blockchain en évaluant leurs projets DApp finaux, s\'assurant qu\'ils respectent les standards de l\'industrie pour la sécurité, l\'architecture et l\'innovation des contrats intelligents.',
    'exp.alyra-jury.achievement.1': 'Septembre 2023 - Jury Finney - POAP : https://collectors.poap.xyz/token/6970868',
    'exp.alyra-jury.achievement.2': 'Avril 2024 - Jury Lovelace - POAP : https://collectors.poap.xyz/token/7112109',
    'exp.alyra-jury.achievement.3': 'Juillet 2024 - Jury Turing - POAP : https://collectors.poap.xyz/token/7191799',
    'exp.alyra-jury.achievement.4': 'Avril 2025 - Jury Galilée - POAP : https://collectors.poap.xyz/token/7390138',
    'exp.alyra-jury.achievement.5': 'Janvier 2025 - Jury Hamilton - POAP : https://collectors.poap.xyz/token/7390139',

    'exp.chiliz-hackathon.position': 'Participant Hackathon',
    'exp.chiliz-hackathon.description': 'Construit Chiliz Got Talent - une plateforme innovante pour la découverte de talents sportifs sur la blockchain Chiliz.',
    'exp.chiliz-hackathon.achievement.1': 'Développé une dApp full-stack avec un frontend React TypeScript',
    'exp.chiliz-hackathon.achievement.2': 'Implémenté des contrats intelligents pour la vérification des talents et les récompenses',
    'exp.chiliz-hackathon.achievement.3': 'Créé une API backend avec le templating Handlebars',
    'exp.chiliz-hackathon.achievement.4': 'Livré un prototype fonctionnel dans les délais du hackathon',
    'exp.chiliz-hackathon.achievement.5': 'Nom d\'équipe : RedCodeChilizPeppers',

    'exp.eth-global-hackathon.position': 'Participant Hackathon',
    'exp.eth-global-hackathon.description': 'Construit AATBA Profile - Profil Sans Confiance et Vérifiable avec Sécurité et Confidentialité, entièrement on-chain.',
    'exp.eth-global-hackathon.achievement.1': 'Développé une plateforme de gestion d\'identité on-chain utilisant les Soul Bound Tokens (SBT)',
    'exp.eth-global-hackathon.achievement.2': 'Implémenté les Token Bound Accounts (TBA) avec le standard ERC6551',
    'exp.eth-global-hackathon.achievement.3': 'Intégré l\'Account Abstraction utilisant ERC4337',
    'exp.eth-global-hackathon.achievement.4': 'Déployé sur plusieurs testnets : Scroll Sepolia, Mantle, Mumbai Polygon',
    'exp.eth-global-hackathon.achievement.5': 'Créé une démo live sur aatba.org',
    'exp.eth-global-hackathon.achievement.6': 'Collaboré avec une équipe internationale de 5 développeurs',

    'exp.careerzen-hackathon.position': 'Participant Hackathon',
    'exp.careerzen-hackathon.description': 'Construit CareerZen - une plateforme de vérification de carrière basée sur la blockchain utilisant des NFTs pour authentifier l\'historique professionnel et permettre le réseautage professionnel anonyme.',
    'exp.careerzen-hackathon.achievement.1': 'Créé un système de NFT de carrière pour l\'historique professionnel et les certifications vérifiés',
    'exp.careerzen-hackathon.achievement.2': 'Implémenté le partage de profil préservant la confidentialité avec mécanisme d\'approbation',
    'exp.careerzen-hackathon.achievement.3': 'Construit des fonctionnalités de réseautage professionnel anonyme pour les besoins du marché asiatique',
    'exp.careerzen-hackathon.achievement.4': 'Abordé l\'implémentation de transactions sans gas avec vérification de signature ecrecover',
    'exp.careerzen-hackathon.achievement.5': 'Permis la validation de carrière par des tiers : mentors, hackathons et instructeurs',

    // Education Data Translations
    'edu.rareskills.degree': 'Développement Blockchain',
    'edu.rareskills.field': 'Plongée DeFi, NFT & ERC20, Tests & audits, Plongée EVM : Yul/assembly/HUFF',
    'edu.rareskills.description': 'RareSkills est une plateforme d\'éducation blockchain premium fondée par Jeffrey Scholz, axée sur la sécurité avancée et l\'optimisation des contrats intelligents. Ce programme intensif couvre les protocoles DeFi de pointe, l\'implémentation avancée des standards ERC, les méthodologies de test complètes, les pratiques d\'audit de sécurité, et la programmation EVM de bas niveau incluant Yul et le langage assembly. Le programme est conçu pour les développeurs expérimentés cherchant une expertise en sécurité blockchain et optimisation gas.',

    'edu.consensys.degree': 'Développement Blockchain',
    'edu.consensys.field': 'Dapp, Ethereum, Solidity, React.js, Clients blockchain',
    'edu.consensys.description': 'ConsenSys Academy est la branche éducative de ConsenSys, la principale société de logiciels Ethereum fondée par Joseph Lubin. Ce programme complet fournit une éducation blockchain de niveau entreprise, couvrant le développement d\'applications décentralisées full-stack, l\'architecture de l\'écosystème Ethereum, la programmation Solidity avancée, l\'intégration React.js pour les frontends Web3, et l\'implémentation de clients blockchain. L\'académie est reconnue pour produire des développeurs blockchain prêts pour l\'industrie.',

    'edu.alyra.degree': 'Développement Blockchain',
    'edu.alyra.field': 'Ethereum, Contrats Intelligents, Développement Dapp',
    'edu.alyra.description': 'Alyra est la principale école blockchain de France, offrant des programmes de formation complets en technologie blockchain et développement de contrats intelligents. Ce programme fondamental fournit une expérience pratique avec la blockchain Ethereum, l\'architecture et le déploiement de contrats intelligents, le développement d\'applications décentralisées, et les fondamentaux blockchain. Alyra est connue pour son approche pratique de l\'éducation blockchain et ses fortes connexions industrielles dans l\'écosystème blockchain européen.',

    'edu.alyra-solana.degree': 'Développeur Solana',
    'edu.alyra-solana.field': 'Blockchain Solana, programmation Rust, framework Anchor, tokens SPL',
    'edu.alyra-solana.description': 'Programme de développement Solana avancé chez Alyra axé sur le développement blockchain haute performance. Ce cours spécialisé couvre l\'architecture unique de Solana, la programmation Rust pour les applications blockchain, le framework de développement Anchor, et la création de tokens SPL. Les étudiants apprennent à construire des applications décentralisées évolutives sur l\'une des blockchains les plus rapides, maîtrisant le modèle de compte de Solana, le déploiement de programmes, et l\'intégration avec les frontends Web3.',

    'edu.udemy-rust-code.degree': 'Apprendre à Coder avec Rust',
    'edu.udemy-rust-code.field': 'Cours complet de programmation Rust couvrant les fondamentaux, la gestion mémoire, et la programmation système',
    'edu.udemy-rust-code.description': 'Un cours de programmation Rust complet qui couvre le langage des fondamentaux aux concepts avancés. Le cours se concentre sur le système de propriété unique de Rust, la sécurité mémoire sans garbage collection, et les capacités de programmation système. Les étudiants apprennent à construire des applications haute performance avec des abstractions à coût zéro, la programmation concurrente, et des patterns de gestion d\'erreurs robustes qui rendent Rust idéal pour le développement blockchain et système.',

    'edu.udemy-react-complete.degree': 'React - Le Guide Complet',
    'edu.udemy-react-complete.field': 'Cours React complet incluant Redux, Hooks, Context API, et patterns React modernes',
    'edu.udemy-react-complete.description': 'Un cours React approfondi couvrant les patterns de développement React modernes et les meilleures pratiques. Le cours inclut la gestion d\'état avancée avec Redux et Context API, les React Hooks modernes pour la programmation fonctionnelle, l\'optimisation du cycle de vie des composants, et les techniques de performance. Essentiel pour construire des frontends Web3 sophistiqués et des applications décentralisées avec React.',

    'edu.udemy-nodejs-complete.degree': 'Le Cours Complet Développeur Node.js',
    'edu.udemy-nodejs-complete.field': 'Développement Node.js full-stack avec Express, MongoDB, authentification, et construction d\'API',
    'edu.udemy-nodejs-complete.description': 'Un cours Node.js complet couvrant le développement JavaScript côté serveur, la conception d\'API RESTful, l\'intégration de base de données avec MongoDB, les systèmes d\'authentification, et les stratégies de déploiement. Le cours met l\'accent sur la construction de services backend évolutifs pouvant supporter les applications blockchain et s\'intégrer avec l\'infrastructure Web3 pour un développement full-stack complet.',

    'edu.udemy-react-zero-mastery.degree': 'Développeur React Complet - Zéro vers Maîtrise',
    'edu.udemy-react-zero-mastery.field': 'Développement React avancé incluant TypeScript, tests, optimisation performance, et déploiement',
    'edu.udemy-react-zero-mastery.description': 'Un cours de développement React avancé qui emmène les étudiants du niveau débutant à expert. Couvre l\'intégration TypeScript pour les applications React type-safe, les stratégies de test complètes, les techniques d\'optimisation performance, et les workflows de déploiement production. Particulièrement précieux pour construire des interfaces Web3 robustes et des frontends d\'applications décentralisées avec une qualité de code de niveau professionnel.',

    'edu.udemy-rust-crash.degree': 'Cours Accéléré Rust Ultime',
    'edu.udemy-rust-crash.field': 'Bootcamp intensif programmation Rust axé sur les applications pratiques et meilleures pratiques',
    'edu.udemy-rust-crash.description': 'Un bootcamp de programmation Rust intensif conçu pour l\'acquisition rapide de compétences. Le cours se concentre sur le modèle de propriété unique de Rust, les concepts d\'emprunt et de durée de vie, le système de traits pour la réutilisation de code, et les patterns de programmation concurrente. Met l\'accent sur les applications pratiques et les meilleures pratiques industrielles, parfait pour les développeurs transitionnant vers le développement blockchain où la performance et la sécurité sont critiques.',

    'edu.udemy-linux-complete.degree': 'Cours de Formation Linux Complet',
    'edu.udemy-linux-complete.field': 'Administration Linux complète couvrant ligne de commande, administration système, et pratiques DevOps',
    'edu.udemy-linux-complete.description': 'Un cours d\'administration Linux complet couvrant la maîtrise de la ligne de commande, l\'administration système, la gestion de serveurs, et les pratiques DevOps. Le cours inclut l\'automatisation par scripts shell, la configuration réseau, le durcissement sécuritaire, et les stratégies de déploiement. Compétences essentielles pour gérer l\'infrastructure de nœuds blockchain et déployer des applications décentralisées dans des environnements de production.',

    'edu.udemy-solidity-advanced.degree': 'Solidity Avancé - Yul et Assembly',
    'edu.udemy-solidity-advanced.field': 'Plongée profonde dans l\'optimisation Solidity utilisant le langage intermédiaire Yul et la programmation assembly EVM',
    'edu.udemy-solidity-advanced.description': 'Un cours avancé axé sur les techniques d\'optimisation Solidity de bas niveau utilisant le langage intermédiaire Yul et la programmation assembly EVM. Les étudiants apprennent à écrire des contrats intelligents hautement optimisés, comprendre les internals EVM, implémenter des opcodes personnalisés, et réaliser des économies de gas significatives. Connaissance critique pour le développement professionnel de contrats intelligents et l\'audit dans l\'espace DeFi.',

    'edu.udemy-solidity-gas.degree': 'Solidity Avancé - Optimisation Gas',
    'edu.udemy-solidity-gas.field': 'Techniques avancées pour optimiser l\'usage gas des contrats intelligents et comprendre les internals EVM',
    'edu.udemy-solidity-gas.description': 'Un cours spécialisé dédié à l\'optimisation gas des contrats intelligents et à l\'efficacité EVM. Couvre les techniques avancées pour réduire les coûts de transaction, les patterns d\'optimisation stockage, l\'efficacité des appels de fonction, et les optimisations niveau EVM. Les étudiants apprennent à analyser la consommation gas, implémenter des patterns de design rentables, et construire des contrats intelligents économiquement durables pour les protocoles DeFi de production.',

    // Common
    'common.learnMore': 'En Savoir Plus',
    'common.getStarted': 'Commencer',
    'common.viewAll': 'Voir Tout',
    'common.showLess': 'Voir moins',
    'common.viewMore': 'Voir {count} technologies {type} de plus',
    'common.viewAllProjects': 'Voir Tous les Projets',
    'common.active': 'Actif',
    'common.clickToView': 'Cliquer pour voir',
  }
};