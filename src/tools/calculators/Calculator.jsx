import { useState } from 'react';
import { useTools } from '../../context/ToolContext';
import ToolLayout from '../../components/layouts/ToolLayout';

const BUTTONS = [
  ['C','±','%','÷'],['7','8','9','×'],['4','5','6','−'],['1','2','3','+'],['0','.','='],
];

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [wait, setWait] = useState(false);
  const { addHistory } = useTools();

  const calc = (a, b, o) => ({ '+':a+b,'−':a-b,'×':a*b,'÷':b!==0?a/b:'Err' }[o] ?? b);
  
  const press = (btn) => {
    if (btn==='C') { setDisplay('0'); setPrev(null); setOp(null); setWait(false); return; }
    if (btn==='±') { setDisplay(d=>String(+d*-1)); return; }
    if (btn==='%') { setDisplay(d=>String(+d/100)); return; }
    if (['+','−','×','÷'].includes(btn)) { setPrev(+display); setOp(btn); setWait(true); return; }
    if (btn==='=') {
      if (op && prev!==null) { 
        const r = calc(prev, +display, op); 
        const resultString = String(r);
        
        // Add to history
        addHistory({
          toolName: 'Basic Calculator',
          description: `Performed calculation: ${prev} ${op} ${display} = ${resultString}`
        });

        setDisplay(resultString); 
        setPrev(null); 
        setOp(null); 
        setWait(false); 
      }
      return;
    }
    if (btn==='.') { setDisplay(d=>d.includes('.')?d:d+'.'); return; }
    setWait(false);
    setDisplay(d=>wait||d==='0'?btn:d+btn);
  };

  return (
    <ToolLayout toolId="calculator">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-72">
          <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200 text-right shadow-md dark:bg-[#0a0a0a] dark:border-[#ffffff10]">
            {op && <div className="text-gray-400 text-sm mb-1 font-bold">{prev} {op}</div>}
            <div className="text-black text-4xl font-black truncate dark:text-white">{display}</div>
          </div>
          <div className="space-y-3">
            {BUTTONS.map((row,ri) => (
              <div key={ri} className={`grid gap-3 ${row.length===3?'grid-cols-3':'grid-cols-4'}`}>
                {row.map(btn => {
                  const isOperator = ['+','−','×','÷'].includes(btn);
                  const isClear = btn === 'C';
                  const isEquals = btn === '=';
                  
                  return (
                    <button 
                      key={btn} 
                      onClick={()=>press(btn)}
                      className={`
                        py-4 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-sm
                        ${btn==='0'&&row.length===3?'col-span-2':''}
                        ${isEquals 
                          ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white' 
                          : isOperator 
                            ? 'bg-gray-100 text-black border-gray-200 dark:bg-white/10 dark:text-white dark:border-[#ffffff10]' 
                            : isClear 
                              ? 'bg-red-50 text-red-500 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20' 
                              : 'bg-white text-black border-gray-200 dark:bg-[#0a0a0a] dark:text-white dark:border-[#ffffff10]'
                        }
                        border
                      `}
                    >
                      {btn}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
