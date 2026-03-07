import MainLayout from '../../components/layouts/MainLayout';
import { useTools } from '../../context/ToolContext';
import { TOOLS, CATEGORIES } from '../../data/tools';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiZap, FiBarChart2, FiPieChart, FiActivity } from 'react-icons/fi';

const fadeUp = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };

function getTotalUsage(usage) { return Object.values(usage).reduce((a, b) => a + b, 0); }
function getTopTools(usage, tools, n = 5) {
  return tools.filter(t => usage[t.id] > 0).sort((a, b) => (usage[b.id] || 0) - (usage[a.id] || 0)).slice(0, n)
    .map(t => ({ tool: t, count: usage[t.id] }));
}
function getCategoryStats(usage, tools) {
  return CATEGORIES.reduce((acc, cat) => {
    acc[cat.id] = tools.filter(t => t.category === cat.id).reduce((s, t) => s + (usage[t.id] || 0), 0);
    return acc;
  }, {});
}

export default function Analytics() {
  const { toolUsage } = useTools();
  const totalOps = getTotalUsage(toolUsage);
  const topTools = getTopTools(toolUsage, TOOLS, 7);
  const categoryStats = getCategoryStats(toolUsage, TOOLS);
  const maxCat = Math.max(...Object.values(categoryStats), 1);
  const activeCategories = CATEGORIES.filter(c => categoryStats[c.id] > 0);
  const uniqueTools = Object.values(toolUsage).filter(v => v > 0).length;

  const summaryCards = [
    { icon: FiActivity, label: 'Total Operations', value: totalOps },
    { icon: FiZap, label: 'Tools Used', value: uniqueTools },
    { icon: FiPieChart, label: 'Categories Active', value: activeCategories.length },
    { icon: FiTrendingUp, label: 'Most Used', value: topTools[0]?.tool.name.split(' ')[0] || '—' },
  ];

  return (
    <MainLayout>
      {/* Header */}
      <section className="py-14 px-6 border-b border-gray-100 dark:border-white/5 bg-white dark:bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 flex items-center justify-center">
                <FiBarChart2 size={20} className="text-violet-500" />
              </div>
              <h1 className="text-3xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tight">Analytics</h1>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Local usage metrics · stored in your browser</p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-300 dark:text-white/20">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live Local Data
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">

        {/* Summary Stats */}
        <motion.div initial="hidden" animate="visible" variants={stagger}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {summaryCards.map(({ icon: Icon, label, value }) => (
            <motion.div key={label} variants={fadeUp}
              className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10 hover:border-[#1a1a1a]/20 dark:hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/10 flex items-center justify-center mb-4 group-hover:bg-[#1a1a1a] dark:group-hover:bg-white transition-colors">
                <Icon size={18} className="text-gray-500 dark:text-white group-hover:text-white dark:group-hover:text-[#1a1a1a] transition-colors" />
              </div>
              <p className="text-2xl font-black text-[#1a1a1a] dark:text-white mb-1 truncate">{value}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Top Tools */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="lg:col-span-3 bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
            <div className="px-7 py-5 border-b border-gray-50 dark:border-white/5 flex items-center justify-between">
              <div>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#1a1a1a] dark:text-white">Top Tools</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">By total executions</p>
              </div>
              <FiTrendingUp size={16} className="text-gray-300 dark:text-white/20" />
            </div>
            <div className="p-6 space-y-3">
              {topTools.length > 0 ? topTools.map(({ tool, count }, i) => {
                const Icon = tool.icon || FiZap;
                const pct = Math.round((count / (topTools[0]?.count || 1)) * 100);
                return (
                  <Link key={tool.id} to={tool.path}
                    className="group flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                    <span className="w-6 text-[11px] font-black text-gray-300 dark:text-white/20 text-center shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#1a1a1a] dark:group-hover:bg-white transition-colors">
                      <Icon size={16} className="text-gray-500 dark:text-white group-hover:text-white dark:group-hover:text-[#1a1a1a] transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-black text-[#1a1a1a] dark:text-white uppercase tracking-tight truncate">{tool.name}</span>
                        <span className="text-xs font-black text-gray-400 ml-2 shrink-0">{count}×</span>
                      </div>
                      <div className="h-1 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.3 + i * 0.07, duration: 0.6, ease: 'easeOut' }}
                          className="h-full bg-[#1a1a1a] dark:bg-white rounded-full" />
                      </div>
                    </div>
                  </Link>
                );
              }) : (
                <div className="py-12 text-center text-gray-400 dark:text-white/20">
                  <FiZap size={32} className="mx-auto mb-3 opacity-30" />
                  <p className="text-xs font-bold uppercase tracking-widest">No usage data yet</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Category Breakdown */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
            <div className="px-7 py-5 border-b border-gray-50 dark:border-white/5 flex items-center justify-between">
              <div>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#1a1a1a] dark:text-white">By Category</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Distribution</p>
              </div>
              <FiPieChart size={16} className="text-gray-300 dark:text-white/20" />
            </div>
            <div className="p-6 space-y-4">
              {CATEGORIES.map((cat, i) => {
                const val = categoryStats[cat.id] || 0;
                const pct = Math.round((val / maxCat) * 100);
                return (
                  <div key={cat.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">{cat.label}</span>
                      <span className="text-[10px] font-black text-gray-400">{val}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.4 + i * 0.06, duration: 0.6, ease: 'easeOut' }}
                        className="h-full bg-[#1a1a1a] dark:bg-white rounded-full" />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Empty State */}
        {totalOps === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10">
            <div className="w-20 h-20 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center mb-6">
              <FiBarChart2 size={36} className="text-gray-300 dark:text-white/20" />
            </div>
            <h3 className="text-xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tight mb-2">No Data Yet</h3>
            <p className="text-gray-400 dark:text-gray-500 font-medium mb-8 max-w-sm text-sm">Use any tool to start generating usage metrics. All data stays local.</p>
            <Link to="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] font-black rounded-xl uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-lg">
              <FiZap size={14} />
              Open a Tool
            </Link>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
}
