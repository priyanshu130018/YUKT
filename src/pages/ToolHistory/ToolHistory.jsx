import MainLayout from '../../components/layouts/MainLayout';
import { useTools } from '../../context/ToolContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiActivity, FiTrash2, FiFileText, FiClock, FiExternalLink } from 'react-icons/fi';
import { format } from 'date-fns';

const fadeIn = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function ToolHistory() {
  const { toolHistory, clearHistory } = useTools();

  return (
    <MainLayout>
      {/* Header */}
      <section className="py-14 px-6 border-b border-gray-100 dark:border-white/5 bg-white dark:bg-[#1a1a1a]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center">
                <FiActivity size={20} className="text-blue-500" />
              </div>
              <h1 className="text-3xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tight">History</h1>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              {toolHistory.length} operation{toolHistory.length !== 1 ? 's' : ''} in local log
            </p>
          </div>
          {toolHistory.length > 0 && (
            <button onClick={clearHistory}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500 border border-red-100 dark:border-red-500/20 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all font-black text-[10px] uppercase tracking-widest">
              <FiTrash2 size={13} />
              Clear
            </button>
          )}
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {toolHistory.length > 0 ? (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-3">
              {/* Timeline line */}
              <div className="relative">
                <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gray-100 dark:bg-white/10 pointer-events-none" />
                <div className="space-y-3">
                  {toolHistory.map((item, index) => (
                    <motion.div key={item.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="relative flex items-start gap-5 group">
                      {/* Timeline dot */}
                      <div className="relative z-10 w-12 h-12 shrink-0 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/10 flex items-center justify-center group-hover:border-[#1a1a1a] dark:group-hover:border-white/30 group-hover:bg-[#1a1a1a] dark:group-hover:bg-white transition-all duration-300">
                        <FiFileText size={16} className="text-gray-400 group-hover:text-white dark:group-hover:text-[#1a1a1a] transition-colors" />
                      </div>
                      {/* Card */}
                      <div className="flex-1 bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 p-5 group-hover:border-[#1a1a1a]/20 dark:group-hover:border-white/20 group-hover:shadow-md transition-all duration-300">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="text-xs font-black uppercase tracking-tight text-[#1a1a1a] dark:text-white">
                                {item.toolName}
                              </span>
                              <span className="w-1 h-1 rounded-full bg-gray-200 dark:bg-white/20 shrink-0" />
                              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1">
                                <FiClock size={9} />
                                {format(new Date(item.timestamp), 'MMM dd, HH:mm:ss')}
                              </span>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
                          </div>
                          <span className="shrink-0 text-[10px] font-black text-gray-300 dark:text-white/20 tabular-nums">
                            #{toolHistory.length - index}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer note */}
              <div className="pt-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-300 dark:text-white/20">
                <div className="h-px flex-1 bg-gray-100 dark:bg-white/10" />
                <span>End of log · Data stored locally</span>
                <div className="h-px flex-1 bg-gray-100 dark:bg-white/10" />
              </div>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-24 h-24 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center mb-8">
                <FiActivity size={40} className="text-gray-300 dark:text-white/20" />
              </div>
              <h2 className="text-2xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tight mb-3">Log is Clear</h2>
              <p className="text-gray-400 dark:text-gray-500 font-medium mb-10 max-w-sm">
                Your computation history will appear here as you use tools across the platform.
              </p>
              <Link to="/"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] font-black rounded-xl uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-lg">
                <FiExternalLink size={14} />
                Start Using Tools
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
}
