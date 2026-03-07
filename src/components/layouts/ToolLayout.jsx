import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { useTools } from '../../context/ToolContext';
import { getToolById, getCategory } from '../../data/tools';
import Navbar from '../Navbar/Navbar';
import ToolNavbar from '../Navbar/ToolNavbar';
import Footer from '../Footer/Footer';

export default function ToolLayout({ toolId, children }) {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, addRecentTool } = useTools();
  const tool = getToolById(toolId);
  const cat = tool ? getCategory(tool.category) : null;
  const isFav = favorites.includes(toolId);

  useEffect(() => {
    if (tool) {
      addRecentTool(tool);
      document.title = `${tool.name} — YUKT`;
    }
    return () => { document.title = 'YUKT — Your Ultimate Kit of Tools'; };
  }, [toolId]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0a0a0a] transition-colors">
      <Navbar />
      <ToolNavbar />
      
      {/* Tool Content w/ Professional Container */}
      <div className="flex-1 flex flex-col pt-4 pb-12">
        <div className="max-w-7xl mx-auto w-full px-4">
          <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#ffffff10] rounded-3xl shadow-sm overflow-hidden min-h-[60vh] p-6 sm:p-10 transition-colors">
            {children}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
