import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronDown, FiZap } from 'react-icons/fi';
import { CATEGORIES, TOOLS_BY_CATEGORY } from '../../data/tools';
import { motion, AnimatePresence } from 'framer-motion';
import { useTools } from '../../context/ToolContext';

export default function ToolNavbar() {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();
  const { toolUsage } = useTools();

  return (
    <div className="bg-white border-b border-gray-100 dark:bg-[#0a0a0a] dark:border-[#ffffff10] shadow-sm px-4 md:px-8 transition-colors">
      <div className="max-w-7xl mx-auto py-1 md:py-1.5 min-h-[40px]">
        <div className="flex flex-wrap items-center justify-center w-full gap-x-3 md:gap-x-6">
          {[...CATEGORIES].sort((a,b) => a.label.localeCompare(b.label)).map(cat => (
            <div 
              key={cat.id}
              className="h-full px-3 md:px-5 flex whitespace-nowrap items-center cursor-pointer relative group"
              onMouseEnter={() => setHoveredCategory(cat.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
            >
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-1.5 py-2.5 ${(hoveredCategory === cat.id || activeCategory === cat.id) ? 'text-black dark:text-white' : 'text-gray-500 group-hover:text-black dark:text-white dark:group-hover:text-white'}`}>
                {cat.label}
                <FiChevronDown size={12} className={`transition-transform duration-300 ${(hoveredCategory === cat.id || activeCategory === cat.id) ? 'rotate-180' : ''}`} />
              </span>
              <div className={`absolute bottom-0 left-4 right-4 h-0.5 bg-[#0a0a0a] dark:bg-white rounded-full transition-all duration-300 ${(hoveredCategory === cat.id || activeCategory === cat.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}/>

              <AnimatePresence>
                {(hoveredCategory === cat.id || activeCategory === cat.id) && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 pointer-events-auto"
                  >
                    <div className="min-w-[220px] bg-white border border-gray-100 shadow-2xl rounded-2xl py-2 p-1 dark:bg-[#0a0a0a] dark:border-[#ffffff10]">
                      <div className="px-3 py-1.5 text-[8px] font-black text-gray-400 uppercase tracking-[0.3em] border-b border-gray-50 dark:border-[#ffffff10] mb-1">Registry: {cat.label}</div>
                      <div className="grid grid-cols-1 gap-0.5">
                        {(TOOLS_BY_CATEGORY[cat.id] || [])
                          .sort((a, b) => (toolUsage[b.id] || 0) - (toolUsage[a.id] || 0))
                          .map(tool => {
                          const Icon = tool.icon || FiZap;
                          return (
                            <button 
                              key={tool.id}
                              onClick={() => { setHoveredCategory(null); setActiveCategory(null); navigate(tool.path); }}
                              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg transition-all text-left group dark:hover:bg-white/10"
                            >
                              <Icon size={14} className="text-gray-400 group-hover:text-black dark:text-gray-500 dark:group-hover:text-white transition-colors" />
                              <div className="flex items-center gap-2 flex-1">
                                <p className="text-[11px] font-bold text-black dark:text-white group-hover:translate-x-1 transition-transform">{tool.name}</p>
                                {toolUsage[tool.id] > 0 && <span className="w-1 h-1 rounded-full bg-black dark:bg-white opacity-40 animate-pulse" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
