"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/context/ThemeContext';
import { SkillCategory } from '@/lib/types';

interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'error' | 'info';
  content: string;
  timestamp?: string;
}

interface SkillTerminalProps {
  categories: SkillCategory[];
}

export default function SkillTerminal({ categories }: SkillTerminalProps) {
  const { theme } = useTheme();
  const [currentPath, setCurrentPath] = useState('/skills');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Focus input on mount and when clicking terminal
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Scroll to bottom when new content is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Welcome message
  useEffect(() => {
    const welcomeLines: TerminalLine[] = [
      {
        id: '1',
        type: 'info',
        content: 'Torof\'s Skills Terminal v2.1.0',
        timestamp: new Date().toLocaleTimeString()
      },
      {
        id: '2',
        type: 'info',
        content: 'Welcome to the interactive skills explorer!'
      },
      {
        id: '3',
        type: 'output',
        content: 'Type "help" to see available commands or "ls" to list skill categories.'
      },
      {
        id: '4',
        type: 'output',
        content: ''
      }
    ];
    setHistory(welcomeLines);
  }, []);

  const addToHistory = (lines: TerminalLine[]) => {
    setHistory(prev => [...prev, ...lines]);
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    // Add command to history
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    // Add command line to display
    addToHistory([{
      id: Date.now().toString(),
      type: 'command',
      content: `${currentPath}$ ${trimmedCmd}`,
      timestamp: new Date().toLocaleTimeString()
    }]);

    const [command, ...args] = trimmedCmd.split(' ');
    
    switch (command.toLowerCase()) {
      case 'help':
        handleHelp();
        break;
      case 'ls':
        handleLs(args[0]);
        break;
      case 'cd':
        handleCd(args[0]);
        break;
      case 'cat':
        handleCat(args[0]);
        break;
      case 'find':
        handleFind(args.join(' '));
        break;
      case 'grep':
        handleGrep(args[0], args.slice(1).join(' '));
        break;
      case 'whoami':
        handleWhoami();
        break;
      case 'pwd':
        handlePwd();
        break;
      case 'tree':
        handleTree();
        break;
      case 'clear':
        setHistory([]);
        break;
      case 'history':
        handleHistory();
        break;
      default:
        addToHistory([{
          id: Date.now().toString(),
          type: 'error',
          content: `Command not found: ${command}. Type 'help' for available commands.`
        }]);
    }

    setInput('');
  };

  const handleHelp = () => {
    const helpText = [
      '',
      '📚 Available Commands:',
      '',
      '  ls [category]     - List skills or skill categories',
      '  cd <category>     - Navigate to skill category',
      '  cat <skill>       - View detailed skill information',
      '  find <query>      - Search for skills containing query',
      '  grep <level> .    - Filter skills by level (1-5)',
      '  tree              - Show skill tree structure',
      '  whoami            - Display user information',
      '  pwd               - Show current directory',
      '  history           - Show command history',
      '  clear             - Clear terminal',
      '  help              - Show this help message',
      '',
      '💡 Tips:',
      '  - Use Tab for autocompletion (coming soon)',
      '  - Use ↑/↓ arrows to navigate command history',
      '  - Skills are organized by category directories',
      ''
    ];

    addToHistory(helpText.map((line, index) => ({
      id: `help-${index}`,
      type: 'output',
      content: line
    })));
  };

  const handleLs = (category?: string) => {
    if (!category && currentPath === '/skills') {
      // List categories
      const categoryList = [
        '',
        '📁 Skill Categories:',
        '',
        ...categories.map(cat => `  ${cat.icon} ${cat.id}/  (${cat.skills.length} skills)`),
        '',
        `Total: ${categories.length} categories, ${categories.reduce((acc, cat) => acc + cat.skills.length, 0)} skills`,
        ''
      ];

      addToHistory(categoryList.map((line, index) => ({
        id: `ls-${index}`,
        type: 'output',
        content: line
      })));
    } else {
      const targetCategory = category || currentPath.replace('/skills/', '').replace('/skills', '');
      const cat = categories.find(c => c.id === targetCategory);
      
      if (cat) {
        const skillList = [
          '',
          `📂 ${cat.name} Skills:`,
          '',
          ...cat.skills.map(skill => 
            `  ${skill.icon} ${skill.id.padEnd(25)} Level ${skill.level} - ${skill.name}`
          ),
          '',
          `Total: ${cat.skills.length} skills in ${cat.name}`,
          ''
        ];

        addToHistory(skillList.map((line, index) => ({
          id: `ls-cat-${index}`,
          type: 'output',
          content: line
        })));
      } else {
        addToHistory([{
          id: Date.now().toString(),
          type: 'error',
          content: `ls: cannot access '${targetCategory}': No such file or directory`
        }]);
      }
    }
  };

  const handleCd = (path?: string) => {
    if (!path || path === '~' || path === '/skills') {
      setCurrentPath('/skills');
      addToHistory([{
        id: Date.now().toString(),
        type: 'output',
        content: 'Changed directory to /skills'
      }]);
      return;
    }

    if (path === '..') {
      if (currentPath !== '/skills') {
        setCurrentPath('/skills');
        addToHistory([{
          id: Date.now().toString(),
          type: 'output',
          content: 'Changed directory to /skills'
        }]);
      }
      return;
    }

    const category = categories.find(c => c.id === path);
    if (category) {
      setCurrentPath(`/skills/${path}`);
      addToHistory([{
        id: Date.now().toString(),
        type: 'output',
        content: `Changed directory to /skills/${path}`
      }]);
    } else {
      addToHistory([{
        id: Date.now().toString(),
        type: 'error',
        content: `cd: ${path}: No such file or directory`
      }]);
    }
  };

  const handleCat = (skillId?: string) => {
    if (!skillId) {
      addToHistory([{
        id: Date.now().toString(),
        type: 'error',
        content: 'cat: missing operand. Usage: cat <skill_id>'
      }]);
      return;
    }

    const skill = categories
      .flatMap(cat => cat.skills)
      .find(s => s.id === skillId);

    if (skill) {
      const skillInfo = [
        '',
        `📄 ${skill.name}`,
        '=' .repeat(50),
        '',
        `🏷️  Category: ${skill.category}`,
        `⭐ Level: ${skill.level}/5`,
        `📝 Description: ${skill.description}`,
        ''
      ];

      if (skill.examples && skill.examples.length > 0) {
        skillInfo.push('🔧 Key Areas:');
        skill.examples.forEach(example => {
          skillInfo.push(`   • ${example}`);
        });
        skillInfo.push('');
      }

      if (skill.projects && skill.projects.length > 0) {
        skillInfo.push('💼 Recent Experience:');
        skill.projects.forEach(project => {
          skillInfo.push(`   → ${project}`);
        });
        skillInfo.push('');
      }

      addToHistory(skillInfo.map((line, index) => ({
        id: `cat-${skillId}-${index}`,
        type: 'output',
        content: line
      })));
    } else {
      addToHistory([{
        id: Date.now().toString(),
        type: 'error',
        content: `cat: ${skillId}: No such file or directory`
      }]);
    }
  };

  const handleFind = (query: string) => {
    if (!query) {
      addToHistory([{
        id: Date.now().toString(),
        type: 'error',
        content: 'find: missing search query. Usage: find <query>'
      }]);
      return;
    }

    const results = categories
      .flatMap(cat => cat.skills)
      .filter(skill => 
        skill.name.toLowerCase().includes(query.toLowerCase()) ||
        skill.description.toLowerCase().includes(query.toLowerCase()) ||
        skill.examples?.some(ex => ex.toLowerCase().includes(query.toLowerCase()))
      );

    if (results.length > 0) {
      const searchResults = [
        '',
        `🔍 Found ${results.length} skill(s) matching "${query}":`,
        '',
        ...results.map(skill => 
          `  ${skill.icon} ${skill.id} - ${skill.name} (Level ${skill.level})`
        ),
        ''
      ];

      addToHistory(searchResults.map((line, index) => ({
        id: `find-${index}`,
        type: 'output',
        content: line
      })));
    } else {
      addToHistory([{
        id: Date.now().toString(),
        type: 'output',
        content: `🔍 No skills found matching "${query}"`
      }]);
    }
  };

  const handleGrep = (level: string, target: string) => {
    if (!level || !target) {
      addToHistory([{
        id: Date.now().toString(),
        type: 'error',
        content: 'grep: Usage: grep <level> . (e.g., grep 5 .)'
      }]);
      return;
    }

    const levelNum = parseInt(level);
    if (isNaN(levelNum) || levelNum < 1 || levelNum > 5) {
      addToHistory([{
        id: Date.now().toString(),
        type: 'error',
        content: 'grep: level must be a number between 1-5'
      }]);
      return;
    }

    const results = categories
      .flatMap(cat => cat.skills)
      .filter(skill => skill.level === levelNum);

    if (results.length > 0) {
      const grepResults = [
        '',
        `🎯 Skills at Level ${levelNum}:`,
        '',
        ...results.map(skill => 
          `  ${skill.icon} ${skill.id} - ${skill.name}`
        ),
        '',
        `Total: ${results.length} skills at level ${levelNum}`,
        ''
      ];

      addToHistory(grepResults.map((line, index) => ({
        id: `grep-${index}`,
        type: 'output',
        content: line
      })));
    } else {
      addToHistory([{
        id: Date.now().toString(),
        type: 'output',
        content: `🎯 No skills found at level ${levelNum}`
      }]);
    }
  };

  const handleWhoami = () => {
    const userInfo = [
      '',
      '👨‍💻 User Information:',
      '',
      '  Name: Torof',
      '  Role: Smart Contract Developer & DApp Engineer',
      '  Specialization: Blockchain Development, DeFi, Security',
      '  Experience: 6+ years in blockchain technology',
      '  Location: /home/torof/blockchain-expertise',
      ''
    ];

    addToHistory(userInfo.map((line, index) => ({
      id: `whoami-${index}`,
      type: 'output',
      content: line
    })));
  };

  const handlePwd = () => {
    addToHistory([{
      id: Date.now().toString(),
      type: 'output',
      content: currentPath
    }]);
  };

  const handleTree = () => {
    const treeLines = [
      '',
      '🌳 Skills Directory Structure:',
      '',
      '/skills/',
      ...categories.map((cat, catIndex) => {
        const isLast = catIndex === categories.length - 1;
        const lines = [`${isLast ? '└──' : '├──'} ${cat.icon} ${cat.id}/`];
        
        cat.skills.forEach((skill, skillIndex) => {
          const isLastSkill = skillIndex === cat.skills.length - 1;
          const prefix = isLast ? '    ' : '│   ';
          lines.push(`${prefix}${isLastSkill ? '└──' : '├──'} ${skill.icon} ${skill.id}`);
        });
        
        return lines;
      }).flat(),
      ''
    ];

    addToHistory(treeLines.map((line, index) => ({
      id: `tree-${index}`,
      type: 'output',
      content: line
    })));
  };

  const handleHistory = () => {
    const historyLines = [
      '',
      '📜 Command History:',
      '',
      ...commandHistory.map((cmd, index) => `  ${index + 1}  ${cmd}`),
      ''
    ];

    addToHistory(historyLines.map((line, index) => ({
      id: `history-${index}`,
      type: 'output',
      content: line
    })));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <div 
      className={`w-full rounded-2xl border backdrop-blur-md font-mono text-sm overflow-hidden cursor-text ${
        theme === 'theme-light'
          ? 'bg-gray-900/95 border-gray-700 text-green-400'
          : 'bg-gray-900/95 border-gray-700 text-green-400'
      }`}
      onClick={focusInput}
    >
      {/* Terminal Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b ${
        theme === 'theme-light' ? 'border-gray-700 bg-gray-800' : 'border-gray-700 bg-gray-800'
      }`}>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-300 ml-4">torof@skills-terminal</span>
        </div>
        <div className="text-gray-400 text-xs">
          Skills Explorer v2.1.0
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="p-4 h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
      >
        <AnimatePresence>
          {history.map((line, index) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={`mb-1 ${
                line.type === 'command' ? 'text-cyan-400' :
                line.type === 'error' ? 'text-red-400' :
                line.type === 'info' ? 'text-blue-400' :
                'text-green-400'
              }`}
            >
              {line.content}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Current Input Line */}
        <div className="flex items-center text-cyan-400">
          <span className="mr-2">{currentPath}$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-green-400 caret-green-400"
            spellCheck={false}
            autoComplete="off"
          />
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-2 h-4 bg-green-400 ml-1"
          />
        </div>
      </div>
    </div>
  );
}