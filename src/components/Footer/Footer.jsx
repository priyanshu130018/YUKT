import { Link } from 'react-router-dom';
import { CATEGORIES, TOOLS_BY_CATEGORY } from '../../data/tools';
import { FiGithub, FiTwitter, FiMail, FiMapPin } from 'react-icons/fi';
import { useTools } from '../../context/ToolContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { toolUsage } = useTools();

  return (
    <footer className="bg-white dark:bg-[#1a1a1a] border-t border-gray-100 dark:border-[#ffffff10] pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-xl bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] shadow-lg transition-transform group-hover:rotate-12">
                Y
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-black text-2xl tracking-tighter text-[#1a1a1a] dark:text-white">YUKT</span>
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-400">Ultimate Toolkit</span>
              </div>
            </Link>
            <p className="text-gray-500 dark:text-white font-medium leading-relaxed mb-8 max-w-sm">
              Professional-grade administrative and utility tools. All processing happens locally in your browser to ensure maximum privacy and speed.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/priyanshu130018/YUKT"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-100 dark:border-[#ffffff10] flex items-center justify-center text-gray-400 hover:text-[#1a1a1a] dark:text-white hover:border-[#1a1a1a] dark:hover:border-white transition-all"
              >
                <FiGithub size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-100 dark:border-[#ffffff10] flex items-center justify-center text-gray-400 hover:text-[#1a1a1a] dark:text-white hover:border-[#1a1a1a] dark:hover:border-white transition-all">
                <FiTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-100 dark:border-[#ffffff10] flex items-center justify-center text-gray-400 hover:text-[#1a1a1a] dark:text-white hover:border-[#1a1a1a] dark:hover:border-white transition-all">
                <FiMail size={18} />
              </a>
            </div>
          </div>



          {/* Quick Links */}
          <div>
            <h4 className="text-[#1a1a1a] dark:text-white font-black text-xs uppercase tracking-[0.2em] mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><Link to="/favorites" className="text-gray-500 hover:text-[#1a1a1a] dark:text-white font-bold text-sm transition-colors">Favorites</Link></li>
              <li><Link to="/recent-tools" className="text-gray-500 hover:text-[#1a1a1a] dark:text-white font-bold text-sm transition-colors">Recent Tools</Link></li>
              <li><Link to="/tool-history" className="text-gray-500 hover:text-[#1a1a1a] dark:text-white font-bold text-sm transition-colors">History</Link></li>
              <li><Link to="/analytics" className="text-gray-500 hover:text-[#1a1a1a] dark:text-white font-bold text-sm transition-colors">Usage Analytics</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[#1a1a1a] dark:text-white font-black text-xs uppercase tracking-[0.2em] mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-500 hover:text-[#1a1a1a] dark:text-white font-bold text-sm transition-colors">About YUKT</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-[#1a1a1a] dark:text-white font-bold text-sm transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-gray-500 hover:text-[#1a1a1a] dark:text-white font-bold text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-500 hover:text-[#1a1a1a] dark:text-white font-bold text-sm transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Tool Register */}
        <div className="pt-12 border-t border-gray-50 dark:border-[#ffffff10] mb-12">
          <h4 className="text-[#1a1a1a] dark:text-white font-black text-xs uppercase tracking-[0.2em] mb-8 text-center">Tool Register</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-8">
            {[...CATEGORIES].sort((a,b) => a.label.localeCompare(b.label)).map(cat => (
              <div key={cat.id}>
                <h5 className="text-gray-900 dark:text-white font-black text-[10px] uppercase tracking-[0.2em] mb-4">{cat.label}</h5>
                <ul className="space-y-3">
                  {(TOOLS_BY_CATEGORY[cat.id] || [])
                    .sort((a, b) => (toolUsage[b.id] || 0) - (toolUsage[a.id] || 0))
                    .map(tool => (
                      <li key={tool.id}>
                        <Link to={tool.path} className="text-gray-500 hover:text-[#1a1a1a] dark:text-gray-300 dark:hover:text-white text-xs font-bold transition-colors block leading-tight">
                          {tool.name}
                        </Link>
                      </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-gray-50 dark:border-[#ffffff10] flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-gray-400 dark:text-white text-center text-xs font-bold uppercase tracking-widest">
            © {currentYear} YUKT FRAMEWORK. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
