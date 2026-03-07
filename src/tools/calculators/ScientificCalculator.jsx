import { useState } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [hist, setHist] = useState([]);

  const press = (val) => {
    if (val==='C') { setDisplay('0'); return; }
    if (val==='=') {
      try {
        const expr = display.replace(/sin\(/g,'Math.sin(').replace(/cos\(/g,'Math.cos(').replace(/tan\(/g,'Math.tan(').replace(/log\(/g,'Math.log10(').replace(/sqrt\(/g,'Math.sqrt(').replace(/×/g,'*').replace(/÷/g,'/').replace(/\^/g,'**').replace(/Math\.PI/g,'Math.PI').replace(/Math\.E/g,'Math.E');
        const r = Function('"use strict";return('+expr+')')();
        setHist(h=>[`${display}=${r}`,...h].slice(0,3));
        setDisplay(String(isFinite(r)?r:'Error'));
      } catch { setDisplay('Error'); }
      return;
    }
    if (val==='⌫') { setDisplay(d=>d.length>1?d.slice(0,-1):'0'); return; }
    setDisplay(d=>d==='0'?val:d+val);
  };

  const layout = [['sin(','cos(','tan(','log(','sqrt('],['7','8','9','÷','⌫'],['4','5','6','×','Math.PI'],['1','2','3','+','Math.E'],['0','.','=','−','C']];

  return (
    <ToolLayout toolId="scientific-calculator">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="glass rounded-2xl p-5 mb-4 border border-gray-800/20 text-right">
            {hist.slice(0,1).map((h,i)=><div key={i} className="text-gray-500 text-xs mb-1">{h}</div>)}
            <div className="text-white text-2xl font-bold break-all">{display}</div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {layout.flat().map(b=>(
              <button key={b} onClick={()=>press(b)}
                className="py-3 rounded-xl text-xs font-semibold transition-all hover:scale-105"
                style={{background:b==='='?'#8B5CF6':'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',color:b==='='?'#fff':b==='C'?'#EF4444':['+','−','×','÷','^'].includes(b)?'#8B5CF6':'#F8FAFC'}}>
                {b==='Math.PI'?'π':b==='Math.E'?'e':b}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
