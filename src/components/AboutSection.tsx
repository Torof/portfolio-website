import { personalInfo } from "@/lib/data";

export default function AboutSection() {
  return (
    <div className="mt-16 md:mt-24">
      <h2 className="text-3xl font-bold mb-6 text-white">About Me</h2>
      <div className="space-y-4">
        <p className="text-lg text-[var(--dark-200)] leading-relaxed">
          I'm a passionate blockchain developer with expertise in smart contract development,
          having started my journey in {personalInfo.startedBlockchain}. With over {new Date().getFullYear() - parseInt(personalInfo.startedBlockchain)} years
          in the blockchain space, I've gained deep experience in Solidity, EVM, DeFi, and NFTs.
        </p>
        <p className="text-lg text-[var(--dark-200)] leading-relaxed">
          I enjoy building fullstack Decentralized Applications (dApps) from conception to production,
          with a focus on security, efficiency, and user experience. My background includes working
          with various blockchain platforms and technologies, always staying at the cutting edge.
        </p>
        <p className="text-lg text-[var(--dark-200)] leading-relaxed">
          Currently expanding my expertise to include Rust, Solana, and Polkadot, I'm constantly
          learning and adapting to the evolving blockchain landscape.
        </p>
      </div>
      
      <div className="mt-8 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-xl p-5">
        <h3 className="text-lg font-medium mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[var(--primary-400)]">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 8v4M12 16h.01"></path>
          </svg>
          What I Do
        </h3>
        <ul className="space-y-3 text-[var(--dark-200)]">
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-1 text-[var(--primary-400)]">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Design and develop secure, efficient smart contracts
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-1 text-[var(--primary-400)]">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Build full-stack dApps with modern frontend technologies
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-1 text-[var(--primary-400)]">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Audit and optimize existing blockchain projects
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-1 text-[var(--primary-400)]">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Create and implement token economies and NFT systems
          </li>
        </ul>
      </div>
    </div>
  );
}