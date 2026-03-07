import { useState, useEffect } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';
import { useTools } from '../../context/ToolContext';

export default function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  const pad = (n) => String(n).padStart(2, '0');
  const h = time.getHours(), m = time.getMinutes(), s = time.getSeconds();
  const h12 = h % 12 || 12, ampm = h >= 12 ? 'PM' : 'AM';

  const zones = [
    { name: 'New York', tz: 'America/New_York' }, { name: 'London', tz: 'Europe/London' },
    { name: 'Dubai', tz: 'Asia/Dubai' }, { name: 'Tokyo', tz: 'Asia/Tokyo' }, { name: 'Sydney', tz: 'Australia/Sydney' },
  ];

  return (
    <ToolLayout toolId="clock">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="bg-white dark:bg-white/5 rounded-3xl px-16 py-12 border border-gray-100 dark:border-[#ffffff10] mb-12 text-center shadow-xl transition-colors" style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
          <div className="text-8xl md:text-9xl font-black tracking-tighter tabular-nums text-[#1a1a1a] dark:text-white">
            {pad(h12)}:{pad(m)}:{pad(s)}
          </div>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="px-3 py-1 bg-[#1a1a1a] dark:bg-white dark:text-[#1a1a1a] text-white text-xs font-black rounded uppercase tracking-widest">{ampm}</div>
            <div className="text-gray-400 text-xs font-bold uppercase tracking-widest">{time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-4xl">
          {zones.map(z => (
            <div key={z.name} className="bg-white dark:bg-white/5 rounded-2xl p-5 border border-gray-50 dark:border-[#ffffff10] text-center shadow-sm hover:border-[#1a1a1a]/20 dark:hover:border-white/40 transition-all">
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">{z.name}</p>
              <p className="text-[#1a1a1a] dark:text-white font-black text-lg tabular-nums">{new Date().toLocaleTimeString('en-US', { timeZone: z.tz, hour: '2-digit', minute: '2-digit', hour12: true })}</p>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
