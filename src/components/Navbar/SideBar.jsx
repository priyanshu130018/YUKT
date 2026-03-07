import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

export default function SideBar({ isOpen, onClose, navLinks }) {
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a]/40 backdrop-blur-sm" 
            onClick={onClose} 
          />
          
          {/* Compact Sidebar Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-20 right-8 w-64 bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-[#ffffff10] z-50 p-6 rounded-3xl shadow-2xl flex flex-col gap-2 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Menu Registry</span>
              <button 
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 transition-colors"
                aria-label="Close Menu"
              >
                <FiX size={16} />
              </button>
            </div>

            <div className="space-y-1">
              {navLinks.map(link => (
                <Link 
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${location.pathname === link.path ? 'bg-[#0a0a0a] text-white dark:bg-white dark:text-black shadow-lg' : 'text-gray-600 hover:bg-gray-50 dark:text-white dark:hover:bg-zinc-900 border border-transparent hover:border-gray-100 dark:hover:border-white/10'}`}
                >
                  <link.icon size={18} className={location.pathname === link.path ? 'animate-pulse' : 'opacity-40'} />
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-50 dark:border-[#ffffff10] flex justify-center">
               <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">YUKT Protocol v1.0</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
