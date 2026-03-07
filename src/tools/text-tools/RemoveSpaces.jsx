import { useState } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';

const MODES = [
  { id:'extra', label:'Remove Extra Spaces', fn:t=>t.replace(/\s+/g,' ').trim() },
  { id:'all',   label:'Remove All Spaces',   fn:t=>t.replace(/\s/g,'') },
  { id:'blank', label:'Remove Blank Lines',  fn:t=>t.split('\n').filter(l=>l.trim()).join('\n') },
  { id:'trim',  label:'Trim Each Line',      fn:t=>t.split('\n').map(l=>l.trim()).join('\n') },
  { id:'one',   label:'Convert to One Line', fn:t=>t.replace(/\n+/g,' ').replace(/\s+/g,' ').trim() },
];

export default function RemoveSpaces() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('extra');
  const m = MODES.find(m=>m.id===mode);
  const output = text ? m.fn(text) : '';

  return (
    <ToolLayout toolId="remove-spaces">
      <div className="flex-1 flex flex-col p-8 max-w-4xl mx-auto w-full">
        <h2 className="text-black dark:text-white text-3xl font-black mb-6 uppercase tracking-tight text-center">Remove Spaces</h2>
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {MODES.map(m=>(
            <button key={m.id} onClick={()=>setMode(m.id)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm active:scale-95 ${mode===m.id?'bg-[black] text-white dark:bg-white dark:text-black':'bg-white dark:bg-white/5 border border-gray-100 dark:border-[#ffffff10] text-gray-400 dark:text-zinc-500 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/10'}`}>
              {m.label}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-6 flex-1">
          <div className="flex flex-col">
            <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2 block ml-1">Input Text</label>
            <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Paste text here..."
              className="flex-1 min-h-64 p-5 rounded-2xl bg-white dark:bg-zinc-900/40 border border-gray-200 dark:border-[#ffffff10] text-black dark:text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-[black]/10 dark:focus:ring-white/10 outline-none transition-all resize-none shadow-inner"/>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2 px-1">
              <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Output Result</label>
              {output && <button onClick={()=>navigator.clipboard.writeText(output)} className="text-xs font-bold text-black dark:text-white hover:underline transition-all">Copy Result</button>}
            </div>
            <textarea value={output} readOnly placeholder="Result will appear here..."
              className="flex-1 min-h-64 p-5 rounded-2xl bg-gray-50/50 dark:bg-black/40 border border-gray-200 dark:border-[#ffffff10] text-black dark:text-white text-sm placeholder-gray-400 outline-none cursor-default resize-none shadow-inner p-5"/>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
