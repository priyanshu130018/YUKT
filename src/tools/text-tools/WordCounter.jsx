import { useState } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';

export default function WordCounter() {
  const [text, setText] = useState('');
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g,'').length;
  const sentences = text.split(/[.!?]+/).filter(s=>s.trim()).length;
  const paragraphs = text.split(/\n\s*\n/).filter(p=>p.trim()).length;
  const readTime = Math.ceil(words/200);

  return (
    <ToolLayout toolId="word-counter">
      <div className="flex-1 flex flex-col p-8 max-w-4xl mx-auto w-full">
        <h2 className="text-black dark:text-white text-3xl font-black mb-6 uppercase tracking-tight text-center">Word Counter</h2>
        <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Type or paste your text here..."
          className="flex-1 min-h-64 p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-gray-200 dark:border-[#ffffff10] text-black dark:text-white text-lg placeholder-gray-400 focus:ring-2 focus:ring-[black]/10 dark:focus:ring-white/10 outline-none transition-all resize-none mb-6 shadow-inner"/>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[['Words',words],['Characters',chars],['No Spaces',charsNoSpaces],['Sentences',sentences],['Paragraphs',paragraphs],['Read Time',`~${readTime}min`]].map(([l,v])=>(
            <div key={l} className="bg-white dark:bg-white/5 rounded-xl p-4 text-center border border-gray-100 dark:border-[#ffffff10] shadow-sm">
              <p className="font-black text-2xl text-black dark:text-white">{v}</p>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-1">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
