import MainLayout from '../../components/layouts/MainLayout';
import ToolCard from '../../components/ToolCard/ToolCard';
import { useTools } from '../../context/ToolContext';
import { motion } from 'framer-motion';
import { FiClock, FiTrash2 } from 'react-icons/fi';

export default function RecentTools() {
  const { recentTools, clearRecentTools } = useTools();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-[#0a0a0a] flex items-center justify-center text-black dark:text-white shadow-sm border border-black">
                <FiClock size={24} />
              </div>
              <h1 className="text-4xl font-black text-[black] uppercase tracking-tighter italic">Recent Tools</h1>
            </div>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Tools you've interacted with recently</p>
          </div>
          {recentTools.length > 0 && (
            <button 
              onClick={clearRecentTools}
              className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest border border-red-100"
            >
              <FiTrash2 size={14} />
              Clear
            </button>
          )}
        </header>

        {recentTools.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {recentTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </motion.div>
        ) : (
          <div className="bg-white border-2 border-dashed border-gray-100 rounded-3xl p-20 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mx-auto mb-6">
              <FiClock size={40} />
            </div>
            <h3 className="text-[black] font-black text-xl mb-2 uppercase tracking-tight">Registry Empty</h3>
            <p className="text-gray-400 font-medium mb-8">You haven't explored any tools yet in this session.</p>
            <a href="/" className="px-8 py-3 bg-[black] text-white font-black rounded-xl uppercase tracking-widest text-sm hover:shadow-lg transition-all">
              Initialize Explorer
            </a>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
