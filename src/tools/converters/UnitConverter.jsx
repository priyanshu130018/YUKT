import { useState } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';

const UNITS = {
  Length: { m:1, km:0.001, cm:100, mm:1000, mi:0.000621371, yd:1.09361, ft:3.28084, in:39.3701 },
  Weight: { kg:1, g:1000, lb:2.20462, oz:35.274, t:0.001 },
  Volume: { L:1, mL:1000, gal:0.264172, qt:1.05669, pt:2.11338, cup:4.22675 },
  Area: { m2:1, km2:1e-6, cm2:10000, ha:0.0001, acre:0.000247105, ft2:10.7639 },
  Speed: { 'km/h':1, 'mph':0.621371, 'm/s':0.277778, knot:0.539957 },
};

export default function UnitConverter() {
  const [cat, setCat] = useState('Length');
  const [fromU, setFromU] = useState('m'); const [toU, setToU] = useState('km');
  const [val, setVal] = useState('');

  const units = UNITS[cat], keys = Object.keys(units);
  const result = val !== '' && fromU && toU ? (parseFloat(val) / units[fromU] * units[toU]).toPrecision(6) : '';

  const changeCategory = (c) => { setCat(c); const ks=Object.keys(UNITS[c]); setFromU(ks[0]); setToU(ks[1]||ks[0]); setVal(''); };

  return (
    <ToolLayout toolId="unit-converter">
      <div className="flex-1 flex items-center justify-center p-8 max-w-4xl mx-auto w-full">
        <div className="w-full">
          <h2 className="text-black dark:text-white text-3xl font-black mb-10 uppercase tracking-tight text-center">Unit Transformation Engine</h2>
          
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {Object.keys(UNITS).map(c=>(
              <button key={c} onClick={()=>changeCategory(c)} 
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm active:scale-95 ${cat===c ? 'bg-[black] text-white dark:bg-white dark:text-black' : 'bg-white border border-gray-100 text-gray-400 hover:text-black dark:bg-white/5 dark:text-white dark:border-[#ffffff10] hover:border-[black] dark:hover:border-white'}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-zinc-900/40 rounded-3xl p-10 border border-gray-100 dark:border-[#ffffff10] shadow-2xl space-y-8 transition-colors">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {label: 'Source Standard', val: fromU, set: setFromU},
                {label: 'Target Standard', val: toU, set: setToU}
              ].map((item, i)=>(
                <div key={i} className="space-y-2">
                  <label className="text-gray-400 text-[8px] font-black uppercase tracking-widest ml-1">{item.label}</label>
                  <select value={item.val} onChange={e=>item.set(e.target.value)} 
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-[#ffffff10] text-black dark:text-white font-black appearance-none focus:ring-2 focus:ring-[black]/10 dark:focus:ring-white/10 outline-none transition-all cursor-pointer">
                    {keys.map(k=><option key={k} value={k}>{k.toUpperCase()}</option>)}
                  </select>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-gray-400 text-[8px] font-black uppercase tracking-widest ml-1">Input Measure</label>
              <input type="number" value={val} onChange={e=>setVal(e.target.value)} placeholder={`e.g. 100 ${fromU}`} 
                className="w-full px-6 py-5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-[#ffffff10] text-black dark:text-white text-xl font-black placeholder-gray-200 focus:ring-2 focus:ring-[black]/10 dark:focus:ring-white/10 outline-none transition-all"/>
            </div>

            {result && (
              <div className="text-center p-10 bg-[black] dark:bg-white rounded-2xl shadow-xl animate-in zoom-in-95 duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/5 dark:bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"/>
                <p className="text-white/40 dark:text-black/40 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Conversion Result</p>
                <div className="flex flex-col items-center">
                  <p className="text-white dark:text-black text-sm font-bold opacity-60 mb-2">{val} <span className="uppercase">{fromU}</span> =</p>
                  <p className="text-white dark:text-black text-5xl font-black tracking-tighter">{result} <span className="text-lg opacity-60 uppercase">{toU}</span></p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
