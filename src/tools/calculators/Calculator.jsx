import { useState } from 'react';
import { useTools } from '../../context/ToolContext';
import ToolLayout from '../../components/layouts/ToolLayout';

const BUTTONS = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [wait, setWait] = useState(false);
  const { addHistory } = useTools();

  const calc = (a, b, o) => ({ '+': a + b, '−': a - b, '×': a * b, '÷': b !== 0 ? a / b : 'Err' }[o] ?? b);

  const press = (btn) => {
    if (btn === 'C') { setDisplay('0'); setPrev(null); setOp(null); setWait(false); return; }
    if (btn === '±') { setDisplay(d => String(+d * -1)); return; }
    if (btn === '%') { setDisplay(d => String(+d / 100)); return; }
    if (['+', '−', '×', '÷'].includes(btn)) { setPrev(+display); setOp(btn); setWait(true); return; }
    if (btn === '=') {
      if (op && prev !== null) {
        const r = calc(prev, +display, op);
        addHistory({ toolName: 'Calculator', description: `${prev} ${op} ${display} = ${r}` });
        setDisplay(String(r)); setPrev(null); setOp(null); setWait(false);
      }
      return;
    }
    if (btn === '.') { setDisplay(d => d.includes('.') ? d : d + '.'); return; }
    setWait(false);
    setDisplay(d => wait || d === '0' ? btn : d + btn);
  };

  return (
    <ToolLayout toolId="calculator">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-80">
          {/* Display */}
          <div className="bg-gray-50 dark:bg-black/30 rounded-2xl p-5 mb-4 border border-gray-200 dark:border-white/10 transition-colors">
            {op && <div className="text-gray-400 text-xs font-bold mb-1 text-right">{prev} {op}</div>}
            <div className="text-[#1a1a1a] dark:text-white text-5xl font-black text-right truncate tracking-tight tabular-nums">
              {display}
            </div>
          </div>

          {/* Button grid */}
          <div className="space-y-2.5">
            {BUTTONS.map((row, ri) => (
              <div key={ri} className={`grid gap-2.5 ${row.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                {row.map(btn => {
                  const isOp = ['+', '−', '×', '÷'].includes(btn);
                  const isClear = btn === 'C';
                  const isEq = btn === '=';
                  const isWide = btn === '0' && row.length === 3;
                  return (
                    <button
                      key={btn}
                      onClick={() => press(btn)}
                      className={`
                        py-5 rounded-xl font-black text-lg transition-all active:scale-90 select-none
                        ${isWide ? 'col-span-2' : ''}
                        ${isEq
                          ? 'bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] shadow-lg hover:opacity-90'
                          : isOp
                            ? 'bg-gray-200 dark:bg-white/15 text-[#1a1a1a] dark:text-white hover:bg-gray-300 dark:hover:bg-white/25'
                            : isClear
                              ? 'bg-red-50 dark:bg-red-500/15 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/25 border border-red-100 dark:border-red-500/20'
                              : 'bg-white dark:bg-white/8 text-[#1a1a1a] dark:text-white border border-gray-100 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/30 shadow-sm'
                        }
                      `}>
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
