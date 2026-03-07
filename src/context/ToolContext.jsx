import { createContext, useContext, useState, useCallback } from 'react';
import { getItem, setItem } from '../utils/localStorage';

const ToolContext = createContext(null);

export function ToolProvider({ children }) {
  const [favorites, setFavorites]   = useState(() => getItem('yukt_favorites', []));
  const [recentTools, setRecent]    = useState(() => getItem('yukt_recent', []));
  const [toolHistory, setHistory]   = useState(() => getItem('yukt_history', []));
  const [toolUsage, setUsage]        = useState(() => getItem('yukt_usage', {}));

  const toggleFavorite = useCallback((toolId) => {
    setFavorites(prev => {
      const next = prev.includes(toolId) ? prev.filter(id => id !== toolId) : [...prev, toolId];
      setItem('yukt_favorites', next);
      return next;
    });
  }, []);

  const addRecentTool = useCallback((tool) => {
    setRecent(prev => {
      const filtered = prev.filter(t => t.id !== tool.id);
      const next = [{ ...tool, visitedAt: new Date().toISOString() }, ...filtered].slice(0, 20);
      setItem('yukt_recent', next);
      return next;
    });
    setUsage(prev => {
      const next = { ...prev, [tool.id]: (prev[tool.id] || 0) + 1 };
      setItem('yukt_usage', next);
      return next;
    });
  }, []);

  const addHistory = useCallback((entry) => {
    setHistory(prev => {
      const next = [{ ...entry, timestamp: new Date().toISOString(), id: Date.now() }, ...prev].slice(0, 100);
      setItem('yukt_history', next);
      return next;
    });
  }, []);

  const clearRecentTools = useCallback(() => { setRecent([]); setItem('yukt_recent', []); }, []);
  const clearHistory     = useCallback(() => { setHistory([]); setItem('yukt_history', []); }, []);

  return (
    <ToolContext.Provider value={{
      favorites, toggleFavorite,
      recentTools, addRecentTool, clearRecentTools,
      toolHistory, addHistory, clearHistory,
      toolUsage,
    }}>
      {children}
    </ToolContext.Provider>
  );
}

export const useTools = () => {
  const ctx = useContext(ToolContext);
  if (!ctx) throw new Error('useTools must be used within ToolProvider');
  return ctx;
};
