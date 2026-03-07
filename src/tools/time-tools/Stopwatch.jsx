import { useState, useEffect, useRef } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';
import { FiPlay, FiPause, FiRefreshCw, FiFlag } from 'react-icons/fi';

export default function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const startRef = useRef(null);
  const ref = useRef(null);

  useEffect(() => {
    if (running) {
      startRef.current = Date.now() - elapsed;
      ref.current = setInterval(() => setElapsed(Date.now() - startRef.current), 50);
    }
    return () => clearInterval(ref.current);
  }, [running]);

  const toggle = () => setRunning(r => !r);
  const reset = () => { setRunning(false); setElapsed(0); setLaps([]); };
  const lap  = () => setLaps(prev => [...prev, elapsed]);

  const f = (ms) => {
    const m = Math.floor(ms/60000), s = Math.floor((ms%60000)/1000), cs = Math.floor((ms%1000)/10);
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(cs).padStart(2,'0')}`;
  };

  return (
    <ToolLayout toolId="stopwatch">
      <div className="flex-1 flex items-center justify-center p-8 max-w-4xl mx-auto w-full">
        <div className="w-full text-center">
          <div className="bg-white dark:bg-zinc-900/40 rounded-[2.5rem] p-16 border border-gray-100 dark:border-[#ffffff10] mb-10 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center transition-colors" style={{ boxShadow: '0 30px 60px rgba(0,0,0,0.08)' }}>
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <FiFlag size={120} className="text-[#1a1a1a] dark:text-white"/>
            </div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Precision Stopwatch</p>
            <p className="text-9xl font-black tabular-nums tracking-tighter text-[#1a1a1a] dark:text-white leading-none">{f(elapsed)}</p>
          </div>

          <div className="flex items-center justify-center gap-6 mb-12">
            <button onClick={toggle} 
              className={`flex items-center gap-3 px-12 py-5 rounded-2xl text-white font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 ${running ? 'bg-red-600 hover:bg-red-700' : 'bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] hover:bg-gray-900 dark:hover:bg-gray-200'}`}>
              {running ? <FiPause size={20}/> : <FiPlay size={20}/>} 
              <span>{running ? 'Halt' : 'Execute'}</span>
            </button>
            
            {running && (
              <button onClick={lap} className="p-5 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-[#ffffff10] text-[#1a1a1a] dark:text-white hover:border-[#1a1a1a] dark:hover:border-white transition-all shadow-sm">
                <FiFlag size={24} />
              </button>
            )}
            
            {!running && elapsed > 0 && (
              <button onClick={reset} className="p-5 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-[#ffffff10] text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:border-red-600 transition-all shadow-sm group">
                <FiRefreshCw size={24} className="group-active:rotate-180 transition-transform duration-500" />
              </button>
            )}
          </div>

          {laps.length > 0 && (
            <div className="bg-white dark:bg-zinc-900/40 rounded-3xl border border-gray-100 dark:border-[#ffffff10] shadow-xl overflow-hidden max-w-lg mx-auto max-h-72 overflow-y-auto divide-y divide-gray-50 dark:divide-[#ffffff05]">
              <div className="px-6 py-3 bg-gray-50 dark:bg-white/5 flex justify-between sticky top-0">
                <span className="text-gray-400 text-[8px] font-black uppercase tracking-widest">Mark ID</span>
                <span className="text-gray-400 text-[8px] font-black uppercase tracking-widest">Temporal Point</span>
              </div>
              {laps.map((l, i) => (
                <div key={i} className="flex justify-between px-8 py-5 hover:bg-[#1a1a1a]/30 transition-colors group">
                  <span className="text-gray-400 text-xs font-black uppercase tracking-widest">Marking #{String(i+1).padStart(2,'0')}</span>
                  <span className="text-[#1a1a1a] dark:text-white text-lg font-black tabular-nums group-hover:scale-105 transition-transform">{f(l)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
