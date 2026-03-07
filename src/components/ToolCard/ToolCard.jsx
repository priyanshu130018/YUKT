import { Link } from 'react-router-dom';
import { useTools } from '../../context/ToolContext';
import { getCategory } from '../../data/tools';
import { FiStar } from 'react-icons/fi';

export default function ToolCard({ tool }) {
  const { favorites, toggleFavorite } = useTools();
  const isFav = favorites.includes(tool.id);
  const cat = getCategory(tool.category);
  const Icon = tool.icon;

  return (
    <Link to={tool.path}
      className="block bg-white rounded-xl p-5 border border-gray-200 hover:border-[black] hover:shadow-lg transition-all group relative overflow-hidden"
    >
      <div className="relative z-10">
        {/* Icon + Favorite */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-50 text-black dark:text-white group-hover:bg-[black] group-hover:text-white transition-colors shadow-sm">
            {Icon && <Icon size={20} />}
          </div>
          <button
            onClick={e => { e.preventDefault(); e.stopPropagation(); toggleFavorite(tool.id); }}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-all"
            style={{ color: isFav ? '#B45309' : '#94A3B8' }}>
            <FiStar size={18} fill={isFav ? '#B45309' : 'none'} />
          </button>
        </div>

        <h3 className="text-gray-900 font-bold text-sm mb-1 truncate group-hover:text-black dark:text-white">{tool.name}</h3>
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 font-medium">{tool.description}</p>

        {/* Category tag */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-black dark:text-white/40">{cat?.label}</span>
          <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <FiStar size={10} className="text-black dark:text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
}
