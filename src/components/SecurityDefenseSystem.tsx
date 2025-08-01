'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import { SkillCategory } from '@/lib/types';

interface SecurityDefenseSystemProps {
  category: SkillCategory;
}

// Threat types that will fall from the sky - mapped to real security vulnerabilities
const threatTypes = [
  { 
    id: 'reentrancy', 
    name: 'Reentrancy Attack', 
    icon: '🔄', 
    color: '#ef4444', 
    defendedBy: 'auditing',
    description: 'Malicious contract calls back into vulnerable function before state updates complete',
    process: {
      detect: 'Use static analysis tools (Slither) to identify external calls before state changes',
      prevent: 'Apply checks-effects-interactions pattern and use ReentrancyGuard modifier',
      fix: 'Move state updates before external calls, add mutex locks'
    }
  },
  { 
    id: 'overflow', 
    name: 'Integer Overflow', 
    icon: '💯', 
    color: '#f59e0b', 
    defendedBy: 'invariant-testing',
    description: 'Arithmetic operations exceed maximum values causing unexpected behavior',
    process: {
      detect: 'Implement invariant testing with Foundry to catch arithmetic edge cases',
      prevent: 'Use SafeMath library or Solidity 0.8+ built-in overflow checks',
      fix: 'Replace unchecked arithmetic with safe operations and add bounds checking'
    }
  },
  { 
    id: 'flash-loan', 
    name: 'Flash Loan Attack', 
    icon: '⚡', 
    color: '#8b5cf6', 
    defendedBy: 'mev-protection',
    description: 'Exploits using large uncollateralized loans to manipulate DeFi protocols',
    process: {
      detect: 'Monitor for unusual transaction patterns and price oracle manipulations',
      prevent: 'Use time-weighted average prices (TWAP) and transaction delays',
      fix: 'Implement oracle validation, add slippage protection and pause mechanisms'
    }
  },
  { 
    id: 'access-control', 
    name: 'Access Control Bug', 
    icon: '🔓', 
    color: '#3b82f6', 
    defendedBy: 'attack-vectors',
    description: 'Unauthorized users gain access to restricted functions or data',
    process: {
      detect: 'Audit role assignments and use access control testing frameworks',
      prevent: 'Implement OpenZeppelin AccessControl with proper role hierarchies',
      fix: 'Add onlyRole modifiers and remove unused privileged functions'
    }
  },
  { 
    id: 'price-manip', 
    name: 'Price Oracle Attack', 
    icon: '📈', 
    color: '#10b981', 
    defendedBy: 'formal-verification',
    description: 'Manipulation of price feeds to exploit DeFi lending and trading protocols',
    process: {
      detect: 'Monitor price deviations and use multiple oracle sources for validation',
      prevent: 'Implement Chainlink oracles with heartbeat and deviation thresholds',
      fix: 'Add circuit breakers, price sanity checks, and oracle aggregation'
    }
  },
  { 
    id: 'front-run', 
    name: 'Front-running', 
    icon: '🏃', 
    color: '#ec4899', 
    defendedBy: 'mev-protection',
    description: 'Malicious actors front-run transactions for profit extraction',
    process: {
      detect: 'Analyze mempool for transaction ordering attacks and MEV patterns',
      prevent: 'Use commit-reveal schemes and private mempools (Flashbots)',
      fix: 'Implement batch auctions, time delays, and randomized execution'
    }
  },
  { 
    id: 'dos', 
    name: 'DoS Attack', 
    icon: '🚫', 
    color: '#6366f1', 
    defendedBy: 'common-vulnerabilities',
    description: 'Denial of service attacks that prevent normal contract operations',
    process: {
      detect: 'Monitor gas usage patterns and failed transaction spikes',
      prevent: 'Implement rate limiting, gas limits, and withdrawal patterns',
      fix: 'Add circuit breakers, emergency pauses, and external call limits'
    }
  },
  { 
    id: 'logic-bug', 
    name: 'Logic Vulnerability', 
    icon: '🐛', 
    color: '#14b8a6', 
    defendedBy: 'formal-verification',
    description: 'Flawed business logic that leads to unintended contract behavior',
    process: {
      detect: 'Use formal verification tools and comprehensive property testing',
      prevent: 'Write detailed specifications and use property-based testing',
      fix: 'Refactor business logic, add invariant checks, and emergency controls'
    }
  },
  {
    id: 'timestamp-manip',
    name: 'Timestamp Manipulation',
    icon: '⏰',
    color: '#f97316',
    defendedBy: 'common-vulnerabilities',
    description: 'Miners can manipulate block.timestamp within ~15 seconds for profit',
    process: {
      detect: 'Review timestamp dependencies and time-sensitive logic in contracts',
      prevent: 'Avoid block.timestamp for critical logic, use block numbers instead',
      fix: 'Replace timestamp checks with block-based delays and tolerances'
    }
  },
  {
    id: 'signature-replay',
    name: 'Signature Replay Attack',
    icon: '🔁',
    color: '#0891b2',
    defendedBy: 'auditing',
    description: 'Reusing valid signatures across different contexts or chains',
    process: {
      detect: 'Check for nonce usage and domain separation in signature schemes',
      prevent: 'Use EIP-712 with proper domain separators and nonces',
      fix: 'Add replay protection with incremental nonces and chain IDs'
    }
  },
  {
    id: 'sandwich-attack',
    name: 'Sandwich Attack',
    icon: '🥪',
    color: '#dc2626',
    defendedBy: 'mev-protection',
    description: 'MEV bots front-run and back-run user transactions for profit',
    process: {
      detect: 'Monitor for transaction ordering patterns and slippage exploitation',
      prevent: 'Implement dynamic slippage protection and private mempools',
      fix: 'Add MEV protection mechanisms and fair ordering systems'
    }
  },
  {
    id: 'governance-attack',
    name: 'Governance Attack',
    icon: '🗳️',
    color: '#7c3aed',
    defendedBy: 'auditing',
    description: 'Malicious proposals or flash loan voting to hijack protocol control',
    process: {
      detect: 'Monitor voting patterns and token concentration for unusual activity',
      prevent: 'Implement timelock delays and voting power caps',
      fix: 'Add emergency vetoes, snapshot voting, and delegation limits'
    }
  },
  {
    id: 'storage-collision',
    name: 'Storage Collision',
    icon: '💥',
    color: '#e11d48',
    defendedBy: 'auditing',
    description: 'Proxy storage slots overwriting implementation storage',
    process: {
      detect: 'Use storage layout analysis tools and automated slot collision detection',
      prevent: 'Follow OpenZeppelin proxy patterns with unstructured storage',
      fix: 'Reorganize storage slots using ERC-1967 standard locations'
    }
  },
  {
    id: 'unchecked-return',
    name: 'Unchecked Return Values',
    icon: '❌',
    color: '#64748b',
    defendedBy: 'common-vulnerabilities',
    description: 'Failed external calls going unnoticed leading to state corruption',
    process: {
      detect: 'Use static analysis to find unchecked low-level calls',
      prevent: 'Always check return values and use SafeERC20 for token calls',
      fix: 'Add explicit success checks and revert on failed external calls'
    }
  },
  {
    id: 'randomness-manip',
    name: 'Randomness Manipulation',
    icon: '🎲',
    color: '#06b6d4',
    defendedBy: 'attack-vectors',
    description: 'Predictable on-chain randomness exploited for unfair advantage',
    process: {
      detect: 'Audit randomness sources for predictability and miner influence',
      prevent: 'Use Chainlink VRF or commit-reveal schemes for true randomness',
      fix: 'Replace blockhash/timestamp with verifiable random functions (VRF)'
    }
  },
  {
    id: 'centralization-risk',
    name: 'Centralization Risk',
    icon: '👑',
    color: '#eab308',
    defendedBy: 'attack-vectors',
    description: 'Single points of failure through admin keys or privileged roles',
    process: {
      detect: 'Audit admin functions and single points of control in governance',
      prevent: 'Use multi-sig wallets, timelock controllers, and decentralized governance',
      fix: 'Implement progressive decentralization and remove unnecessary admin powers'
    }
  },
];

// Active threat instance
interface Threat {
  id: string;
  type: typeof threatTypes[0];
  x: number;
  y: number;
  health: number;
  speed: number;
}

// Laser beam when turret fires
interface LaserBeam {
  id: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  turretId: string;
  threatId: string;
}

// Explosion effect
interface Explosion {
  id: string;
  x: number;
  y: number;
}

export default function SecurityDefenseSystem({ category }: SecurityDefenseSystemProps) {
  const { theme } = useTheme();
  const [threats, setThreats] = useState<Threat[]>([]);
  const [lasers, setLasers] = useState<LaserBeam[]>([]);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [score, setScore] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);

  // Sync isPaused state with ref
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const threatIdCounter = useRef(0);
  const laserIdCounter = useRef(0);
  const explosionIdCounter = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Spawn new threats periodically
  useEffect(() => {
    if (!mounted) return;

    const spawnThreat = () => {
      setThreats(prev => {
        // Don't spawn if we already have 2 or more threats
        if (prev.length >= 2) {
          return prev;
        }
        
        // Get list of currently active threat types
        const activeThreatsTypes = prev.map(threat => threat.type.id);
        
        // Filter out threat types that are already on screen
        const availableThreats = threatTypes.filter(
          threat => !activeThreatsTypes.includes(threat.id)
        );
        
        // If all threat types are already on screen, don't spawn
        if (availableThreats.length === 0) {
          return prev;
        }
        
        // Pick a random threat from available ones
        const threatType = availableThreats[Math.floor(Math.random() * availableThreats.length)];
        const newThreat: Threat = {
          id: `threat-${threatIdCounter.current++}`,
          type: threatType,
          x: 15 + Math.random() * 70, // 15-85% of width to prevent overflow
          y: 0,
          health: 100,
          speed: 0.2 + Math.random() * 0.3, // Variable speed
        };
        return [...prev, newThreat];
      });
    };

    // Initial spawn
    setTimeout(() => {
      if (!isPausedRef.current) spawnThreat();
    }, 1000);
    
    // Regular spawning
    const spawnInterval = setInterval(() => {
      if (!isPausedRef.current) spawnThreat();
    }, 3000 + Math.random() * 2000);
    
    return () => clearInterval(spawnInterval);
  }, [mounted]);

  // Game loop - move threats and check for targeting
  useEffect(() => {
    if (!mounted) return;

    const gameLoop = setInterval(() => {
      if (isPausedRef.current) return; // Skip game loop when paused
      
      setThreats(prev => {
        const updatedThreats = prev.map(threat => ({
          ...threat,
          y: threat.y + threat.speed,
        })).filter(threat => threat.y < 100 && threat.health > 0);

        // Auto-targeting system with specific turret-threat mapping
        updatedThreats.forEach(threat => {
          // The threat.type is already the full threat type object, not just an id
          const threatType = threat.type;
          let turret = null;
          
          if (threatType?.defendedBy) {
            // Find turret by defendedBy property
            turret = category.skills.find(skill => skill.id === threatType.defendedBy);
            
            // Debug logging
            if (process.env.NODE_ENV === 'development') {
              console.log(`Threat ${threatType.name} (${threatType.id}) should be defended by ${threatType.defendedBy}, found turret: ${turret?.name || 'none'}`);
            }
          }
          
          // Fallback - use auditing as default if turret not found
          if (!turret) {
            turret = category.skills.find(skill => skill.id === 'auditing');
            if (process.env.NODE_ENV === 'development') {
              console.log(`No turret found for ${threatType?.name}, using auditing fallback`);
            }
          }

          if (turret && threat.health > 0 && threat.y > 20 && threat.y < 70) {
            // Calculate turret position
            const turretIndex = category.skills.indexOf(turret);
            const turretX = 15 + (turretIndex * 70 / (category.skills.length - 1));
            const turretY = 85;

            // Random chance to fire (to make it feel more dynamic)
            if (Math.random() < 0.1) {
              // Create laser beam
              const laser: LaserBeam = {
                id: `laser-${laserIdCounter.current++}`,
                fromX: turretX,
                fromY: turretY,
                toX: threat.x,
                toY: threat.y,
                turretId: turret.id,
                threatId: threat.id,
              };
              setLasers(prev => [...prev, laser]);

              // Damage the threat
              threat.health -= 25 * turret.level; // Higher level = more damage

              // Remove laser after animation
              setTimeout(() => {
                setLasers(prev => prev.filter(l => l.id !== laser.id));
              }, 400);

              // If threat is destroyed
              if (threat.health <= 0) {
                // Create explosion
                const explosion: Explosion = {
                  id: `explosion-${explosionIdCounter.current++}`,
                  x: threat.x,
                  y: threat.y,
                };
                setExplosions(prev => [...prev, explosion]);
                setScore(prev => prev + 100);

                // Remove explosion after animation
                setTimeout(() => {
                  setExplosions(prev => prev.filter(e => e.id !== explosion.id));
                }, 500);
              }
            }
          }
        });

        return updatedThreats;
      });
    }, 80); // ~12 FPS

    return () => clearInterval(gameLoop);
  }, [mounted, category.skills]);

  if (!mounted) {
    return <div className="h-[800px]" />;
  }

  return (
    <section className="mb-24">
      {/* Unified Security Section Container */}
      <div className={`rounded-3xl border-4 p-6 ${
        theme === 'theme-light'
          ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-slate-400 shadow-2xl'
          : 'bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 border-slate-500 shadow-2xl shadow-blue-900/20'
      }`}>
        
        {/* Security Overview Card */}
        <div className={`mb-6 rounded-2xl border-2 p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer relative group ${
          theme === 'theme-light'
            ? 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300 hover:shadow-lg'
            : 'bg-slate-800/60 border-slate-600 hover:bg-slate-800/80 hover:border-slate-500 hover:shadow-xl hover:shadow-blue-900/20'
        }`}>
        
        {/* Security System Status Animation */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
          {/* Status Display */}
          <div className={`text-xs font-mono font-bold text-center ${
            theme === 'theme-light' ? 'text-red-600' : 'text-red-400'
          }`}>
            <div className="animate-pulse">⚡ SYSTEMS ONLINE</div>
            <div className={`flex justify-center space-x-1 mt-1 ${
              theme === 'theme-light' ? 'text-green-600' : 'text-green-400'
            }`}>
              <span>SCAN</span>
              <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>•</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>•</span>
              <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>•</span>
            </div>
          </div>
        </div>
        <div className={`text-center mb-4 ${
          theme === 'theme-light' ? 'text-slate-800' : 'text-slate-200'
        }`}>
          <h3 className="text-xl font-bold font-mono mb-2">
            🛡️ SMART CONTRACT SECURITY & AUDITING 🛡️
          </h3>
          <p className="text-sm font-mono opacity-80">
            Protecting decentralized applications from vulnerabilities and exploits
          </p>
        </div>

        <div className={`text-sm leading-relaxed mb-4 ${
          theme === 'theme-light' ? 'text-slate-700' : 'text-slate-300'
        }`}>
          <p className="mb-3">
            <strong>Security is paramount in DeFi.</strong> Smart contracts handle billions in value and are immutable once deployed. 
            A single vulnerability can lead to catastrophic losses, making thorough security analysis essential for any serious protocol.
          </p>
          <p className="mb-3">
            My approach combines <strong>automated tools</strong> (Slither, Foundry fuzzing), <strong>manual code review</strong>, 
            and <strong>formal verification</strong> techniques to identify vulnerabilities before they can be exploited. 
            I focus on common attack vectors like reentrancy, flash loan exploits, and access control flaws.
          </p>
        </div>

        <div className={`text-center text-xs font-mono p-3 rounded-lg ${
          theme === 'theme-light' 
            ? 'bg-blue-100 text-blue-700 border border-blue-200' 
            : 'bg-blue-950 text-blue-300 border border-blue-500'
        }`}>
          <div>
            Watch real-time threat detection in action below • <strong>Hover on elements</strong> for detailed information • 
            Turrets represent security skills defending against common vulnerabilities
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Main Game Area */}
        <div className={`flex-1 relative overflow-hidden rounded-2xl border-2 ${
          theme === 'theme-light'
            ? 'bg-gradient-to-b from-blue-100 to-slate-200 border-slate-300'
            : 'bg-gradient-to-b from-slate-900 via-slate-800 to-black border-slate-600'
        }`}>
        
        {/* Retro CRT effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute inset-0 ${
            theme === 'theme-light' 
              ? 'bg-gradient-to-b from-transparent via-blue-900/5 to-transparent' 
              : 'bg-gradient-to-b from-transparent via-green-500/10 to-transparent'
          }`} />
          
          {/* Scanlines */}
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              ${theme === 'theme-light' ? 'rgba(0, 0, 0, 0.03)' : 'rgba(0, 255, 0, 0.03)'} 2px,
              ${theme === 'theme-light' ? 'rgba(0, 0, 0, 0.03)' : 'rgba(0, 255, 0, 0.03)'} 4px
            )`
          }} />
        </div>

        {/* Header */}
        <div className={`relative z-10 px-6 py-4 border-b-2 ${
          theme === 'theme-light' 
            ? 'bg-slate-200 border-slate-400' 
            : 'bg-black border-green-500'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-2xl font-bold font-mono ${
                theme === 'theme-light' ? 'text-slate-800' : 'text-green-400'
              }`}>
                SECURITY DEFENSE SYSTEM
              </h3>
              <p className={`text-sm font-mono ${
                theme === 'theme-light' ? 'text-slate-600' : 'text-green-500'
              }`}>
                AUTO-TARGETING: ENABLED | THREAT LEVEL: ACTIVE
              </p>
            </div>
            <div className="text-right">
              <div className={`text-3xl font-bold font-mono ${
                theme === 'theme-light' ? 'text-blue-600' : 'text-green-400'
              }`}>
                SCORE: {String(score).padStart(6, '0')}
              </div>
              <div className={`text-sm font-mono ${
                theme === 'theme-light' ? 'text-slate-600' : 'text-green-500'
              }`}>
                THREATS NEUTRALIZED
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="h-[525px]">
          {/* Game Area */}
          <div 
            ref={gameAreaRef}
            className="relative w-full h-full overflow-hidden"
          >
          {/* Threats */}
          <AnimatePresence>
            {threats.map(threat => (
              <motion.div
                key={threat.id}
                className="absolute"
                style={{
                  left: `${threat.x}%`,
                  top: `${threat.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <div className={`relative ${
                  theme === 'theme-light' ? 'text-slate-800' : 'text-white'
                }`}>
                  {/* Threat icon */}
                  <motion.div
                    className="text-3xl mb-1"
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  >
                    {threat.type.icon}
                  </motion.div>
                  
                  {/* Threat name */}
                  <div className={`text-xs font-mono text-center px-2 py-1 rounded max-w-32 truncate ${
                    theme === 'theme-light' 
                      ? 'bg-red-100 text-red-800 border border-red-300' 
                      : 'bg-red-900/50 text-red-300 border border-red-500'
                  }`}>
                    {threat.type.name}
                  </div>
                  
                  {/* Health bar */}
                  <div className="mt-1 w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-500 to-red-600"
                      initial={{ width: '100%' }}
                      animate={{ width: `${threat.health}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Laser beams */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {lasers.map(laser => (
              <motion.line
                key={laser.id}
                x1={`${laser.fromX}%`}
                y1={`${laser.fromY}%`}
                x2={`${laser.toX}%`}
                y2={`${laser.toY}%`}
                stroke={theme === 'theme-light' ? '#3b82f6' : '#00ff00'}
                strokeWidth="3"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.4 }}
                style={{
                  filter: theme === 'theme-light' 
                    ? 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.8))' 
                    : 'drop-shadow(0 0 4px rgba(0, 255, 0, 0.8))'
                }}
              />
            ))}
          </svg>

          {/* Explosions */}
          <AnimatePresence>
            {explosions.map(explosion => (
              <motion.div
                key={explosion.id}
                className="absolute pointer-events-none"
                style={{
                  left: `${explosion.x}%`,
                  top: `${explosion.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className={`text-4xl ${
                  theme === 'theme-light' ? 'text-orange-500' : 'text-yellow-400'
                }`}>
                  💥
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Security Turrets */}
          <div className="absolute bottom-0 left-0 right-0 h-32">
            <div className="relative h-full flex items-end justify-around px-8 pb-4">
              {category.skills.map((skill, index) => {
                const turretX = 15 + (index * 70 / (category.skills.length - 1));
                const isActive = lasers.some(laser => laser.turretId === skill.id);
                
                return (
                  <motion.div
                    key={skill.id}
                    className="relative group"
                    style={{
                      position: 'absolute',
                      left: `${turretX}%`,
                      bottom: '20px',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    {/* Turret base */}
                    <div className={`relative ${
                      theme === 'theme-light' 
                        ? 'text-slate-700' 
                        : 'text-green-400'
                    }`}>
                      {/* Turret cannon */}
                      <motion.div
                        className="text-4xl mb-2"
                        animate={isActive ? {
                          scale: [1, 1.2, 1],
                          filter: [
                            'brightness(1)',
                            'brightness(1.5)',
                            'brightness(1)'
                          ]
                        } : {}}
                        transition={{ duration: 0.4 }}
                        style={{
                          filter: theme === 'theme-light'
                            ? 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.6))'
                            : 'drop-shadow(0 0 8px rgba(0, 255, 0, 0.8))'
                        }}
                      >
                        {skill.icon}
                      </motion.div>
                      
                      {/* Skill name */}
                      <div className={`text-xs font-mono text-center px-2 py-1 rounded whitespace-nowrap ${
                        theme === 'theme-light' 
                          ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                          : 'bg-green-900/50 text-green-300 border border-green-500'
                      }`}>
                        {skill.name.split(' ')[0]}
                      </div>
                      
                      {/* Power level */}
                      <div className="flex justify-center mt-1 space-x-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${
                              i < skill.level 
                                ? theme === 'theme-light' ? 'bg-blue-500' : 'bg-green-400'
                                : theme === 'theme-light' ? 'bg-gray-300' : 'bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Comprehensive Tooltip */}
                    <div 
                      className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-64 max-h-[32rem] p-4 rounded-lg text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
                        theme === 'theme-light'
                          ? 'bg-slate-900 text-white border-2 border-slate-600 shadow-xl'
                          : 'bg-black text-green-400 border-2 border-green-500 shadow-xl shadow-green-900/30'
                      }`}
                    >
                      {/* Turret Skill Explanation */}
                      <div className="text-left">
                        <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-slate-600">
                          <span className="text-2xl">{skill.icon}</span>
                          <div className={`font-bold text-sm ${
                            theme === 'theme-light' ? 'text-blue-300' : 'text-green-300'
                          }`}>
                            {skill.name}
                          </div>
                        </div>
                        
                        <div className="text-xs leading-relaxed opacity-90">
                          {skill.id === 'auditing' && (
                            <>
                              <p className="mb-2">I perform line-by-line code reviews to identify vulnerabilities before deployment. My audits combine manual analysis with automated tools.</p>
                              <p>Focus areas: access control flaws, reentrancy risks, fund management issues, and business logic errors that could lead to exploits.</p>
                            </>
                          )}
                          
                          {skill.id === 'common-vulnerabilities' && (
                            <>
                              <p className="mb-2">I recognize and prevent well-known attack patterns like reentrancy, integer overflows, and unchecked returns that have caused millions in losses.</p>
                              <p>My approach: implement checks-effects-interactions, use SafeMath, validate all external calls, and apply defensive programming patterns.</p>
                            </>
                          )}
                          
                          {skill.id === 'formal-verification' && (
                            <>
                              <p className="mb-2">I use mathematical proofs to guarantee contract behavior. By defining invariants and using symbolic execution, I ensure code works correctly in all scenarios.</p>
                              <p>This catches subtle bugs that testing and auditing miss - critical for high-value protocols where failure isn&apos;t an option.</p>
                            </>
                          )}
                          
                          {skill.id === 'mev-protection' && (
                            <>
                              <p className="mb-2">I protect users from sandwich attacks and front-running by implementing commit-reveal schemes, TWAP oracles, and private mempool strategies.</p>
                              <p>My MEV-resistant designs ensure fair trading and prevent value extraction that hurts user experience in DeFi protocols.</p>
                            </>
                          )}
                          
                          {skill.id === 'invariant-testing' && (
                            <>
                              <p className="mb-2">I define unbreakable rules and use fuzz testing to throw thousands of random inputs at contracts, finding edge cases humans miss.</p>
                              <p>Using Foundry and Echidna, I discover arithmetic errors, unexpected state transitions, and complex multi-step exploits automatically.</p>
                            </>
                          )}
                          
                          {skill.id === 'attack-vectors' && (
                            <>
                              <p className="mb-2">I analyze how vulnerabilities chain together in real exploits - flash loans combined with oracle manipulation, governance attacks, and cross-protocol interactions.</p>
                              <p>By thinking like an attacker and studying past hacks, I identify non-obvious attack paths before malicious actors find them.</p>
                            </>
                          )}
                        </div>
                      </div>

                      
                      {/* Tooltip arrow */}
                      <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent ${
                        theme === 'theme-light' 
                          ? 'border-t-slate-900' 
                          : 'border-t-black'
                      }`} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>


          </div>
        </div>
        </div>

        {/* Threat Display Card - Outside the main game area */}
        <div className="w-80">
          <div className={`rounded-2xl border-2 h-[620px] ${
            theme === 'theme-light'
              ? 'bg-gradient-to-b from-red-50 to-red-100 border-slate-300'
              : 'bg-gradient-to-b from-red-950 via-red-900 to-black border-slate-600'
          }`}>
            <div className={`p-6 border-b-2 rounded-t-2xl ${
              theme === 'theme-light' 
                ? 'bg-red-100 border-red-300' 
                : 'bg-black border-red-500'
            }`}>
              <h4 className={`text-lg font-bold font-mono ${
                theme === 'theme-light' ? 'text-red-800' : 'text-red-400'
              }`}>
                THREAT MONITOR
              </h4>
              <p className={`text-xs font-mono ${
                theme === 'theme-light' ? 'text-red-600' : 'text-red-500'
              }`}>
                ACTIVE INCOMING THREATS
              </p>
            </div>
            
            <div className="p-4 h-[calc(100%-96px)] overflow-y-auto">
              {threats.length === 0 ? (
                <div className={`text-center py-8 ${
                  theme === 'theme-light' ? 'text-red-600' : 'text-red-400'
                }`}>
                  <div className="text-4xl mb-2">🛡️</div>
                  <div className="text-sm font-mono">
                    All Clear
                  </div>
                  <div className={`text-xs font-mono opacity-60 ${
                    theme === 'theme-light' ? 'text-red-500' : 'text-red-500'
                  }`}>
                    No threats detected
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence>
                    {threats.map(threat => (
                      <motion.div
                        key={threat.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          theme === 'theme-light'
                            ? 'bg-white border-red-200 hover:border-red-400 hover:shadow-lg'
                            : 'bg-red-950/50 border-red-800 hover:border-red-600 hover:bg-red-950/70'
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl flex-shrink-0">
                            {threat.type.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`text-sm font-mono font-bold mb-2 ${
                              theme === 'theme-light' ? 'text-red-700' : 'text-red-300'
                            }`}>
                              {threat.type.name}
                            </div>
                            {/* Security Process Steps */}
                            {threat.type.process ? (
                              <div className="space-y-2 mb-3">
                                <div className={`text-xs ${
                                  theme === 'theme-light' ? 'text-blue-600' : 'text-blue-400'
                                }`}>
                                  <span className="font-mono font-bold">🔍 DETECT:</span>
                                  <div className="ml-4 mt-1">{threat.type.process.detect}</div>
                                </div>
                                <div className={`text-xs ${
                                  theme === 'theme-light' ? 'text-yellow-600' : 'text-yellow-400'
                                }`}>
                                  <span className="font-mono font-bold">🛡️ PREVENT:</span>
                                  <div className="ml-4 mt-1">{threat.type.process.prevent}</div>
                                </div>
                                <div className={`text-xs ${
                                  theme === 'theme-light' ? 'text-green-600' : 'text-green-400'
                                }`}>
                                  <span className="font-mono font-bold">🔧 FIX:</span>
                                  <div className="ml-4 mt-1">{threat.type.process.fix}</div>
                                </div>
                              </div>
                            ) : (
                              <div className={`text-xs leading-relaxed mb-3 ${
                                theme === 'theme-light' ? 'text-red-600' : 'text-red-400'
                              }`}>
                                {threat.type.description}
                              </div>
                            )}

                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Security Arsenal - Tools & Frameworks */}
      <div className={`mt-6 rounded-2xl border-2 p-6 ${
        theme === 'theme-light'
          ? 'bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border-slate-300'
          : 'bg-gradient-to-r from-amber-950 via-yellow-950 to-orange-950 border-slate-600'
      }`}>
        <div className={`text-center mb-6 ${
          theme === 'theme-light' ? 'text-amber-800' : 'text-amber-300'
        }`}>
          <h4 className="text-xl font-bold font-mono mb-2">
            🛡️ SECURITY ARSENAL 🛡️
          </h4>
          <p className="text-sm font-mono opacity-80">
            LEGENDARY WEAPONS & POWER-UPS FOR THE ULTIMATE SECURITY AUDIT
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* OpenZeppelin */}
          <div className={`relative group text-center p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
            theme === 'theme-light'
              ? 'bg-white border-blue-200 hover:border-blue-400 hover:shadow-lg'
              : 'bg-slate-800 border-blue-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-900/30'
          }`}>
            <div className="mb-3">
              <img 
                src="/logos/openzeppelin.svg" 
                alt="OpenZeppelin" 
                className="w-12 h-12 mx-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling!.style.display = 'block';
                }}
              />
              <div className="text-4xl hidden">🏰</div>
            </div>
            <div className={`text-xs font-mono ${
              theme === 'theme-light' ? 'text-blue-600' : 'text-blue-400'
            }`}>
              OpenZeppelin
            </div>
            <div className={`text-xs mt-2 opacity-80 ${
              theme === 'theme-light' ? 'text-slate-600' : 'text-slate-400'
            }`}>
              +50% Defense vs Access Control
            </div>

            {/* Tooltip */}
            <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-80 p-4 rounded-lg text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 ${
              theme === 'theme-light'
                ? 'bg-white text-blue-700 border-2 border-blue-300 shadow-xl'
                : 'bg-gray-800 text-blue-400 border-2 border-blue-400 shadow-xl shadow-blue-900/20'
            }`}>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <img 
                    src="/logos/openzeppelin.svg" 
                    alt="OpenZeppelin" 
                    className="w-20 h-20"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling!.style.display = 'block';
                    }}
                  />
                  <div className="text-6xl hidden">🏰</div>
                </div>
                <div className="font-bold text-sm mb-3">
                  OpenZeppelin
                </div>
                <div className="text-xs leading-relaxed opacity-90 text-left">
                  Industry-standard library of secure, reusable smart contract components. Provides battle-tested implementations of ERC standards, access control, and security patterns used by thousands of projects.
                </div>
              </div>
              
              {/* Tooltip arrow */}
              <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                theme === 'theme-light' 
                  ? 'border-t-slate-900' 
                  : 'border-t-black'
              }`} />
            </div>
          </div>

          {/* Slither */}
          <div className={`relative group text-center p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
            theme === 'theme-light'
              ? 'bg-white border-green-200 hover:border-green-400 hover:shadow-lg'
              : 'bg-slate-800 border-green-700 hover:border-green-500 hover:shadow-xl hover:shadow-green-900/30'
          }`}>
            <div className="mb-3">
              <img 
                src="/logos/slither.png" 
                alt="Slither" 
                className="w-12 h-12 mx-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling!.style.display = 'block';
                }}
              />
              <div className="text-4xl hidden">🐍</div>
            </div>
            <div className={`text-xs font-mono ${
              theme === 'theme-light' ? 'text-green-600' : 'text-green-400'
            }`}>
              Slither
            </div>
            <div className={`text-xs mt-2 opacity-80 ${
              theme === 'theme-light' ? 'text-slate-600' : 'text-slate-400'
            }`}>
              Auto-detects 90+ vulnerabilities
            </div>

            {/* Tooltip */}
            <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-80 p-4 rounded-lg text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 ${
              theme === 'theme-light'
                ? 'bg-white text-green-700 border-2 border-green-300 shadow-xl'
                : 'bg-gray-800 text-green-400 border-2 border-green-400 shadow-xl shadow-green-900/20'
            }`}>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <img 
                    src="/logos/slither.png" 
                    alt="Slither" 
                    className="w-20 h-20"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling!.style.display = 'block';
                    }}
                  />
                  <div className="text-6xl hidden">🐍</div>
                </div>
                <div className="font-bold text-sm mb-3">
                  Slither
                </div>
                <div className="text-xs leading-relaxed opacity-90 text-left">
                  Static analysis framework for Solidity smart contracts. Detects vulnerabilities, optimization opportunities, and code quality issues. Essential tool for automated security scanning with 90+ built-in detectors.
                </div>
              </div>
              
              {/* Tooltip arrow */}
              <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                theme === 'theme-light' 
                  ? 'border-t-slate-900' 
                  : 'border-t-black'
              }`} />
            </div>
          </div>

          {/* Foundry */}
          <div className={`relative group text-center p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
            theme === 'theme-light'
              ? 'bg-white border-red-200 hover:border-red-400 hover:shadow-lg'
              : 'bg-slate-800 border-red-700 hover:border-red-500 hover:shadow-xl hover:shadow-red-900/30'
          }`}>
            <div className="mb-3">
              <img 
                src="/logos/foundry.svg" 
                alt="Foundry" 
                className="w-12 h-12 mx-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling!.style.display = 'block';
                }}
              />
              <div className="text-4xl hidden">⚒️</div>
            </div>
            <div className={`text-xs font-mono ${
              theme === 'theme-light' ? 'text-red-600' : 'text-red-400'
            }`}>
              Foundry
            </div>
            <div className={`text-xs mt-2 opacity-80 ${
              theme === 'theme-light' ? 'text-slate-600' : 'text-slate-400'
            }`}>
              Unlimited fuzz testing power
            </div>

            {/* Tooltip */}
            <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-80 p-4 rounded-lg text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 ${
              theme === 'theme-light'
                ? 'bg-white text-red-700 border-2 border-red-300 shadow-xl'
                : 'bg-gray-800 text-red-400 border-2 border-red-400 shadow-xl shadow-red-900/20'
            }`}>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <img 
                    src="/logos/foundry.svg" 
                    alt="Foundry" 
                    className="w-20 h-20"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling!.style.display = 'block';
                    }}
                  />
                  <div className="text-6xl hidden">⚒️</div>
                </div>
                <div className="font-bold text-sm mb-3">
                  Foundry
                </div>
                <div className="text-xs leading-relaxed opacity-90 text-left">
                  Fast, portable and modular toolkit for Ethereum development. Features advanced testing with fuzzing, gas optimization, and deployment scripting. The gold standard for modern smart contract development and testing.
                </div>
              </div>
              
              {/* Tooltip arrow */}
              <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                theme === 'theme-light' 
                  ? 'border-t-slate-900' 
                  : 'border-t-black'
              }`} />
            </div>
          </div>

          {/* Echidna */}
          <div className={`relative group text-center p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
            theme === 'theme-light'
              ? 'bg-white border-purple-200 hover:border-purple-400 hover:shadow-lg'
              : 'bg-slate-800 border-purple-700 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-900/30'
          }`}>
            <div className="mb-3">
              <img 
                src="/logos/echidna.png" 
                alt="Echidna" 
                className="w-12 h-12 mx-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling!.style.display = 'block';
                }}
              />
              <div className="text-4xl hidden">🦔</div>
            </div>
            <div className={`text-xs font-mono ${
              theme === 'theme-light' ? 'text-purple-600' : 'text-purple-400'
            }`}>
              Echidna
            </div>
            <div className={`text-xs mt-2 opacity-80 ${
              theme === 'theme-light' ? 'text-slate-600' : 'text-slate-400'
            }`}>
              Property-based fuzz testing
            </div>

            {/* Tooltip */}
            <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-80 p-4 rounded-lg text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 ${
              theme === 'theme-light'
                ? 'bg-white text-purple-700 border-2 border-purple-300 shadow-xl'
                : 'bg-gray-800 text-purple-400 border-2 border-purple-400 shadow-xl shadow-purple-900/20'
            }`}>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <img 
                    src="/logos/echidna.png" 
                    alt="Echidna" 
                    className="w-20 h-20"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling!.style.display = 'block';
                    }}
                  />
                  <div className="text-6xl hidden">🦔</div>
                </div>
                <div className="font-bold text-sm mb-3">
                  Echidna
                </div>
                <div className="text-xs leading-relaxed opacity-90 text-left">
                  Property-based fuzzer for Ethereum smart contracts by Trail of Bits. Generates random inputs to test invariants and find edge cases. Specialized in discovering subtle bugs through automated property verification.
                </div>
              </div>
              
              {/* Tooltip arrow */}
              <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                theme === 'theme-light' 
                  ? 'border-t-slate-900' 
                  : 'border-t-black'
              }`} />
            </div>
          </div>
        </div>

        {/* Arsenal Stats */}
        <div className={`mt-6 pt-4 border-t-2 text-center ${
          theme === 'theme-light' ? 'border-amber-200' : 'border-amber-700'
        }`}>
          <div className={`text-sm font-mono font-bold ${
            theme === 'theme-light' ? 'text-amber-700' : 'text-amber-400'
          }`}>
            🏆 MASTER AUDITOR STATUS: UNLOCKED 🏆
          </div>
          <div className={`text-xs font-mono mt-1 opacity-80 ${
            theme === 'theme-light' ? 'text-amber-600' : 'text-amber-500'
          }`}>
            All legendary security tools mastered • 100% vulnerability coverage
          </div>
        </div>
      </div>
      
      </div> {/* End Unified Security Section Container */}
    </section>
  );
}