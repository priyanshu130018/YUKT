import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function DarkModeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <button onClick={toggle}
      className="p-2 rounded-xl border border-white/20 bg-white/10 text-gray-400 hover:text-white hover:bg-white/20 hover:border-white/40 transition-all dark:bg-white/5 dark:border-[#ffffff10] dark:text-white dark:hover:bg-white/10"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
      {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
}
