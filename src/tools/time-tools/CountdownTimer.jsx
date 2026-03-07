import { useState, useEffect } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';
import { motion } from 'framer-motion';

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
    <div className="bg-white dark:bg-zinc-900/40 rounded-[2rem] p-8 text-center border border-gray-100 dark:border-[#ffffff10] shadow-xl min-w-[140px] flex flex-col items-center justify-center transition-all hover:scale-105 hover:shadow-2xl hover:border-[#1a1a1a]/20 dark:hover:border-white/40">
      <p className="text-6xl font-black tabular-nums text-[#1a1a1a] dark:text-white leading-none">{String(val).padStart(2,'0')}</p>
      <div className="h-0.5 w-8 bg-[#1a1a1a]/10 dark:bg-white/10 my-4 rounded-full"/>
      <p className="text-gray-400 text-[8px] font-black uppercase tracking-[0.2em]">{lbl}</p>
    </div>
  );

  return (
    <ToolLayout toolId="countdown">
      <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-5xl mx-auto w-full">
        <h2 className="text-[#1a1a1a] dark:text-white text-3xl font-black mb-2 uppercase tracking-tight text-center">Event Countdown</h2>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-10 opacity-60">Synchronize to target temporal point</p>
        
          <div className="bg-white dark:bg-zinc-900/40 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-[#ffffff10] shadow-2xl transition-colors flex flex-col lg:flex-row gap-8 lg:gap-16">
            
            {/* Left Column: Configuration */}
            <div className="w-full lg:w-[340px] space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-gray-400 text-[10px] font-black uppercase tracking-widest ml-1">Event Registry Name</label>
                  <input type="text" placeholder="e.g. MISSION COMMENCEMENT" value={label} onChange={e => setLabel(e.target.value)} 
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-[#1a1a1a]/10 dark:focus:border-white/10 text-[#1a1a1a] dark:text-white font-black placeholder-gray-300 dark:placeholder-zinc-600 shadow-sm outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-400 text-[10px] font-black uppercase tracking-widest ml-1">Universal Target Time</label>
                  <input type="datetime-local" value={target} onChange={e => setTarget(e.target.value)} 
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-[#1a1a1a]/10 dark:focus:border-white/10 text-[#1a1a1a] dark:text-white font-black shadow-sm outline-none transition-all" />
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 dark:border-[#ffffff10]">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-2 h-2 rounded-full ${target ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{target ? 'Temporal Link Active' : 'Waiting for Synchrony'}</span>
                </div>
                <p className="text-gray-400 text-[10px] font-medium leading-relaxed">
                  Enter the target temporal coordinate to initialize the countdown sequence. All processing occurs locally within the browser registry.
                </p>
              </div>
            </div>

            {/* Right Column: Dynamic Countdown Output */}
            <div className="flex-1 flex flex-col justify-center min-h-[300px]">
              {label && (
                <div className="mb-8 text-center lg:text-left">
                  <span className="text-gray-400 text-[8px] font-black uppercase tracking-[0.3em] block mb-2">Subject Designation</span>
                  <h3 className="text-[#1a1a1a] dark:text-white text-2xl font-black uppercase tracking-[0.1em]">{label}</h3>
                </div>
              )}

              {target && diff ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                  <Block val={diff.days} lbl="Days" />
                  <Block val={diff.hours} lbl="Hours" />
                  <Block val={diff.mins} lbl="Mins" />
                  <Block val={diff.secs} lbl="Secs" />
                </div>
              ) : target ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#1a1a1a] dark:bg-white rounded-[2.5rem] p-12 py-16 border border-transparent dark:border-[#ffffff10] shadow-2xl text-center"
                >
                  <div className="w-16 h-16 bg-white/10 dark:bg-[#1a1a1a]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white dark:text-[#1a1a1a] text-2xl">🎯</span>
                  </div>
                  <p className="text-white dark:text-[#1a1a1a] text-4xl font-black uppercase tracking-tighter mb-2">Synchronized</p>
                  <p className="text-white/40 dark:text-[#1a1a1a]/40 text-[10px] font-black uppercase tracking-[0.4em]">Target Coordinate Reached</p>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-100 dark:border-[#ffffff05] rounded-[2.5rem] p-12 text-center">
                  <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <span className="text-gray-300 dark:text-zinc-700 text-xl font-black">?</span>
                  </div>
                  <p className="text-gray-300 dark:text-zinc-700 font-black uppercase tracking-[0.2em] text-[10px] italic">
                    Configure Registry coordinates<br/>to begin tracking
                  </p>
                </div>
              )}
            </div>
          </div>
      </div>
    </ToolLayout>
  );
}
