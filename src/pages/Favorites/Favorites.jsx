import MainLayout from '../../components/layouts/MainLayout';
import ToolCard from '../../components/ToolCard/ToolCard';
import { useTools } from '../../context/ToolContext';
import { TOOLS } from '../../data/tools';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

export default function Favorites() {
  const { favorites } = useTools();
  const favoriteTools = TOOLS.filter(tool => favorites.includes(tool.id));

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 shadow-sm border border-amber-100">
              <FiStar size={24} fill="currentColor" />
            </div>
            <h1 className="text-4xl font-black text-[black] uppercase tracking-tighter italic">Favorite Tools</h1>
          </div>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Your curated collection of essential utilities</p>
        </header>

        {favoriteTools.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {favoriteTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </motion.div>
        ) : (
          <div className="bg-white border-2 border-dashed border-gray-100 rounded-3xl p-20 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mx-auto mb-6">
              <FiStar size={40} />
            </div>
            <h3 className="text-[black] font-black text-xl mb-2 uppercase tracking-tight">No favorites yet</h3>
            <p className="text-gray-400 font-medium mb-8">Start adding tools to your favorites for quick access.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
