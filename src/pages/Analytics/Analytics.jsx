import MainLayout from '../../components/layouts/MainLayout';
import { useTools } from '../../context/ToolContext';
import { TOOLS, CATEGORIES } from '../../data/tools';
import { buildCategoryStats, getTopTools, getTotalUsage } from '../../utils/analytics';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiPieChart, FiBarChart2, FiActivity } from 'react-icons/fi';

export default function Analytics() {
  const { toolUsage } = useTools();
  
  const categoryStats = buildCategoryStats(toolUsage, TOOLS);
  const topTools = getTopTools(toolUsage, TOOLS, 5);
  const totalOps = getTotalUsage(toolUsage);

  const maxCategoryValue = Math.max(...Object.values(categoryStats), 1);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-[#0a0a0a] flex items-center justify-center text-black shadow-sm border border-black">
              <FiTrendingUp size={24} />
            </div>
            <h1 className="text-4xl font-black text-[black] uppercase tracking-tighter italic">Usage Analytics</h1>
          </div>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Real-time local compute metrics and distribution</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Summary Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
          >
            <FiActivity className="text-black dark:text-white mb-4" size={24} />
            <h3 className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] mb-1">Total Operations</h3>
            <p className="text-4xl font-black text-[black]">{totalOps}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
          >
            <FiPieChart className="text-emerald-500 mb-4" size={24} />
            <h3 className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] mb-1">Active Categories</h3>
            <p className="text-4xl font-black text-[black]">{Object.keys(categoryStats).length}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
          >
            <FiBarChart2 className="text-amber-500 mb-4" size={24} />
            <h3 className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] mb-1">Primary Tool</h3>
            <p className="text-xl font-black text-[black] truncate">{topTools[0]?.tool.name || 'N/A'}</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Tools List */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-black dark:text-white text-xl font-black uppercase tracking-tighter italic mb-8 border-b border-gray-50 pb-4">Most Utilized Tools</h3>
            <div className="space-y-6">
              {topTools.length > 0 ? topTools.map(({ tool, count }, i) => (
                <div key={tool.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-300 font-black italic">0{i+1}</span>
                    <div>
                      <p className="text-sm font-black text-[black] uppercase tracking-tight">{tool.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{tool.category.replace('-', ' ')}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-black text-black dark:text-white">{count}</span>
                    <span className="text-[8px] text-gray-400 font-black uppercase tracking-[0.2em]">Executions</span>
                  </div>
                </div>
              )) : (
                <p className="text-gray-400 font-medium py-12 text-center">No usage data detected.</p>
              )}
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-black dark:text-white text-xl font-black uppercase tracking-tighter italic mb-8 border-b border-gray-50 pb-4">Distribution by Domain</h3>
            <div className="space-y-6">
              {CATEGORIES.map(cat => {
                const value = categoryStats[cat.id] || 0;
                const percentage = (value / maxCategoryValue) * 100;
                return (
                  <div key={cat.id}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[black]">{cat.label}</span>
                      <span className="text-[10px] font-black text-gray-400">{value}</span>
                    </div>
                    <div className="h-2 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        className="h-full rounded-full"
                        style={{ background: cat.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
