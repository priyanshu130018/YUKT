import { useState } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';

let r; // module-level mutable (original code pattern)

const MODES = [
  {
    label: 'What is X% of Y?',
    hint: 'e.g. 15% of 200 = 30',
    fields: [
      { ph: 'X', suffix: '%' },
      { ph: 'Y' },
    ],
    calc: (a, b) => isNaN(parseFloat(a) / 100 * parseFloat(b)) ? '' : (parseFloat(a) / 100 * parseFloat(b)).toFixed(2),
  },
  {
    label: 'X is what % of Y?',
    hint: 'e.g. 30 out of 200 = 15%',
    fields: [
      { ph: 'X' },
      { ph: 'Y' },
    ],
    calc: (a, b) => isNaN(parseFloat(a) / parseFloat(b) * 100) ? '' : (parseFloat(a) / parseFloat(b) * 100).toFixed(2) + '%',
  },
  {
    label: '% Change from X to Y',
    hint: 'e.g. 100 → 150 = +50%',
    fields: [
      { ph: 'From' },
      { ph: 'To' },
    ],
    calc: (a, b) => isNaN((parseFloat(b) - parseFloat(a)) / parseFloat(a) * 100) ? '' : ((parseFloat(b) - parseFloat(a)) / parseFloat(a) * 100).toFixed(2) + '%',
  },
  {
    label: 'X changed by Y%',
    hint: 'e.g. 200 × 1.15 = 230',
    fields: [
      { ph: 'X' },
      { ph: 'Y', suffix: '%' },
    ],
    calc: (a, b) => isNaN(parseFloat(a) * (1 + parseFloat(b) / 100)) ? '' : (parseFloat(a) * (1 + parseFloat(b) / 100)).toFixed(2),
  },
];

export default function PercentageCalculator() {
  const [vals, setVals] = useState(MODES.map(() => ['', '']));
  const [results, setResults] = useState(MODES.map(() => ''));

  const handleCalc = (i) => {
    const [a, b] = vals[i];
    const res = MODES[i].calc(a, b);
    setResults(prev => prev.map((v, j) => j === i ? res : v));
  };

  return (
    <ToolLayout toolId="percentage-calculator">
      <div className="flex-1 flex flex-col p-8 max-w-3xl mx-auto w-full">
        <div className="grid sm:grid-cols-2 gap-4">
          {MODES.map((mode, i) => (
            <div key={i}
              className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10 hover:border-[#1a1a1a]/20 dark:hover:border-white/20 transition-all">
              <h3 className="text-[#1a1a1a] dark:text-white font-black text-xs uppercase tracking-widest mb-1">{mode.label}</h3>
              <p className="text-gray-400 dark:text-white/30 text-[10px] font-medium mb-4">{mode.hint}</p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {mode.fields.map((f, j) => (
                  <div key={j} className="relative">
                    <input
                      type="number"
                      value={vals[i][j]}
                      onChange={e => setVals(prev => prev.map((row, ri) => ri === i ? row.map((v, ci) => ci === j ? e.target.value : v) : row))}
                      placeholder={f.ph}
                      className={`w-full py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[#1a1a1a] dark:text-white font-bold text-sm placeholder-gray-300 dark:placeholder-white/20 outline-none focus:border-[#1a1a1a] dark:focus:border-white/40 transition-all ${f.suffix ? 'pl-3 pr-7' : 'px-3'}`}
                    />
                    {f.suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/40 text-xs font-black">{f.suffix}</span>}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => handleCalc(i)}
                  className="px-5 py-2 rounded-xl bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] font-black text-xs uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all">
                  Calculate
                </button>
                {results[i] && (
                  <div className="flex-1 px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-[#1a1a1a] dark:text-white font-black text-sm text-center">
                    = {results[i]}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
