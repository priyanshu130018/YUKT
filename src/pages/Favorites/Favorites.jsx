import MainLayout from '../../components/layouts/MainLayout';
import { useTools } from '../../context/ToolContext';
import { TOOLS } from '../../data/tools';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiZap, FiExternalLink } from 'react-icons/fi';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } };

export default function Favorites() {
  const { favorites, toggleFavorite } = useTools();
  const favoriteTools = TOOLS.filter(t => favorites.includes(t.id));

  return (
    <MainLayout>
      {/* Header */}
      <section className="py-14 px-6 border-b border-gray-100 dark:border-white/5 bg-white dark:bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 flex items-center justify-center">
                <FiStar size={20} className="text-amber-500" fill="currentColor" />
              </div>
              <h1 className="text-3xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tight">Favorites</h1>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              {favoriteTools.length} tool{favoriteTools.length !== 1 ? 's' : ''} saved to your registry
            </p>
          </div>
          {favoriteTools.length > 0 && (
            <div className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-xs font-black uppercase tracking-widest text-gray-400">
              Stored Locally
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {favoriteTools.length > 0 ? (
          <motion.div initial="hidden" animate="visible" variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {favoriteTools.map(tool => {
              const Icon = tool.icon || FiZap;
              return (
                <motion.div key={tool.id} variants={fadeUp}
                  className="group relative bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden hover:border-[#1a1a1a] dark:hover:border-white/30 hover:shadow-xl dark:hover:shadow-white/5 transition-all duration-300">
                  {/* Top color bar */}
                  <div className="h-1 bg-gradient-to-r from-gray-200 dark:from-white/20 to-transparent group-hover:from-[#1a1a1a] dark:group-hover:from-white transition-all duration-500" />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-gray-50 dark:bg-white/10 flex items-center justify-center group-hover:bg-[#1a1a1a] dark:group-hover:bg-white transition-colors duration-300">
                        <Icon size={20} className="text-gray-600 dark:text-white group-hover:text-white dark:group-hover:text-[#1a1a1a] transition-colors" />
                      </div>
                      <button onClick={() => toggleFavorite(tool.id)}
                        className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-amber-400 hover:text-red-400 transition-all"
                        title="Remove from favorites">
                        <FiStar size={16} fill="currentColor" />
                      </button>
                    </div>
                    <h3 className="font-black text-[#1a1a1a] dark:text-white text-sm uppercase tracking-tight mb-1">{tool.name}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">{tool.category.replace(/-/g, ' ')}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-5">{tool.description}</p>
                    <Link to={tool.path}
                      className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1a1a1a] dark:text-white hover:gap-3 transition-all">
                      <span>Open Tool</span>
                      <FiExternalLink size={12} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-24 h-24 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center mb-8">
              <FiStar size={40} className="text-gray-300 dark:text-white/20" />
            </div>
            <h2 className="text-2xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tight mb-3">No Favorites Yet</h2>
            <p className="text-gray-400 dark:text-gray-500 font-medium mb-10 max-w-sm">
              Star any tool while using it to save it here for quick access.
            </p>
            <Link to="/"
              className="px-8 py-3.5 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] font-black rounded-xl uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-lg">
              Browse All Tools
            </Link>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
}
