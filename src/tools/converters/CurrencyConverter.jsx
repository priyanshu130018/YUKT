import { useState } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';
import { FiRefreshCw } from 'react-icons/fi';

const RATES = {
  USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.12, JPY: 149.8,
  CAD: 1.36, AUD: 1.55, SGD: 1.34, AED: 3.67, CHF: 0.89,
  CNY: 7.24, MXN: 17.2, BRL: 4.97, KRW: 1325, SEK: 10.4,
};
const SYMBOLS = {
  USD: '$', EUR: '€', GBP: '£', INR: '₹', JPY: '¥',
  CAD: 'C$', AUD: 'A$', SGD: 'S$', AED: 'د.إ', CHF: 'Fr',
  CNY: '¥', MXN: '$', BRL: 'R$', KRW: '₩', SEK: 'kr',
};
const CURRENCIES = Object.keys(RATES);

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('1');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');

  const result = !isNaN(parseFloat(amount))
    ? (parseFloat(amount) / RATES[from] * RATES[to]).toFixed(2)
    : '';
  const rate = (RATES[to] / RATES[from]).toFixed(6);

  const swap = () => { setFrom(to); setTo(from); };

  const selectClass = "w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[#1a1a1a] dark:text-white font-bold text-sm outline-none focus:border-[#1a1a1a] dark:focus:border-white/40 transition-all cursor-pointer appearance-none";

  return (
    <ToolLayout toolId="currency-converter">
      <div className="flex-1 flex items-center justify-center p-8 max-w-xl mx-auto w-full">
        <div className="w-full space-y-5">
          {/* Amount input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-white/40 ml-1">Amount</label>
            <input
              type="number" value={amount} onChange={e => setAmount(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[#1a1a1a] dark:text-white text-2xl font-black placeholder-gray-300 dark:placeholder-white/20 outline-none focus:border-[#1a1a1a] dark:focus:border-white/30 transition-all"
              placeholder="0.00"
            />
          </div>

          {/* From / Swap / To */}
          <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-white/40 ml-1">From</label>
              <select value={from} onChange={e => setFrom(e.target.value)} className={selectClass}>
                {CURRENCIES.map(c => <option key={c} value={c}>{c} — {SYMBOLS[c]}</option>)}
              </select>
            </div>

            <button onClick={swap}
              className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-[#1a1a1a] dark:hover:bg-white text-gray-500 dark:text-white hover:text-white dark:hover:text-[#1a1a1a] border border-gray-200 dark:border-white/10 transition-all active:scale-90 flex items-center justify-center"
              title="Swap currencies">
              <FiRefreshCw size={15} />
            </button>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-white/40 ml-1">To</label>
              <select value={to} onChange={e => setTo(e.target.value)} className={selectClass}>
                {CURRENCIES.map(c => <option key={c} value={c}>{c} — {SYMBOLS[c]}</option>)}
              </select>
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className="bg-[#1a1a1a] dark:bg-white rounded-2xl p-8 text-center shadow-xl">
              <p className="text-white/50 dark:text-[#1a1a1a]/50 text-[10px] font-black uppercase tracking-widest mb-3">
                {SYMBOLS[from]}{amount} {from} =
              </p>
              <p className="text-white dark:text-[#1a1a1a] text-5xl font-black tracking-tight mb-1">
                {SYMBOLS[to]}{result}
              </p>
              <p className="text-white dark:text-[#1a1a1a] text-base font-black uppercase tracking-widest opacity-70">{to}</p>
              <div className="mt-4 pt-4 border-t border-white/10 dark:border-[#1a1a1a]/10">
                <p className="text-white/30 dark:text-[#1a1a1a]/30 text-[9px] font-black uppercase tracking-widest">
                  1 {from} = {rate} {to} · Reference rate only
                </p>
              </div>
            </div>
          )}

          {/* Quick conversion grid */}
          {amount && result && (
            <div className="grid grid-cols-3 gap-2">
              {CURRENCIES.filter(c => c !== from && c !== to).slice(0, 6).map(c => (
                <button key={c} onClick={() => setTo(c)}
                  className="p-3 rounded-xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-[#1a1a1a]/30 dark:hover:border-white/30 transition-all text-left">
                  <p className="text-[9px] font-black text-gray-400 dark:text-white/40 uppercase tracking-widest">{c}</p>
                  <p className="text-[#1a1a1a] dark:text-white font-black text-sm">
                    {SYMBOLS[c]}{(parseFloat(amount) / RATES[from] * RATES[c]).toFixed(2)}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
