import { useState } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';
import { FiRefreshCw } from 'react-icons/fi';

const RATES = { USD:1, EUR:0.92, GBP:0.79, INR:83.12, JPY:149.8, CAD:1.36, AUD:1.55, SGD:1.34, AED:3.67, CHF:0.89, CNY:7.24, MXN:17.2, BRL:4.97 };
const SYMBOLS = { USD:'$',EUR:'€',GBP:'£',INR:'₹',JPY:'¥',CAD:'C$',AUD:'A$',SGD:'S$',AED:'د.إ',CHF:'Fr',CNY:'¥',MXN:'$',BRL:'R$' };

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('1');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const result = (parseFloat(amount) / RATES[from] * RATES[to]).toFixed(2);
  const sel = (v, s) => (
    <select value={v} onChange={e=>s(e.target.value)} className="px-3 py-2 rounded-xl border border-white/10 text-white text-sm bg-black dark:bg-zinc-900 focus:outline-none transition-all">
      {Object.keys(RATES).map(c=><option key={c} value={c} className="bg-white text-black dark:bg-[#0a0a0a] dark:text-white">{c}</option>)}
    </select>
  );
  return (
    <ToolLayout toolId="currency-converter">
      <div className="flex-1 flex items-center justify-center p-8 max-w-4xl mx-auto w-full">
        <div className="w-full">
          <h2 className="text-black dark:text-white text-3xl font-black mb-10 uppercase tracking-tight text-center">Currency Exchange Bureau</h2>
          <div className="bg-white dark:bg-zinc-900/40 rounded-[2.5rem] p-12 border border-gray-100 dark:border-[#ffffff10] shadow-2xl space-y-8 transition-colors">
            <div className="space-y-2">
              <label className="text-gray-400 text-[10px] font-black uppercase tracking-widest ml-1">Principal Amount</label>
              <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} 
                className="w-full px-8 py-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-[#ffffff10] text-black dark:text-white text-3xl font-black focus:ring-2 focus:ring-[black]/10 dark:focus:ring-white/10 outline-none transition-all"/>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-full space-y-2">
                <label className="text-gray-400 text-[8px] font-black uppercase tracking-widest ml-1">Source Currency</label>
                {sel(from,setFrom)}
              </div>
              <button 
                onClick={()=>{const tmp=from;setFrom(to);setTo(tmp);}} 
                className="self-end mb-1 p-5 rounded-2xl bg-gray-50 dark:bg-white/5 text-black dark:text-white border border-gray-100 dark:border-[#ffffff10] hover:bg-gray-100 dark:hover:bg-white/10 transition-all shadow-sm active:scale-95 group">
                <FiRefreshCw className="group-active:rotate-180 transition-transform duration-500" size={24}/>
              </button>
              <div className="w-full space-y-2">
                <label className="text-gray-400 text-[8px] font-black uppercase tracking-widest ml-1">Target Currency</label>
                {sel(to,setTo)}
              </div>
            </div>

            {amount && !isNaN(result) && (
              <div className="bg-[black] dark:bg-white rounded-2xl p-12 text-center shadow-xl animate-in zoom-in-95 duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/5 dark:bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"/>
                <p className="text-white/40 dark:text-black/40 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Official Exchange Rate</p>
                <div className="flex flex-col items-center">
                  <p className="text-white dark:text-black text-sm font-bold opacity-60 mb-2">{SYMBOLS[from]}{amount} {from} =</p>
                  <p className="text-white dark:text-black text-5xl font-black tracking-tighter">{SYMBOLS[to]}{result} <span className="text-lg opacity-60 uppercase">{to}</span></p>
                  <p className="text-white/30 dark:text-black/30 text-[8px] font-black uppercase tracking-widest mt-6">Fiscal Reference Only · No Monetary Guarantee</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
