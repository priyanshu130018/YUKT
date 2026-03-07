import { useState } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiRefreshCw } from 'react-icons/fi';

// All temperatures are stored and compared in Kelvin (base)
const SCALES = {
  '°C — Celsius':    { toK: v => v + 273.15,         fromK: k => k - 273.15,          symbol: '°C', tag: 'SI Standard' },
  '°F — Fahrenheit': { toK: v => (v + 459.67) * 5/9, fromK: k => k * 9/5 - 459.67,   symbol: '°F', tag: 'US Standard' },
  'K — Kelvin':      { toK: v => v,                   fromK: k => k,                   symbol: 'K',  tag: 'Absolute' },
  '°R — Rankine':    { toK: v => v * 5/9,             fromK: k => k * 9/5,             symbol: '°R', tag: 'Imperial Abs.' },
  '°De — Delisle':   { toK: v => 373.15 - v * 2/3,   fromK: k => (373.15 - k) * 3/2, symbol: '°De', tag: 'Historical' },
};
const SCALE_KEYS = Object.keys(SCALES);

function convert(val, from, to) {
  const num = parseFloat(val);
  if (isNaN(num)) return '';
  const kelvin = SCALES[from].toK(num);
  const result = SCALES[to].fromK(kelvin);
  return parseFloat(result.toFixed(6)).toString();
}

export default function TemperatureConverter() {
  const [fromScale, setFromScale] = useState(SCALE_KEYS[0]); // Celsius
  const [toScale, setToScale]     = useState(SCALE_KEYS[1]); // Fahrenheit
  const [inputVal, setInputVal]   = useState('');

  const result = convert(inputVal, fromScale, toScale);
  const hasResult = inputVal !== '' && result !== '';

  const swap = () => {
    setFromScale(toScale);
    setToScale(fromScale);
    if (result !== '') setInputVal(result);
  };

  // All conversions from input
  const allResults = SCALE_KEYS.filter(k => k !== fromScale).map(k => ({
    key: k,
    label: k,
    symbol: SCALES[k].symbol,
    tag: SCALES[k].tag,
    val: convert(inputVal, fromScale, k),
  }));

  return (
    <ToolLayout toolId="temperature-converter">
      <div className="flex-1 flex flex-col p-6 lg:p-10 max-w-5xl mx-auto w-full">
        <h2 className="text-[#1a1a1a] dark:text-white text-2xl font-black mb-8 uppercase tracking-tight text-center">
          Temperature Converter
        </h2>

        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-4 items-end mb-8">
          {/* From */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-white/40">From Scale</label>
            <select
              value={fromScale}
              onChange={e => setFromScale(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[#1a1a1a] dark:text-white font-bold text-sm outline-none focus:border-[#1a1a1a] dark:focus:border-white/40 transition-all cursor-pointer appearance-none">
              {SCALE_KEYS.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
            <input
              type="number"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder={`e.g. 100`}
              className="w-full px-5 py-4 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[#1a1a1a] dark:text-white text-3xl font-black placeholder-gray-200 dark:placeholder-white/10 outline-none focus:border-[#1a1a1a] dark:focus:border-white/30 transition-all"
            />
          </div>

          {/* Swap btn */}
          <div className="flex justify-center pb-1">
            <button onClick={swap}
              className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-[#1a1a1a] dark:hover:bg-white text-gray-500 dark:text-white hover:text-white dark:hover:text-[#1a1a1a] border border-gray-200 dark:border-white/10 transition-all active:scale-90 flex items-center justify-center"
              title="Swap scales">
              <FiRefreshCw size={16} />
            </button>
          </div>

          {/* To */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-white/40">To Scale</label>
            <select
              value={toScale}
              onChange={e => setToScale(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[#1a1a1a] dark:text-white font-bold text-sm outline-none focus:border-[#1a1a1a] dark:focus:border-white/40 transition-all cursor-pointer appearance-none">
              {SCALE_KEYS.map(k => <option key={k} value={k}>{k}</option>)}
            </select>

            <AnimatePresence mode="wait">
              {hasResult ? (
                <motion.div key="result"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  className="w-full px-5 py-4 rounded-xl bg-[#1a1a1a] dark:bg-white border border-transparent min-h-[68px] flex items-center">
                  <span className="text-white dark:text-[#1a1a1a] text-3xl font-black tracking-tight">{result}</span>
                  <span className="text-white/40 dark:text-[#1a1a1a]/40 text-lg font-black ml-2">{SCALES[toScale].symbol}</span>
                </motion.div>
              ) : (
                <motion.div key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-dashed border-gray-200 dark:border-white/10 min-h-[68px] flex items-center justify-center">
                  <span className="text-gray-300 dark:text-white/20 text-sm font-black uppercase tracking-widest">Result</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* All conversions table */}
        <AnimatePresence>
          {hasResult && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-white/30 mb-4">
                All Conversions from {inputVal} {SCALES[fromScale].symbol}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {allResults.map(item => (
                  <button key={item.key}
                    onClick={() => { setToScale(item.key); }}
                    className={`p-5 rounded-2xl border text-left transition-all hover:-translate-y-0.5 hover:shadow-md group ${
                      item.key === toScale
                        ? 'bg-[#1a1a1a] dark:bg-white border-[#1a1a1a] dark:border-white'
                        : 'bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 hover:border-[#1a1a1a]/20 dark:hover:border-white/20'
                    }`}>
                    <p className={`text-[9px] font-black uppercase tracking-widest mb-2 ${item.key === toScale ? 'text-white/40 dark:text-[#1a1a1a]/40' : 'text-gray-400 dark:text-white/30'}`}>
                      {item.tag}
                    </p>
                    <p className={`text-2xl font-black tracking-tight mb-1 ${item.key === toScale ? 'text-white dark:text-[#1a1a1a]' : 'text-[#1a1a1a] dark:text-white'}`}>
                      {item.val}
                    </p>
                    <p className={`text-[10px] font-bold ${item.key === toScale ? 'text-white/60 dark:text-[#1a1a1a]/60' : 'text-gray-400 dark:text-white/40'}`}>
                      {item.symbol}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToolLayout>
  );
}
