import { useState, useEffect } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';
import { useTools } from '../../context/ToolContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiList, FiRotateCcw, FiTrash2 } from 'react-icons/fi';

export default function ScientificCalculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');
  const [isRad, setIsRad] = useState(true);
  const [history, setHistory] = useState([]);
  const { addHistory } = useTools();

  const handlePress = (val) => {
    if (val === 'C') {
      setExpression('');
      setResult('0');
      return;
    }
    if (val === 'DEL') {
      setExpression(prev => prev.slice(0, -1));
      return;
    }
    if (val === '=') {
      calculate();
      return;
    }
    setExpression(prev => prev + val);
  };

  const calculate = () => {
    if (!expression) return;
    try {
      let expr = expression
        .replace(/X/g, '*')
        .replace(/\//g, '/')
        .replace(/\^/g, '**')
        .replace(/PI/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/-/g, '-');

      const trigFunctions = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan'];
      trigFunctions.forEach(func => {
        const regex = new RegExp(`${func}\\(`, 'g');
        if (isRad) {
          expr = expr.replace(regex, `Math.${func}(`);
        } else {
          expr = expr.replace(regex, `Math.${func}((Math.PI/180)*`);
        }
      });

      expr = expr.replace(/log\(/g, 'Math.log10(')
                 .replace(/ln\(/g, 'Math.log(')
                 .replace(/sqrt\(/g, 'Math.sqrt(')
                 .replace(/abs\(/g, 'Math.abs(');

      if (expr.includes('!')) {
        expr = expr.replace(/(\d+)!/g, (_, n) => {
            let f = 1;
            for (let i = 1; i <= parseInt(n); i++) f *= i;
            return f;
        });
      }

      const openCount = (expr.match(/\(/g) || []).length;
      const closeCount = (expr.match(/\)/g) || []).length;
      if (openCount > closeCount) expr += ')'.repeat(openCount - closeCount);

      const computed = Function('"use strict";return (' + expr + ')')();
      const finalResult = Number.isInteger(computed) ? computed : parseFloat(computed.toFixed(8));
      
      const resStr = String(finalResult);
      setResult(resStr);
      setHistory(prev => [{ exp: expression, res: resStr }, ...prev].slice(0, 10));
      addHistory({
        toolName: 'Scientific Calculator',
        description: `Solved: ${expression} = ${resStr}`
      });
    } catch (err) {
      setResult('Error');
    }
  };

  const buttons = [
    { label: isRad ? 'RAD' : 'DEG', action: () => setIsRad(!isRad), type: 'mode' },
    { label: '!', action: () => handlePress('!'), type: 'func' },
    { label: '(', action: () => handlePress('('), type: 'func' },
    { label: ')', action: () => handlePress(')'), type: 'func' },
    { label: '%', action: () => handlePress('%'), type: 'func' },
    { label: 'AC', action: () => handlePress('C'), type: 'clear' },
    
    { label: 'sin', action: () => handlePress('sin('), type: 'func' },
    { label: 'ln', action: () => handlePress('ln('), type: 'func' },
    { label: '7', action: () => handlePress('7'), type: 'num' },
    { label: '8', action: () => handlePress('8'), type: 'num' },
    { label: '9', action: () => handlePress('9'), type: 'num' },
    { label: '/', action: () => handlePress('/'), type: 'op' },

    { label: 'cos', action: () => handlePress('cos('), type: 'func' },
    { label: 'log', action: () => handlePress('log('), type: 'func' },
    { label: '4', action: () => handlePress('4'), type: 'num' },
    { label: '5', action: () => handlePress('5'), type: 'num' },
    { label: '6', action: () => handlePress('6'), type: 'num' },
    { label: 'X', action: () => handlePress('X'), type: 'op' },

    { label: 'tan', action: () => handlePress('tan('), type: 'func' },
    { label: 'SQRT', action: () => handlePress('sqrt('), type: 'func' },
    { label: '1', action: () => handlePress('1'), type: 'num' },
    { label: '2', action: () => handlePress('2'), type: 'num' },
    { label: '3', action: () => handlePress('3'), type: 'num' },
    { label: '-', action: () => handlePress('-'), type: 'op' },

    { label: 'PI', action: () => handlePress('PI'), type: 'func' },
    { label: '^', action: () => handlePress('^'), type: 'func' },
    { label: '0', action: () => handlePress('0'), type: 'num' },
    { label: '.', action: () => handlePress('.'), type: 'num' },
    { label: '=', action: () => calculate(), type: 'equal' },
    { label: '+', action: () => handlePress('+'), type: 'op' },

    { label: 'e', action: () => handlePress('e'), type: 'func' },
    { label: 'abs', action: () => handlePress('abs('), type: 'func' },
    { label: 'DEL', action: () => handlePress('DEL'), type: 'op', colSpan: 2 },
  ];

  return (
    <ToolLayout toolId="scientific-calculator">
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 overflow-hidden">
        <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          <div className="flex-1 flex flex-col space-y-6">
            <h2 className="text-[#1a1a1a] dark:text-white text-3xl font-black uppercase tracking-tight">Scientific Calculator</h2>
            <div className="bg-white dark:bg-zinc-900/40 rounded-[2.5rem] p-8 lg:p-10 border border-gray-100 dark:border-[#ffffff10] shadow-2xl space-y-8 flex-1 flex flex-col">
              <div className="bg-gray-50/50 dark:bg-black/20 rounded-3xl p-8 border border-[#1a1a1a]/5 dark:border-white/5 flex flex-col items-end justify-center min-h-[160px] relative transition-all overflow-hidden font-mono">
                <div className="text-gray-400 dark:text-gray-500 text-sm mb-2">{expression || '0'}</div>
                <div className="text-[#1a1a1a] dark:text-white font-black text-5xl md:text-6xl tracking-tighter truncate leading-none">{result}</div>
              </div>
              <div className="grid grid-cols-6 gap-3">
                {buttons.map((btn, idx) => (
                  <button key={idx} onClick={btn.action} style={btn.colSpan ? { gridColumn: `span ${btn.colSpan}` } : {}}
                    className={`h-14 rounded-2xl font-black text-[11px] uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center
                      ${btn.type === 'mode' ? 'bg-zinc-100 dark:bg-white/10 text-[#1a1a1a] dark:text-white border border-gray-200 dark:border-white/20' : ''}
                      ${btn.type === 'func' ? 'bg-gray-50 dark:bg-zinc-800/40 text-[#1a1a1a] dark:text-white border border-transparent hover:border-[#1a1a1a]/10 dark:hover:border-white/10' : ''}
                      ${btn.type === 'num' ? 'bg-white dark:bg-zinc-900/40 text-[#1a1a1a] dark:text-white border border-gray-100 dark:border-white/5 hover:shadow-lg' : ''}
                      ${btn.type === 'op' ? 'bg-[#1a1a1a]/5 dark:bg-white/5 text-[#1a1a1a] dark:text-white font-black' : ''}
                      ${btn.type === 'clear' ? 'bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400' : ''}
                      ${btn.type === 'equal' ? 'bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] shadow-xl hover:scale-105' : ''}
                    `}>
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-80 flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[#1a1a1a] dark:text-white text-xs font-black uppercase tracking-[0.2em]">Tape Ledger</h3>
            </div>
            <div className="bg-white dark:bg-zinc-900/40 rounded-[2.5rem] p-6 lg:p-8 border border-gray-100 dark:border-[#ffffff10] shadow-2xl flex-1 flex flex-col gap-6 overflow-hidden">
                <div className="flex-1 space-y-4 overflow-y-auto">
                    {history.map((item, i) => (
                        <div key={i} className="text-right p-4 rounded-2xl bg-gray-50/50 dark:bg-black/20">
                            <div className="text-[10px] text-gray-400 font-mono truncate">{item.exp}</div>
                            <div className="text-[#1a1a1a] dark:text-white font-black font-mono">= {item.res}</div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
