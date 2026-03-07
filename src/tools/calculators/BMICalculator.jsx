import { useState } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';

export default function BMICalculator() {
  const [h, setH] = useState('');
  const [w, setW] = useState('');
  const [unit, setUnit] = useState('metric');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const hv = parseFloat(h), wv = parseFloat(w);
    if (!hv || !wv) return;
    const bmi = unit === 'metric' ? wv / ((hv / 100) ** 2) : (703 * wv) / (hv ** 2);
    const b = Math.round(bmi * 10) / 10;
    const [cat, color, bg] = b < 18.5
      ? ['Underweight', 'text-blue-500', 'bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20']
      : b < 25
        ? ['Normal Weight', 'text-green-500', 'bg-green-50 dark:bg-green-500/10 border-green-100 dark:border-green-500/20']
        : b < 30
          ? ['Overweight', 'text-orange-500', 'bg-orange-50 dark:bg-orange-500/10 border-orange-100 dark:border-orange-500/20']
          : ['Obese', 'text-red-500', 'bg-red-50 dark:bg-red-500/10 border-red-100 dark:border-red-500/20'];
    setResult({ bmi: b, cat, color, bg, pct: Math.min(Math.max((b - 10) / 30 * 100, 2), 98) });
  };

  return (
    <ToolLayout toolId="bmi-calculator">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-5">
          {/* Unit Toggle */}
          <div className="flex gap-1 p-1 bg-gray-100 dark:bg-white/10 rounded-xl">
            {['metric', 'imperial'].map(u => (
              <button key={u} onClick={() => { setUnit(u); setResult(null); }}
                className={`flex-1 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                  unit === u
                    ? 'bg-white dark:bg-white/15 text-[#1a1a1a] dark:text-white shadow-sm'
                    : 'text-gray-400 dark:text-white/40 hover:text-gray-600 dark:hover:text-white/70'
                }`}>
                {u}
              </button>
            ))}
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            {[
              ['Height', h, setH, unit === 'metric' ? 'cm' : 'inches'],
              ['Weight', w, setW, unit === 'metric' ? 'kg' : 'lbs']
            ].map(([label, val, setter, suffix]) => (
              <div key={label} className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-white/40 ml-1">
                  {label} ({suffix})
                </label>
                <input
                  type="number" value={val}
                  onChange={e => { setter(e.target.value); setResult(null); }}
                  placeholder={`e.g. ${label === 'Height' ? (unit === 'metric' ? '170' : '67') : (unit === 'metric' ? '70' : '154')}`}
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[#1a1a1a] dark:text-white font-semibold text-sm placeholder-gray-300 dark:placeholder-white/20 outline-none focus:border-[#1a1a1a] dark:focus:border-white/40 transition-all"
                />
              </div>
            ))}
          </div>

          {/* Calculate Button */}
          <button onClick={calculate}
            className="w-full py-4 rounded-xl bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] font-black uppercase tracking-widest text-sm hover:opacity-90 active:scale-95 transition-all shadow-lg">
            Calculate BMI
          </button>

          {/* Result */}
          {result && (
            <div className={`rounded-2xl p-6 border text-center transition-all ${result.bg}`}>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/40 mb-2">Your BMI</p>
              <p className={`text-6xl font-black mb-1 ${result.color}`}>{result.bmi}</p>
              <p className={`font-black text-sm uppercase tracking-widest mb-5 ${result.color}`}>{result.cat}</p>
              {/* BMI scale bar */}
              <div className="h-2.5 bg-gradient-to-r from-blue-400 via-green-400 via-orange-400 to-red-400 rounded-full relative">
                <div className="absolute top-1/2 w-4 h-4 bg-white dark:bg-[#1a1a1a] border-2 border-white/50 rounded-full shadow-md transition-all"
                  style={{ left: `${result.pct}%`, transform: 'translateX(-50%) translateY(-50%)' }} />
              </div>
              <div className="flex justify-between mt-2">
                {['18.5', '25', '30'].map(v => <span key={v} className="text-[9px] font-bold text-gray-400">{v}</span>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
