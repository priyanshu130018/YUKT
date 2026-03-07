import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import { searchTools } from '../../data/tools';

export default function SearchBar({ onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleChange = (v) => {
    setQuery(v);
    setResults(v.trim() ? searchTools(v).slice(0, 8) : []);
  };

  const goTo = (path) => { navigate(path); onClose?.(); };

  return (
    <div className="relative w-full max-w-xl">
      <div className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl border border-white/10">
        <FiSearch size={16} className="text-gray-400 flex-shrink-0" />
        <input ref={inputRef} type="text" value={query} onChange={e => handleChange(e.target.value)}
          placeholder="Search tools..." className="bg-transparent text-white text-sm placeholder-gray-500 flex-1 min-w-0" />
        {query && <button onClick={() => handleChange('')} className="text-gray-400 hover:text-white"><FiX size={14} /></button>}
      </div>
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass rounded-xl border border-white/10 overflow-hidden z-50 shadow-2xl">
          {results.map(t => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => goTo(t.path)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/10 text-white">
                  {Icon && <Icon size={14} />}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
