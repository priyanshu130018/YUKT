import { useState } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';

export default function PercentageCalculator() {
  const [a1,setA1]=useState(''); const [b1,setB1]=useState(''); const [r1,setR1]=useState('');
  const [a2,setA2]=useState(''); const [b2,setB2]=useState(''); const [r2,setR2]=useState('');
  const [a3,setA3]=useState(''); const [b3,setB3]=useState(''); const [r3,setR3]=useState('');

  const inp=(v,s,ph)=>(
    <input type="number" value={v} onChange={e=>s(e.target.value)} placeholder={ph}
      className="w-24 px-3 py-2 rounded-xl glass border border-white/10 text-white text-sm text-center"/>
  );

  return (
    <ToolLayout toolId="percentage-calculator">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-lg space-y-4">
          <h2 className="text-white text-2xl font-bold text-center mb-6">Percentage Calculator</h2>
          {[
            {label:'What is X% of Y?',fields:<>{inp(a1,setA1,'X%')}<span className="text-gray-400 mx-1">% of</span>{inp(b1,setB1,'Y')}</>,
             btn:()=>setR1(isNaN(r=parseFloat(a1)/100*parseFloat(b1))?'':r.toFixed(2)),result:r1},
            {label:'X is what % of Y?',fields:<>{inp(a2,setA2,'X')}<span className="text-gray-400 mx-1">is what % of</span>{inp(b2,setB2,'Y')}</>,
             btn:()=>setR2(isNaN(r=parseFloat(a2)/parseFloat(b2)*100)?'':r.toFixed(2)+'%'),result:r2},
            {label:'X changed by Y%',fields:<>{inp(a3,setA3,'X')}<span className="text-gray-400 mx-1">by</span>{inp(b3,setB3,'Y%')}<span className="text-gray-400 mx-1">%</span></>,
             btn:()=>setR3(isNaN(r=parseFloat(a3)*(1+parseFloat(b3)/100))?'':r.toFixed(2)),result:r3},
          ].map(row=>(
            <div key={row.label} className="glass rounded-2xl p-5 border border-white/5">
              <h3 className="text-white font-semibold text-sm mb-4">{row.label}</h3>
              <div className="flex flex-wrap items-center gap-2 mb-3">{row.fields}</div>
              <div className="flex gap-3">
                <button onClick={row.btn} className="px-4 py-2 rounded-xl text-white text-sm font-medium" style={{background:'#8B5CF6'}}>Calculate</button>
                {row.result && <div className="flex items-center px-4 py-2 rounded-xl glass border border-gray-800/30 text-gray-800 font-bold text-sm">= {row.result}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
let r;
