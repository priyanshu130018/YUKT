import { useState, useEffect } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';

export default function CountdownTimer() {
  const [target, setTarget] = useState('');
  const [label, setLabel] = useState('');
  const [diff, setDiff] = useState(null);

  useEffect(() => {
    if (!target) return;
    const update = () => {
      const d = new Date(target).getTime() - Date.now();
      setDiff(d > 0 ? { days: Math.floor(d/86400000), hours: Math.floor((d%86400000)/3600000), mins: Math.floor((d%3600000)/60000), secs: Math.floor((d%60000)/1000) } : null);
    };
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, [target]);

  const Block = ({ val, lbl }) => (
    <div className="bg-white dark:bg-zinc-900/40 rounded-[2rem] p-8 text-center border border-gray-100 dark:border-[#ffffff10] shadow-xl min-w-[140px] flex flex-col items-center justify-center transition-all hover:scale-105 hover:shadow-2xl hover:border-[black]/20 dark:hover:border-white/40">
      <p className="text-6xl font-black tabular-nums text-black dark:text-white leading-none">{String(val).padStart(2,'0')}</p>
      <div className="h-0.5 w-8 bg-[black]/10 dark:bg-white/10 my-4 rounded-full"/>
      <p className="text-gray-400 text-[8px] font-black uppercase tracking-[0.2em]">{lbl}</p>
    </div>
  );

  return (
    <ToolLayout toolId="countdown">
      <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-5xl mx-auto w-full">
        <h2 className="text-black dark:text-white text-3xl font-black mb-2 uppercase tracking-tight text-center">Event Countdown</h2>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-10 opacity-60">Synchronize to target temporal point</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-12">
          <div className="space-y-2">
            <label className="text-gray-400 text-[10px] font-black uppercase tracking-widest ml-1">Event Registry Name</label>
            <input type="text" placeholder="e.g. MISSION COMMENCEMENT" value={label} onChange={e => setLabel(e.target.value)} 
              className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 text-black dark:text-white font-black placeholder-gray-200 shadow-sm focus:ring-2 focus:ring-[black]/10 outline-none transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-gray-400 text-[10px] font-black uppercase tracking-widest ml-1">Universal Target Time</label>
            <input type="datetime-local" value={target} onChange={e => setTarget(e.target.value)} 
              className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-[#ffffff10] text-black dark:text-white font-black focus:ring-2 focus:ring-[black]/10 dark:focus:ring-white/10 outline-none transition-all" />
          </div>
        </div>

        {label && <h3 className="text-black dark:text-white text-xl font-black uppercase tracking-[0.2em] mb-8 animate-pulse text-center">{label}</h3>}
        
        {target && diff ? (
          <div className="flex flex-wrap gap-6 justify-center">
            <Block val={diff.days} lbl="Days Remaining" /><Block val={diff.hours} lbl="Hours Elapsed" />
            <Block val={diff.mins} lbl="Minutes Counter" /><Block val={diff.secs} lbl="Seconds Tick" />
          </div>
        ) : target ? (
          <div className="bg-[black] dark:bg-white rounded-[2.5rem] p-16 border border-gray-100 dark:border-[#ffffff10] shadow-2xl text-center animate-in zoom-in-95">
            <div className="w-20 h-20 bg-white/10 dark:bg-black/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white dark:text-black text-3xl">🎯</span>
            </div>
            <p className="text-white dark:text-black text-4xl font-black uppercase tracking-tighter">Mission Reached</p>
            <p className="text-white/40 dark:text-black/40 text-[10px] font-black uppercase tracking-[0.4em] mt-4">Target Temporal Point Achieved</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-900/40 rounded-3xl p-16 border border-gray-200 dark:border-[#ffffff10] text-gray-300 dark:text-zinc-600 font-black uppercase tracking-widest text-center italic shadow-inner w-full max-w-3xl">
            Select a target date and time to initialize countdown sequence
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
