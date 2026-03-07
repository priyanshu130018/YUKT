import { useState } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';

export default function AgeCalculator() {
  const [dob, setDob] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!dob) return;
    const birth = new Date(dob), now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const totalDays = Math.floor((now - birth) / 86400000);
    setResult({ years, months, days, totalDays, totalWeeks: Math.floor(totalDays/7), totalHours: totalDays*24 });
  };

  return (
    <ToolLayout toolId="age-calculator">
      <div className="flex-1 flex items-center justify-center p-8 max-w-4xl mx-auto w-full">
        <div className="w-full">
          <h2 className="text-[#1a1a1a] dark:text-white text-3xl font-black mb-8 uppercase tracking-tight text-center">Age Processor</h2>
          
          <div className="bg-white dark:bg-zinc-900/40 rounded-2xl p-8 border border-gray-100 dark:border-[#ffffff10] shadow-lg flex flex-col sm:flex-row gap-4 mb-10 transition-colors">
            <div className="flex-1 space-y-2">
              <label className="text-gray-400 text-[10px] font-black uppercase tracking-widest ml-1">Date of Birth</label>
              <input type="date" value={dob} max={new Date().toISOString().split('T')[0]} 
                onChange={e => { setDob(e.target.value); setResult(null); }}
                className="w-full px-5 py-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-[#ffffff10] text-[#1a1a1a] dark:text-white font-black focus:ring-2 focus:ring-[#1a1a1a]/10 dark:focus:ring-white/10 outline-none transition-all" />
            </div>
            <button onClick={calculate} className="sm:mt-6 px-10 py-3.5 rounded-xl text-white dark:text-[#1a1a1a] font-black uppercase tracking-widest bg-[#1a1a1a] dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-200 transition-all shadow-lg active:scale-95">Analyze Age</button>
          </div>

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-[#1a1a1a] dark:bg-white rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/5 dark:bg-[#1a1a1a]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"/>
                <p className="text-white dark:text-[#1a1a1a] text-[10px] font-black uppercase tracking-[0.4em] mb-4 opacity-60">Calculated Biological Age</p>
                <div className="text-white dark:text-[#1a1a1a] text-5xl md:text-6xl font-black tracking-tighter flex items-baseline justify-center gap-4">
                  <div className="flex flex-col"><span className="leading-none">{result.years}</span><span className="text-[10px] uppercase tracking-widest opacity-60 mt-2">Years</span></div>
                  <div className="flex flex-col"><span className="leading-none">{result.months}</span><span className="text-[10px] uppercase tracking-widest opacity-60 mt-2">Months</span></div>
                  <div className="flex flex-col"><span className="leading-none">{result.days}</span><span className="text-[10px] uppercase tracking-widest opacity-60 mt-2">Days</span></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  ['Total Lifetime Days', result.totalDays, 'Calendar Count'],
                  ['Total Lifetime Weeks', result.totalWeeks, 'Week Count'],
                  ['Total Lifetime Hours', result.totalHours, 'Hourly Count']
                ].map(([l,v, slug]) => (
                  <div key={l} className="bg-white dark:bg-white/5 rounded-2xl p-6 text-center border border-gray-100 dark:border-[#ffffff10] shadow-sm hover:border-[#1a1a1a]/20 dark:hover:border-white/40 transition-all group">
                    <p className="text-gray-400 text-[8px] font-black uppercase tracking-widest mb-1 group-hover:text-[#1a1a1a] dark:text-white transition-colors">{slug}</p>
                    <p className="text-[#1a1a1a] dark:text-white font-black text-2xl tracking-tighter">{v.toLocaleString()}</p>
                    <p className="text-gray-400 text-[10px] font-bold mt-1 uppercase tracking-tight">{l.split(' ')[2]}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
