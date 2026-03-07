import { useState } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';

export default function UUIDGenerator() {
  const gen = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r=crypto.getRandomValues(new Uint8Array(1))[0]%16; return(c==='x'?r:r&0x3|0x8).toString(16); });
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState([]);
  const generate = () => setUuids(Array.from({length:count},gen));

  return (
    <ToolLayout toolId="uuid-generator">
      <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-4xl mx-auto w-full">
        <div className="w-full max-w-xl">
          <h2 className="text-black dark:text-white text-3xl font-black mb-10 uppercase tracking-tight text-center">UUID v4 Registry</h2>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 flex items-center gap-3 bg-white dark:bg-white/5 p-2 rounded-2xl border border-gray-100 dark:border-[#ffffff10] shadow-sm">
              <input type="number" min="1" max="20" value={count} onChange={e=>setCount(Math.min(20,Math.max(1,+e.target.value)))}
                className="w-16 text-center px-3 py-2 rounded-xl bg-gray-50 dark:bg-zinc-800 text-black dark:text-white font-black text-sm focus:outline-none"/>
              <button onClick={generate} className="flex-1 py-2.5 rounded-xl bg-[black] dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest shadow-lg hover:opacity-90 transition-all active:scale-95">Generate {count} Assets</button>
            </div>
            {uuids.length>0&&<button onClick={()=>navigator.clipboard.writeText(uuids.join('\n'))} className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-[#ffffff10] text-gray-400 hover:text-black dark:hover:text-white transition-all shadow-sm">Copy All</button>}
          </div>
          <div className="space-y-3">
            {uuids.map((u,i)=>(
              <div key={u} className="flex items-center gap-4 px-6 py-4 bg-white dark:bg-white/5 rounded-2xl border border-gray-50 dark:border-[#ffffff05] shadow-sm group hover:border-[black]/10 dark:hover:border-white/10 transition-all">
                <span className="text-gray-300 dark:text-zinc-600 text-[10px] font-black w-6">#{String(i+1).padStart(2,'0')}</span>
                <code className="flex-1 text-black dark:text-white text-xs font-black font-mono tracking-tight">{u}</code>
                <button onClick={()=>navigator.clipboard.writeText(u)} className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/10 text-gray-400 hover:text-black dark:hover:text-white text-[8px] font-black uppercase transition-all">Copy</button>
              </div>
            ))}
          </div>
          {uuids.length===0&&<div className="bg-white dark:bg-zinc-950/40 rounded-[2.5rem] p-20 text-center border-2 border-dashed border-gray-100 dark:border-[#ffffff05] text-gray-300 dark:text-zinc-700 font-black uppercase tracking-[0.3em] italic shadow-inner">Tap "Generate" to initialize sequence</div>}
        </div>
      </div>
    </ToolLayout>
  );
}
