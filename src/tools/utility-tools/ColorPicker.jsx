import { useState } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';

export default function ColorPicker() {
  const [hex, setHex] = useState('#4F46E5');
  const r = parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
  const h=(v,s,l)=>`hsl(${v},${s}%,${l}%)`;
  const to01 = (x)=>x/255;
  const max=Math.max(r,g,b)/255, min=Math.min(r,g,b)/255, l=(max+min)/2;
  const d=max-min, s=d===0?0:d/(1-Math.abs(2*l-1));
  const hh=max===0?0:max===r/255?60*((g/255-b/255)/d%6):max===g/255?60*((b/255-r/255)/d+2):60*((r/255-g/255)/d+4);
  const hsl = `hsl(${Math.round(hh<0?hh+360:hh)}, ${Math.round(s*100)}%, ${Math.round(l*100)}%)`;
  const rgb = `rgb(${r}, ${g}, ${b})`;

  const copy = (v) => navigator.clipboard.writeText(v);
  const shades = [9,7,5,3,1].map(n=>({ pct:`${n*10}%`, val:`#${[r,g,b].map(c=>Math.round(c*(n*10)/100).toString(16).padStart(2,'0')).join('')}` }));

  return (
    <ToolLayout toolId="color-picker">
      <div className="flex-1 flex items-center justify-center p-8 max-w-4xl mx-auto w-full">
        <div className="w-full">
          <h2 className="text-black dark:text-white text-3xl font-black mb-10 uppercase tracking-tight text-center">Chromatic Analyzer</h2>
          
          <div className="bg-white dark:bg-zinc-900/40 rounded-[2.5rem] p-10 border border-gray-100 dark:border-[#ffffff10] shadow-2xl space-y-10 transition-colors">
            <div className="relative group">
              <div className="w-full h-48 rounded-3xl transition-all shadow-inner border border-gray-100" style={{background:hex}}/>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#0a0a0a]/10 rounded-3xl pointer-events-none">
                <p className="text-white text-[10px] font-black uppercase tracking-[0.4em]">Active Spectrum</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group">
                <input type="color" value={hex} onChange={e=>setHex(e.target.value)} 
                  className="w-20 h-20 rounded-2xl cursor-pointer border-4 border-white dark:border-[#ffffff20] shadow-xl bg-gray-50 dark:bg-zinc-800 hover:scale-105 transition-transform appearance-none"/>
              </div>
              <div className="flex-1 w-full space-y-2">
                <label className="text-gray-400 text-[8px] font-black uppercase tracking-widest ml-1">Hexadecimal Designation</label>
                <input type="text" value={hex} onChange={e=>/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)&&setHex(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-[#ffffff10] text-black dark:text-white text-xl font-black font-mono uppercase focus:ring-2 focus:ring-[black]/10 dark:focus:ring-white/10 outline-none transition-all"/>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[[hex,'HEX'],[rgb,'RGB'],[hsl,'HSL']].map(([v,l])=>(
                <button key={l} onClick={()=>copy(v)} 
                  className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-white/5 border border-gray-100 dark:border-[#ffffff10] rounded-2xl shadow-sm hover:border-[black]/20 dark:hover:border-white/40 hover:shadow-md transition-all active:scale-95">
                  <span className="text-gray-400 text-[8px] font-black uppercase tracking-widest mb-2 group-hover:text-black dark:text-white transition-colors">{l}</span>
                  <span className="text-black dark:text-white text-xs font-black font-mono tracking-tight">{v}</span>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-50 dark:border-[#ffffff10]">
              <p className="text-gray-400 text-[8px] font-black uppercase tracking-[0.3em] mb-4">Shade Gradient Registry</p>
              <div className="flex gap-2">
                {shades.map(s=>(
                  <div key={s.pct} 
                    className="flex-1 h-12 rounded-xl cursor-pointer hover:scale-110 hover:shadow-lg transition-all border border-black/5" 
                    style={{background:s.val}} onClick={()=>setHex(s.val)} title={s.val}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
