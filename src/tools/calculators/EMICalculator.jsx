import { useState } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';

export default function EMICalculator() {
  const [P, setP] = useState('');
  const [r, setR] = useState('');
  const [n, setN] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const p = parseFloat(P), rate = parseFloat(r) / 12 / 100, months = parseFloat(n) * 12;
    if (!p || !rate || !months) return;
    const emi = (p * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const total = emi * months;
    setResult({ emi: emi.toFixed(2), total: total.toFixed(2), interest: (total - p).toFixed(2), interestPct: (((total - p) / p) * 100).toFixed(1) });
  };

  const fmt = v => parseFloat(v).toLocaleString('en-IN', { minimumFractionDigits: 2 });

  const fields = [
    { label: 'Loan Amount', state: P, setter: setP, placeholder: 'e.g. 500000', prefix: '₹' },
    { label: 'Annual Interest Rate', state: r, setter: setR, placeholder: 'e.g. 8.5', suffix: '%' },
    { label: 'Loan Tenure', state: n, setter: setN, placeholder: 'e.g. 5', suffix: 'yrs' },
  ];

  return (
    <ToolLayout toolId="emi-calculator">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-5">
          {/* Inputs */}
          {fields.map(({ label, state, setter, placeholder, prefix, suffix }) => (
            <div key={label} className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-white/40 ml-1">{label}</label>
              <div className="relative">
                {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/40 font-black text-sm">{prefix}</span>}
                <input
                  type="number" value={state}
                  onChange={e => { setter(e.target.value); setResult(null); }}
                  placeholder={placeholder}
                  className={`w-full py-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[#1a1a1a] dark:text-white font-semibold text-sm placeholder-gray-300 dark:placeholder-white/20 outline-none focus:border-[#1a1a1a] dark:focus:border-white/40 transition-all ${prefix ? 'pl-8 pr-4' : suffix ? 'pl-4 pr-10' : 'px-4'}`}
                />
                {suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/40 font-black text-sm">{suffix}</span>}
              </div>
            </div>
          ))}

          <button onClick={calculate}
            className="w-full py-4 rounded-xl bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] font-black uppercase tracking-widest text-sm hover:opacity-90 active:scale-95 transition-all shadow-lg">
            Calculate EMI
          </button>

          {result && (
            <div className="space-y-3">
              {/* Primary result */}
              <div className="bg-[#1a1a1a] dark:bg-white rounded-2xl p-6 text-center shadow-xl">
                <p className="text-white/50 dark:text-[#1a1a1a]/50 text-[10px] font-black uppercase tracking-widest mb-2">Monthly EMI</p>
                <p className="text-white dark:text-[#1a1a1a] text-4xl font-black">₹{fmt(result.emi)}</p>
              </div>
              {/* Breakdown */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white dark:bg-white/5 rounded-xl p-4 border border-gray-100 dark:border-white/10 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-white/40 mb-1">Total Amount</p>
                  <p className="text-[#1a1a1a] dark:text-white font-black text-lg">₹{fmt(result.total)}</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-500/10 rounded-xl p-4 border border-orange-100 dark:border-orange-500/20 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-1">Interest Paid</p>
                  <p className="text-orange-500 dark:text-orange-400 font-black text-lg">₹{fmt(result.interest)}</p>
                  <p className="text-orange-400/60 text-[9px] font-bold">{result.interestPct}% of principal</p>
                </div>
              </div>
              {/* Progress bar: principal vs interest */}
              <div className="bg-white dark:bg-white/5 rounded-xl p-4 border border-gray-100 dark:border-white/10">
                <div className="flex justify-between mb-2 text-[9px] font-black uppercase tracking-widest text-gray-400">
                  <span>Principal</span><span>Interest</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden flex">
                  <div className="h-full bg-[#1a1a1a] dark:bg-white rounded-full transition-all"
                    style={{ width: `${(parseFloat(P) / parseFloat(result.total)) * 100}%` }} />
                  <div className="h-full bg-orange-400 rounded-full flex-1" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
