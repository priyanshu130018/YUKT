import { useState } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';
import { FiCopy, FiCheck } from 'react-icons/fi';

const CASES = ['UPPER CASE','lower case','Title Case','Sentence case','camelCase','PascalCase','snake_case','kebab-case','Reversed'];
const convert = (t, mode) => ({
  'UPPER CASE':t.toUpperCase(),
  'lower case':t.toLowerCase(),
  'Title Case':t.split(' ').map(w=>w.charAt(0).toUpperCase()+w.slice(1).toLowerCase()).join(' '),
  'Sentence case':t.charAt(0).toUpperCase()+t.slice(1).toLowerCase(),
  camelCase:t.replace(/\s+(.)/g,(_,c)=>c.toUpperCase()).replace(/^./,c=>c.toLowerCase()),
  PascalCase:t.replace(/\s+(.)/g,(_,c)=>c.toUpperCase()).replace(/^./,c=>c.toUpperCase()),
  snake_case:t.toLowerCase().replace(/\s+/g,'_'),
  'kebab-case':t.toLowerCase().replace(/\s+/g,'-'),
  Reversed:t.split('').reverse().join(''),
}[mode]||t);

export default function CaseConverter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState('');

  const copy = (val, lbl) => { navigator.clipboard.writeText(val); setCopied(lbl); setTimeout(()=>setCopied(''),1500); };

  return (
    <ToolLayout toolId="case-converter">
      <div className="flex-1 flex flex-col p-8 max-w-4xl mx-auto w-full">
        <h2 className="text-[#1a1a1a] dark:text-white text-3xl font-black mb-6 uppercase tracking-tight text-center">Case Converter</h2>
        <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Enter text to convert..."
          className="min-h-48 p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-gray-200 dark:border-[#ffffff10] text-[#1a1a1a] dark:text-white text-lg placeholder-gray-400 focus:ring-2 focus:ring-[#1a1a1a]/10 dark:focus:ring-white/10 outline-none transition-all resize-none mb-6 shadow-inner"/>
        <div className="grid sm:grid-cols-2 gap-4">
          {CASES.map(c=>{
            const out = convert(text, c);
            return (
              <div key={c} className="bg-white dark:bg-white/5 rounded-xl p-5 border border-gray-100 dark:border-[#ffffff10] shadow-sm transition-all group hover:border-[#1a1a1a]/30 dark:hover:border-white/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#1a1a1a] dark:text-white text-[10px] font-black uppercase tracking-widest">{c}</span>
                  <button onClick={()=>copy(out,c)} className="p-1.5 rounded-lg text-gray-400 hover:text-[#1a1a1a] dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
                    {copied===c?<FiCheck size={16} className="text-green-600"/>:<FiCopy size={16}/>}
                  </button>
                </div>
                <p className="text-[#1a1a1a] dark:text-white text-sm break-all font-medium leading-relaxed">{out||<span className="text-gray-300 dark:text-zinc-700 italic">…</span>}</p>
              </div>
            );
          })}
        </div>
      </div>
    </ToolLayout>
  );
}
