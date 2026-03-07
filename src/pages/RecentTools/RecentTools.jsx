import MainLayout from '../../components/layouts/MainLayout';
import ToolCard from '../../components/ToolCard/ToolCard';
import { useTools } from '../../context/ToolContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiTrash2, FiArrowRight, FiZap } from 'react-icons/fi';
import { format } from 'date-fns';

const stagger = { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function RecentTools() {
  const { recentTools, clearRecentTools } = useTools();

  return (
    <MainLayout>
      {/* Header */}
      <section className="py-14 px-6 border-b border-gray-100 dark:border-white/5 bg-white dark:bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 flex items-center justify-center">
                <FiClock size={20} className="text-emerald-500" />
              </div>
              <h1 className="text-3xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tight">Recent Tools</h1>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              {recentTools.length > 0
                ? `${recentTools.length} tool${recentTools.length !== 1 ? 's' : ''} visited recently`
                : 'Your recently used tools appear here'}
            </p>
          </div>
          {recentTools.length > 0 && (
            <button onClick={clearRecentTools}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500 border border-red-100 dark:border-red-500/20 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all font-black text-[10px] uppercase tracking-widest">
              <FiTrash2 size={13} />
              Clear History
            </button>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {recentTools.length > 0 ? (
            <motion.div key="list" initial="hidden" animate="visible" variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {recentTools.map((tool, i) => (
                <motion.div key={tool.id} variants={fadeUp}>
                  <div className="relative">
                    {/* Timestamp badge */}
                    {tool.visitedAt && (
                      <div className="absolute -top-2 left-4 z-10 px-2.5 py-0.5 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-white/30 shadow-sm">
                        {format(new Date(tool.visitedAt), 'HH:mm')}
                      </div>
                    )}
                    <ToolCard tool={tool} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-32 text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center">
                  <FiClock size={40} className="text-gray-300 dark:text-white/20" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 flex items-center justify-center">
                  <FiZap size={14} className="text-emerald-500" />
                </div>
              </div>
              <h2 className="text-2xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tight mb-3">No Recent Tools</h2>
              <p className="text-gray-400 dark:text-gray-500 font-medium mb-10 max-w-sm text-sm">
                Tools you open will automatically appear here for quick re-access.
              </p>
              <Link to="/"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] font-black rounded-xl uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-lg">
                <FiArrowRight size={14} />
                Explore Tools
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
}
