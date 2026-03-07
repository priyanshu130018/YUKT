import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiHome, FiChevronRight } from 'react-icons/fi';
import { useTools } from '../../context/ToolContext';
import { getToolById, getCategory } from '../../data/tools';
import Navbar from '../Navbar/Navbar';
import ToolNavbar from '../Navbar/ToolNavbar';
import Footer from '../Footer/Footer';

export default function ToolLayout({ toolId, children }) {
  const { favorites, toggleFavorite, addRecentTool } = useTools();
  const tool = getToolById(toolId);
  const cat = tool ? getCategory(tool.category) : null;
  const isFav = favorites.includes(toolId);
  const Icon = tool?.icon;

  useEffect(() => {
    if (tool) {
      addRecentTool(tool);
      document.title = `${tool.name} — YUKT`;
    }
    return () => { document.title = 'YUKT — Your Ultimate Kit of Tools'; };
  }, [toolId]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#111] transition-colors">
      <Navbar />
      <ToolNavbar />

      {/* Tool Header Bar */}
      {tool && (
        <div className="bg-white dark:bg-[#1a1a1a] border-b border-gray-100 dark:border-white/5 px-4 md:px-8 py-4 transition-colors">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Breadcrumb + Title */}
            <div className="flex items-center gap-3 min-w-0">
              <Link to="/"
                className="p-2 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 dark:text-white/40 hover:text-[#1a1a1a] dark:hover:text-white transition-all shrink-0"
                title="Home">
                <FiHome size={15} />
              </Link>
              <FiChevronRight size={14} className="text-gray-300 dark:text-white/20 shrink-0" />
              {cat && (
                <>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-white/40 hidden sm:block shrink-0">
                    {cat.label}
                  </span>
                  <FiChevronRight size={14} className="text-gray-300 dark:text-white/20 shrink-0 hidden sm:block" />
                </>
              )}
              <div className="flex items-center gap-2.5 min-w-0">
                {Icon && (
                  <div className="w-7 h-7 rounded-lg bg-gray-50 dark:bg-white/10 flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-[#1a1a1a] dark:text-white" />
                  </div>
                )}
                <span className="font-black text-[#1a1a1a] dark:text-white text-sm uppercase tracking-tight truncate">
                  {tool.name}
                </span>
              </div>
            </div>

            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(toolId)}
              title={isFav ? 'Remove from favorites' : 'Add to favorites'}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border font-black text-[10px] uppercase tracking-widest transition-all shrink-0
                ${isFav
                  ? 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30 text-amber-500 hover:bg-amber-100 dark:hover:bg-amber-500/20'
                  : 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-400 dark:text-white/40 hover:border-amber-200 dark:hover:border-amber-500/30 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10'
                }`}>
              <FiStar size={13} fill={isFav ? 'currentColor' : 'none'} />
              <span className="hidden sm:inline">{isFav ? 'Saved' : 'Favorite'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Page description strip */}
      {tool && (
        <div className="bg-gray-50/80 dark:bg-black/20 border-b border-gray-100 dark:border-white/5 px-4 md:px-8 py-2.5 transition-colors">
          <div className="max-w-7xl mx-auto">
            <p className="text-[11px] font-medium text-gray-400 dark:text-white/30">{tool.description}</p>
          </div>
        </div>
      )}

      {/* Tool Content */}
      <div className="flex-1 flex flex-col pt-4 pb-12">
        <div className="max-w-7xl mx-auto w-full px-4">
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden min-h-[60vh] transition-colors">
            {children}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
