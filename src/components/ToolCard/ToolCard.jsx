import { Link } from 'react-router-dom';
import { useTools } from '../../context/ToolContext';
import { getCategory } from '../../data/tools';
import { FiStar, FiArrowRight } from 'react-icons/fi';

export default function ToolCard({ tool }) {
  const { favorites, toggleFavorite } = useTools();
  const isFav = favorites.includes(tool.id);
  const cat = getCategory(tool.category);
  const Icon = tool.icon;

  return (
    <div className="group relative bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden hover:border-[#1a1a1a] dark:hover:border-white/30 hover:shadow-xl dark:hover:shadow-white/5 transition-all duration-300 flex flex-col">
      {/* Animated top accent bar */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent group-hover:via-[#1a1a1a] dark:group-hover:via-white transition-all duration-500" />

      <div className="p-5 flex flex-col flex-1">
        {/* Icon row + fav */}
        <div className="flex items-start justify-between mb-4">
          <Link to={tool.path}
            className="w-11 h-11 rounded-xl bg-gray-50 dark:bg-white/10 flex items-center justify-center group-hover:bg-[#1a1a1a] dark:group-hover:bg-white transition-colors duration-300">
            {Icon && <Icon size={20} className="text-gray-600 dark:text-white group-hover:text-white dark:group-hover:text-[#1a1a1a] transition-colors" />}
          </Link>
          <button
            onClick={e => { e.preventDefault(); e.stopPropagation(); toggleFavorite(tool.id); }}
            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
            className={`p-2 rounded-xl border transition-all ${
              isFav
                ? 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30 text-amber-500'
                : 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-300 dark:text-white/20 hover:border-amber-200 dark:hover:border-amber-500/30 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10'
            }`}>
            <FiStar size={15} fill={isFav ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Title / Meta */}
        <Link to={tool.path} className="flex-1">
          <h3 className="font-black text-[#1a1a1a] dark:text-white text-sm uppercase tracking-tight mb-1 group-hover:opacity-80 transition-opacity">
            {tool.name}
          </h3>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-white/30 mb-3">
            {cat?.label}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed line-clamp-2">
            {tool.description}
          </p>
        </Link>

        {/* Footer */}
        <Link to={tool.path}
          className="flex items-center gap-1.5 mt-4 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-white/30 group-hover:text-[#1a1a1a] dark:group-hover:text-white transition-colors">
          <span>Open</span>
          <FiArrowRight size={11} />
        </Link>
      </div>
    </div>
  );
}
