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
    description: 'Malicious contract calls back into vulnerable function before state updates complete'
  },
  { 
    id: 'overflow', 
    name: 'Integer Overflow', 
    icon: '💯', 
    color: '#f59e0b', 
    defendedBy: 'invariant-testing',
    description: 'Arithmetic operations exceed maximum values causing unexpected behavior'
  },
  { 
    id: 'flash-loan', 
    name: 'Flash Loan Attack', 
    icon: '⚡', 
    color: '#8b5cf6', 
    defendedBy: 'mev-protection',
    description: 'Exploits using large uncollateralized loans to manipulate DeFi protocols'
  },
  { 
    id: 'access-control', 
    name: 'Access Control Bug', 
    icon: '🔓', 
    color: '#3b82f6', 
    defendedBy: 'attack-vectors',
    description: 'Unauthorized users gain access to restricted functions or data'
  },
  { 
    id: 'price-manip', 
    name: 'Price Oracle Attack', 
    icon: '📈', 
    color: '#10b981', 
    defendedBy: 'formal-verification',
    description: 'Manipulation of price feeds to exploit DeFi lending and trading protocols'
  },
  { 
    id: 'front-run', 
    name: 'Front-running', 
    icon: '🏃', 
    color: '#ec4899', 
    defendedBy: 'mev-protection',
    description: 'Malicious actors front-run transactions for profit extraction'
  },
  { 
    id: 'dos', 
    name: 'DoS Attack', 
    icon: '🚫', 
    color: '#6366f1', 
    defendedBy: 'common-vulnerabilities',
    description: 'Denial of service attacks that prevent normal contract operations'
  },
  { 
    id: 'logic-bug', 
    name: 'Logic Vulnerability', 
    icon: '🐛', 
    color: '#14b8a6', 
    defendedBy: 'formal-verification',
    description: 'Flawed business logic that leads to unintended contract behavior'
  },
  {
    id: 'sandwich',
    name: 'Sandwich Attack',
    icon: '🥪',
    color: '#f97316',
    defendedBy: 'mev-protection',
    description: 'MEV attack sandwiching user transactions to extract value'
  },
  {
    id: 'governance',
    name: 'Governance Attack',
    icon: '🗳️',
    color: '#8b5cf6',
    defendedBy: 'attack-vectors',
    description: 'Malicious governance proposals or vote manipulation attacks'
  }
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
  const [hoveredThreat, setHoveredThreat] = useState<string | null>(null);
  const [hoveredTurret, setHoveredTurret] = useState<string | null>(null);
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
      const threatType = threatTypes[Math.floor(Math.random() * threatTypes.length)];
      const newThreat: Threat = {
        id: `threat-${threatIdCounter.current++}`,
        type: threatType,
        x: 10 + Math.random() * 80, // 10-90% of width
        y: 0,
        health: 100,
        speed: 0.5 + Math.random() * 0.5, // Variable speed
      };
      setThreats(prev => [...prev, newThreat]);
    };

    // Initial spawn
    setTimeout(spawnThreat, 1000);
    
    // Regular spawning
    const spawnInterval = setInterval(spawnThreat, 3000 + Math.random() * 2000);
    
    return () => clearInterval(spawnInterval);
  }, [mounted]);

  // Game loop - move threats and check for targeting
  useEffect(() => {
    if (!mounted) return;

    const gameLoop = setInterval(() => {
      setThreats(prev => {
        const updatedThreats = prev.map(threat => ({
          ...threat,
          y: threat.y + threat.speed,
        })).filter(threat => threat.y < 100 && threat.health > 0);

        // Auto-targeting system
        updatedThreats.forEach(threat => {
          // Find the appropriate turret for this threat
          const turret = category.skills.find(skill => 
            skill.id === threat.type.defendedBy || 
            (threat.type.defendedBy === 'auditing' && skill.id === 'auditing') ||
            (threat.type.defendedBy === 'invariant-testing' && skill.id === 'invariant-testing') ||
            (threat.type.defendedBy === 'mev-protection' && skill.id === 'mev-protection') ||
            (threat.type.defendedBy === 'attack-vectors' && skill.id === 'attack-vectors') ||
            (threat.type.defendedBy === 'formal-verification' && skill.id === 'formal-verification') ||
            (threat.type.defendedBy === 'common-vulnerabilities' && skill.id === 'common-vulnerabilities')
          );

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
              }, 200);

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
    }, 50); // 20 FPS

    return () => clearInterval(gameLoop);
  }, [mounted, category.skills]);

  if (!mounted) {
    return <div className="h-[600px]" />;
  }

  return (
    <section className="mb-24">
      <div className={`relative overflow-hidden rounded-2xl border-4 ${
        theme === 'theme-light'
          ? 'bg-gradient-to-b from-blue-100 to-slate-200 border-slate-400'
          : 'bg-gradient-to-b from-slate-900 via-slate-800 to-black border-green-500'
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

        {/* Game Area */}
        <div 
          ref={gameAreaRef}
          className="relative h-[500px] overflow-hidden"
        >
          {/* Threats */}
          <AnimatePresence>
            {threats.map(threat => {
              const isHovered = hoveredThreat === threat.id;
              return (
                <motion.div
                  key={threat.id}
                  className="absolute cursor-pointer z-10"
                  style={{
                    left: `${threat.x}%`,
                    top: `${threat.y}%`,
                    transform: 'translate(-50%, -50%)',
                    transformOrigin: 'center center',
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: isHovered ? 1.2 : 1,
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  onMouseEnter={() => setHoveredThreat(threat.id)}
                  onMouseLeave={() => setHoveredThreat(null)}
                  whileHover={{ 
                    scale: 1.2,
                    filter: 'brightness(1.3)',
                  }}
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
                        duration: 2,
                        repeat: Infinity,
                      }}
                      style={{
                        filter: isHovered 
                          ? theme === 'theme-light'
                            ? 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))'
                            : 'drop-shadow(0 0 12px rgba(239, 68, 68, 1))'
                          : 'none'
                      }}
                    >
                      {threat.type.icon}
                    </motion.div>
                    
                    {/* Threat name */}
                    <div className={`text-xs font-mono text-center px-2 py-1 rounded whitespace-nowrap transition-all ${
                      isHovered
                        ? theme === 'theme-light' 
                          ? 'bg-red-200 text-red-900 border-2 border-red-400 shadow-lg' 
                          : 'bg-red-800/80 text-red-200 border-2 border-red-400 shadow-lg shadow-red-500/50'
                        : theme === 'theme-light' 
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

                    {/* Hover tooltip */}
                    {isHovered && (
                      <motion.div
                        className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 rounded-lg shadow-xl border max-w-xs whitespace-normal text-center z-50 ${
                          theme === 'theme-light'
                            ? 'bg-white border-red-300 text-slate-700'
                            : 'bg-slate-800 border-red-500 text-red-200'
                        }`}
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="font-bold text-sm mb-1">{threat.type.name}</div>
                        <div className="text-xs leading-relaxed">{threat.type.description}</div>
                        
                        {/* Tooltip arrow */}
                        <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 ${
                          theme === 'theme-light'
                            ? 'border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-white'
                            : 'border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-slate-800'
                        }`} />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
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
                transition={{ duration: 0.2 }}
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
            <div className="relative h-full px-8 pb-4">
              {category.skills.map((skill, index) => {
                const turretX = 15 + (index * 70 / (category.skills.length - 1));
                const isActive = lasers.some(laser => laser.turretId === skill.id);
                const isHovered = hoveredTurret === skill.id;
                
                return (
                  <motion.div
                    key={skill.id}
                    className="absolute cursor-pointer z-20"
                    style={{
                      left: `${turretX}%`,
                      bottom: '20px',
                      x: '-50%',
                      transformOrigin: 'center center',
                    }}
                    initial={{ scale: 1, x: '-50%' }}
                    onMouseEnter={() => setHoveredTurret(skill.id)}
                    onMouseLeave={() => setHoveredTurret(null)}
                    whileHover={mounted ? { scale: 1.1, x: '-50%' } : {}}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Turret base */}
                    <div className={`relative transition-all duration-300 flex flex-col items-center ${
                      theme === 'theme-light' 
                        ? 'text-slate-700' 
                        : 'text-green-400'
                    }`}>
                      {/* Turret cannon */}
                      <motion.div
                        className="text-4xl mb-2"
                        animate={mounted && isActive ? {
                          scale: [1, 1.2, 1],
                          filter: [
                            'brightness(1)',
                            'brightness(1.5)',
                            'brightness(1)'
                          ]
                        } : {}}
                        transition={{ duration: 0.2 }}
                        style={{
                          transformOrigin: 'center center',
                          filter: isHovered
                            ? theme === 'theme-light'
                              ? 'drop-shadow(0 0 12px rgba(59, 130, 246, 1))'
                              : 'drop-shadow(0 0 16px rgba(0, 255, 0, 1))'
                            : theme === 'theme-light'
                              ? 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.6))'
                              : 'drop-shadow(0 0 8px rgba(0, 255, 0, 0.8))'
                        }}
                      >
                        {skill.icon}
                      </motion.div>
                      
                      {/* Skill name */}
                      <div className={`text-xs font-mono text-center px-2 py-1 rounded whitespace-nowrap transition-all ${
                        isHovered
                          ? theme === 'theme-light' 
                            ? 'bg-blue-200 text-blue-900 border-2 border-blue-400 shadow-lg' 
                            : 'bg-green-800/80 text-green-200 border-2 border-green-400 shadow-lg shadow-green-500/50'
                          : theme === 'theme-light' 
                            ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' 
                            : 'bg-green-900/50 text-green-300 border-2 border-green-500'
                      }`}>
                        {skill.name.split(' ')[0]}
                      </div>
                      
                      {/* Power level */}
                      <div className="flex justify-center mt-1 space-x-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              i < skill.level 
                                ? isHovered
                                  ? theme === 'theme-light' ? 'bg-blue-600 shadow-sm' : 'bg-green-300 shadow-sm'
                                  : theme === 'theme-light' ? 'bg-blue-500' : 'bg-green-400'
                                : theme === 'theme-light' ? 'bg-gray-300' : 'bg-gray-600'
                            }`}
                            animate={mounted && isHovered && i < skill.level ? {
                              scale: [1, 1.2, 1],
                            } : {}}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                          />
                        ))}
                      </div>

                      {/* Turret hover tooltip */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 p-4 rounded-lg shadow-xl border max-w-sm whitespace-normal z-50 ${
                              theme === 'theme-light'
                                ? 'bg-white border-blue-300 text-slate-700'
                                : 'bg-slate-800 border-green-500 text-green-200'
                            }`}
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="text-center">
                              <div className="font-bold text-lg mb-2">{skill.name}</div>
                              <div className="text-sm leading-relaxed mb-3">{skill.description}</div>
                              
                              {/* Expertise Level */}
                              <div className="flex items-center justify-center space-x-2 mb-3">
                                <span className="text-xs font-medium">Expertise:</span>
                                <div className="flex space-x-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                      key={i}
                                      className={`w-2 h-2 rounded-full ${
                                        i < skill.level 
                                          ? theme === 'theme-light' ? 'bg-blue-500' : 'bg-green-400'
                                          : theme === 'theme-light' ? 'bg-gray-300' : 'bg-gray-600'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs font-bold">
                                  Level {skill.level}
                                </span>
                              </div>

                              {/* Defending Against */}
                              <div className="text-xs">
                                <div className="font-medium mb-1">Defends Against:</div>
                                <div className="flex flex-wrap gap-1 justify-center">
                                  {threatTypes
                                    .filter(threat => threat.defendedBy === skill.id)
                                    .map(threat => (
                                      <span
                                        key={threat.id}
                                        className={`px-2 py-1 rounded text-xs ${
                                          theme === 'theme-light'
                                            ? 'bg-red-100 text-red-700'
                                            : 'bg-red-900/50 text-red-300'
                                        }`}
                                      >
                                        {threat.icon} {threat.name}
                                      </span>
                                    ))
                                  }
                                </div>
                              </div>
                            </div>
                            
                            {/* Tooltip arrow */}
                            <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 ${
                              theme === 'theme-light'
                                ? 'border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-white'
                                : 'border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-slate-800'
                            }`} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Threat Legend */}
          <div className={`absolute top-4 left-4 p-3 rounded-lg text-xs font-mono ${
            theme === 'theme-light' 
              ? 'bg-white/80 text-slate-700 border border-slate-300' 
              : 'bg-black/80 text-green-400 border border-green-500'
          }`}>
            <div className="font-bold mb-2">THREAT TYPES:</div>
            <div className="space-y-1">
              {threatTypes.slice(0, 4).map(threat => (
                <div key={threat.id} className="flex items-center space-x-2">
                  <span>{threat.icon}</span>
                  <span>{threat.name}</span>
                </div>
              ))}
              <div className="opacity-60">...and more</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}