import MainLayout from '../../components/layouts/MainLayout';
import { useTools } from '../../context/ToolContext';
import { motion } from 'framer-motion';
import { FiActivity, FiTrash2, FiClock, FiFileText } from 'react-icons/fi';
import { format } from 'date-fns';

export default function ToolHistory() {
  const { toolHistory, clearHistory } = useTools();

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
                <FiActivity size={24} />
              </div>
              <h1 className="text-4xl font-black text-[black] uppercase tracking-tighter italic">History</h1>
            </div>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Chronological log of computational operations</p>
          </div>
          {toolHistory.length > 0 && (
            <button 
              onClick={clearHistory}
              className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest border border-red-100"
            >
              <FiTrash2 size={14} />
              Clear
            </button>
          )}
        </header>

        {toolHistory.length > 0 ? (
          <div className="space-y-4">
            {toolHistory.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between group hover:border-[black] transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center justify-center border-r border-gray-100 pr-6 mr-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Session</span>
                    <span className="text-black dark:text-white font-black text-lg italic">#{toolHistory.length - index}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-black text-[black] uppercase tracking-tight">{item.toolName}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-200" />
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        {format(new Date(item.timestamp), 'MMM dd, HH:mm:ss')}
                      </span>
                    </div>
                    <p className="text-gray-600 font-medium text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="hidden group-hover:flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg text-gray-400">
                  <FiFileText size={12} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Stored Locally</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white border-2 border-dashed border-gray-100 rounded-3xl p-20 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mx-auto mb-6">
              <FiActivity size={40} />
            </div>
            <h3 className="text-[black] font-black text-xl mb-2 uppercase tracking-tight">Logs are Clear</h3>
            <p className="text-gray-400 font-medium mb-8">No operations have been recorded in the local registry.</p>
            <a href="/" className="px-8 py-3 bg-[black] text-white font-black rounded-xl uppercase tracking-widest text-sm hover:shadow-lg transition-all">
              Initialize System
            </a>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
