import { useState, useEffect, useRef } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';
import { FiPlay, FiPause, FiRefreshCw } from 'react-icons/fi';

export default function Timer() {
  const [inputMin, setInputMin] = useState(5);
  const [inputSec, setInputSec] = useState(0);
  const [remaining, setRemaining] = useState(300);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const ref = useRef(null);
  const total = inputMin * 60 + inputSec;

  useEffect(() => {
    if (running && remaining > 0) {
      ref.current = setInterval(() => setRemaining(r => r - 1), 1000);
    } else if (remaining === 0 && running) { setRunning(false); setFinished(true); }
    return () => clearInterval(ref.current);
  }, [running, remaining]);

  const reset = () => { clearInterval(ref.current); setRunning(false); setFinished(false); setRemaining(inputMin*60+inputSec); };
  const toggle = () => { if (finished) return; if (!running && remaining === 0) { setRemaining(total); setFinished(false); } setRunning(r => !r); };
  const pad = (n) => String(n).padStart(2, '0');
  const progress = total > 0 ? remaining/total : 1;
  const C = 2 * Math.PI * 100;

  return (
    <ToolLayout toolId="timer">
      <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-4xl mx-auto w-full">
        {!running && !finished && (
          <div className="flex items-center gap-6 mb-12 animate-in fade-in slide-in-from-top-4">
            {[['Minutes', inputMin, setInputMin, 99, v => setRemaining(+v*60+inputSec)],
              ['Seconds', inputSec, setInputSec, 59, v => setRemaining(inputMin*60+(+v))]].map(([label, val, set, max, extra]) => (
              <div key={label} className="text-center group">
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2 group-hover:text-black dark:text-white transition-colors">{label}</p>
                <input type="number" min="0" max={max} value={val}
                  onChange={e => { set(+e.target.value); extra(e.target.value); }}
                  className="w-24 text-center text-black dark:text-white bg-white dark:bg-white/5 border border-gray-100 dark:border-[#ffffff10] rounded-2xl py-4 text-3xl font-black shadow-sm focus:ring-2 focus:ring-[black]/20 dark:focus:ring-white/10 outline-none transition-all" />
              </div>
            ))}
          </div>
        )}
        
        <div className="relative w-80 h-80 mx-auto mb-12">
          <svg className="w-full h-full -rotate-90 drop-shadow-2xl" viewBox="0 0 220 220">
            <circle cx="110" cy="110" r="100" fill="none" stroke="currentColor" className="text-gray-100 dark:text-white/10" strokeWidth="12" />
            <circle cx="110" cy="110" r="100" fill="none" stroke="currentColor" className="text-black dark:text-white" strokeWidth="12" strokeLinecap="round"
              strokeDasharray={C} strokeDashoffset={C*(1-progress)}
              style={{ transition:'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {finished ? (
              <div className="text-center animate-bounce">
                <p className="text-black dark:text-white text-4xl font-black uppercase tracking-tighter">Done</p>
                <p className="text-gray-400 text-xs font-bold mt-1">Session Ended</p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-black dark:text-white text-6xl font-black tabular-nums tracking-tighter leading-none">{pad(Math.floor(remaining/60))}:{pad(remaining%60)}</p>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-3">Time Remaining</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={toggle} 
            className={`flex items-center gap-3 px-12 py-5 rounded-2xl text-white font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 ${running ? 'bg-red-600 hover:bg-red-700' : 'bg-[black] dark:bg-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-200'}`}>
            {running ? <FiPause size={20}/> : <FiPlay size={20}/>} 
            <span>{running ? 'Halt' : 'Execute'}</span>
          </button>
          
          <button onClick={reset} className="p-5 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-[#ffffff10] text-gray-400 hover:text-black dark:text-white hover:border-[black] dark:hover:border-white transition-all shadow-sm group">
            <FiRefreshCw size={24} className="group-active:rotate-180 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </ToolLayout>
  );
}
