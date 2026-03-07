import { useState } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';
import { motion } from 'framer-motion';

export default function CharacterCounter() {
  const [text, setText] = useState('');
  const freq = {};
  for (const c of text.toLowerCase()) { if (c.trim()) freq[c] = (freq[c]||0)+1; }
  const sorted = Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,10);
  const max = sorted[0]?.[1] || 1;

  return (
    <ToolLayout toolId="character-counter">
      <div className="flex-1 flex flex-col p-8 max-w-4xl mx-auto w-full">
        <h2 className="text-[#1a1a1a] dark:text-white text-3xl font-black mb-6 uppercase tracking-tight text-center">Character Counter</h2>
        <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Type text to see character frequency..."
          className="min-h-48 p-5 rounded-2xl bg-white dark:bg-zinc-900/40 border border-gray-200 dark:border-[#ffffff10] text-[#1a1a1a] dark:text-white text-lg placeholder-gray-400 focus:ring-2 focus:ring-[#1a1a1a]/10 dark:focus:ring-white/10 outline-none transition-all resize-none mb-6 shadow-inner"/>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[['Total Count',text.length],['Letters Only',text.replace(/[^a-zA-Z]/g,'').length],['Digits Only',text.replace(/[^0-9]/g,'').length],['White Spaces',text.split(' ').length-1]].map(([l,v])=>(
            <div key={l} className="bg-white dark:bg-white/5 rounded-xl p-4 text-center border border-gray-100 dark:border-[#ffffff10] shadow-sm">
              <p className="font-black text-2xl text-[#1a1a1a] dark:text-white">{v}</p>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-1">{l}</p>
            </div>
          ))}
        </div>
        {sorted.length > 0 && (
          <div className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10 shadow-sm transition-colors">
            <h3 className="text-[#1a1a1a] dark:text-white font-black text-sm mb-4 uppercase tracking-widest">Frequency Analysis</h3>
            <div className="space-y-3">
              {sorted.map(([c,n])=>(
                <div key={c} className="flex items-center gap-4">
                  <span className="text-[#1a1a1a] dark:text-white font-mono font-black w-8 h-8 flex items-center justify-center bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-[#ffffff05]">{c==' '?'·':c}</span>
                  <div className="flex-1 h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(n/max)*100}%` }}
                      className="h-full rounded-full bg-[#1a1a1a] dark:bg-white" 
                    />
                  </div>
                  <span className="text-gray-500 font-bold text-xs w-10 text-right">{n}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
