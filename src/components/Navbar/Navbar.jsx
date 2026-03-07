import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiChevronDown, FiSearch, FiStar, FiClock, FiActivity, FiInfo, FiZap, FiMenu, FiX, FiHome } from 'react-icons/fi';
import { CATEGORIES, TOOLS_BY_CATEGORY, searchTools } from '../../data/tools';
import { motion, AnimatePresence } from 'framer-motion';
import DarkModeToggle from './DarkModeToggle';
import { useTools } from '../../context/ToolContext';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const results = searchQuery.length > 1 ? searchTools(searchQuery).slice(0, 8) : [];

  const navLinks = [
    { name: 'Home', path: '/', icon: FiZap },
    { name: 'Favorites', path: '/favorites', icon: FiStar },
    { name: 'Recent Tools', path: '/recent-tools', icon: FiClock },
    { name: 'History', path: '/tool-history', icon: FiActivity },
    { name: 'Analytics', path: '/analytics', icon: FiActivity },
    { name: 'About', path: '/about', icon: FiInfo },
  ];

  return (
    <nav 
      className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm dark:bg-[#1a1a1a] dark:border-[#ffffff10] transition-colors"
    >
      {/* --- TIER 1: BRANDING & SEARCH --- */}
      <div className="bg-[#1a1a1a] text-white dark:bg-[#1a1a1a] dark:border-b dark:border-[#ffffff10] py-1 md:py-1.5">
        <div className="max-w-7xl mx-auto px-8 md:px-12 h-14 md:h-16 flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-[#1a1a1a] text-xl bg-white shadow-lg transition-transform group-hover:rotate-12">
              Y
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-2xl tracking-tighter">YUKT Tools</span>
              <span className="text-[8px] font-black uppercase tracking-[0.3em] opacity-60">Ultimate Toolkit</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8 relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/40">
              <FiSearch size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Search for tools"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowResults(true); }}
              onFocus={() => setShowResults(true)}
              className="w-full bg-white/10 border border-white/20 rounded-2xl py-2.5 pl-12 pr-6 text-sm font-semibold placeholder-white/30 focus:bg-white focus:text-[#1a1a1a] focus:placeholder-gray-400 focus:outline-none transition-all shadow-inner"
            />

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {showResults && results.length > 0 && (
                <div key="search-wrapper" className="absolute top-full left-0 right-0 z-50">
                  <div className="fixed inset-0" onClick={() => setShowResults(false)}/>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="relative mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden p-2 dark:bg-[#1a1a1a] dark:border-white/20"
                  >
                    <div className="px-3 py-2 text-[8px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 dark:border-[#ffffff10]">Global Result Match</div>
                    {results.map(tool => {
                      const Icon = tool.icon || FiZap;
                      return (
                            <button 
                              key={tool.id}
                              onClick={() => { navigate(tool.path); setSearchQuery(''); setShowResults(false); }}
                              className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-xl transition-colors text-left group dark:hover:bg-white/10"
                            >
                              <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-[#1a1a1a] group-hover:bg-[#1a1a1a] group-hover:text-white transition-all shadow-sm dark:bg-white/10 dark:text-white dark:group-hover:bg-white dark:group-hover:text-[#1a1a1a]">
                                <Icon size={16} />
                              </div>
                              <div>
                                <p className="text-sm font-black text-[#1a1a1a] dark:text-white group-hover:translate-x-1 transition-transform">{tool.name}</p>
                                <p className="text-[10px] text-gray-500 font-bold uppercase">{tool.category.replace('-', ' ')}</p>
                              </div>
                            </button>
                      );
                    })}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/" className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center" title="Home">
              <FiHome size={18} />
            </Link>
            <DarkModeToggle />
            
            <div 
              className="relative"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors ml-2"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
              
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div 
                    key="menu-dropdown"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute top-full right-0 mt-4 z-50 pointer-events-auto"
                  >
                    <div className="min-w-[220px] bg-white border border-gray-100 shadow-2xl rounded-2xl py-2 p-1 dark:bg-[#1a1a1a] dark:border-[#ffffff10]">
                      <div className="px-3 py-1.5 text-[8px] font-black text-gray-400 uppercase tracking-[0.3em] border-b border-gray-50 dark:border-[#ffffff10] mb-1">Menu Registry</div>
                      <div className="grid grid-cols-1 gap-0.5">
                        {navLinks.map(link => {
                          const Icon = link.icon || FiZap;
                          return (
                            <button 
                              key={link.path}
                              onClick={() => { setIsMenuOpen(false); navigate(link.path); }}
                              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg transition-all text-left group dark:hover:bg-white/10"
                            >
                              <Icon size={14} className="text-gray-400 group-hover:text-[#1a1a1a] dark:text-gray-500 dark:group-hover:text-white transition-colors" />
                              <div className="flex items-center gap-2 flex-1">
                                <p className="text-[11px] font-bold text-[#1a1a1a] dark:text-white group-hover:translate-x-1 transition-transform">{link.name}</p>
                                {location.pathname === link.path && <span className="w-1 h-1 rounded-full bg-[#1a1a1a] dark:bg-white opacity-40 animate-pulse" />}
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
          </div>
        </div>
      </div>
    </nav>
  );
}
