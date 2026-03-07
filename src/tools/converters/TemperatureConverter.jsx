import { useState } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';

export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState('');
  const c = parseFloat(celsius);
  const f = isNaN(c) ? '' : ((c*9/5)+32).toFixed(2);
  const k = isNaN(c) ? '' : (c+273.15).toFixed(2);

  return (
    <ToolLayout toolId="temperature-converter">
      <div className="flex-1 flex items-center justify-center p-8 max-w-4xl mx-auto w-full">
        <div className="w-full">
          <h2 className="text-black dark:text-white text-3xl font-black mb-10 uppercase tracking-tight text-center">Thermal Registry</h2>
          <div className="bg-white dark:bg-zinc-900/40 rounded-[2.5rem] p-12 border border-gray-100 dark:border-[#ffffff10] shadow-2xl space-y-10 transition-colors">
            <div className="space-y-3">
              <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Input Celsius Standard (°C)</label>
              <input type="number" value={celsius} onChange={e=>setCelsius(e.target.value)} placeholder="e.g. 37.0"
                className="w-full px-8 py-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-[#ffffff10] text-black dark:text-white text-3xl font-black placeholder-gray-100 focus:ring-2 focus:ring-[black]/10 dark:focus:ring-white/10 outline-none transition-all"/>
            </div>
            {!isNaN(c) && celsius!=='' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500">
                {[
                  {label: 'Fahrenheit (°F)', val: f, slug: 'United States Standard'},
                  {label: 'Kelvin (K)', val: k, slug: 'Scientific Standard'}
                ].map((item)=>(
                  <div key={item.label} className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-gray-100 dark:border-[#ffffff10] shadow-sm hover:border-[black]/20 dark:hover:border-white/40 transition-all group">
                    <p className="text-gray-400 text-[8px] font-black uppercase tracking-widest mb-1 group-hover:text-black dark:text-white transition-colors">{item.slug}</p>
                    <p className="text-black dark:text-white text-4xl font-black tracking-tighter">{item.val}°</p>
                    <p className="text-gray-400 text-[10px] font-bold mt-1 uppercase tracking-tight">{item.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
