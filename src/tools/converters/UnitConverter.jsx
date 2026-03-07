import { useState } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { FiRefreshCw } from 'react-icons/fi';

// All values stored as factor relative to SI base unit
const UNITS = {
  Length: {
    label: 'Length',
    base: 'm',
    units: {
      'm':   { factor: 1,          label: 'Metre' },
      'km':  { factor: 0.001,      label: 'Kilometre' },
      'cm':  { factor: 100,        label: 'Centimetre' },
      'mm':  { factor: 1000,       label: 'Millimetre' },
      'μm':  { factor: 1e6,        label: 'Micrometre' },
      'mi':  { factor: 0.000621371,label: 'Mile' },
      'yd':  { factor: 1.09361,    label: 'Yard' },
      'ft':  { factor: 3.28084,    label: 'Foot' },
      'in':  { factor: 39.3701,    label: 'Inch' },
      'nmi': { factor: 0.000539957,label: 'Nautical Mile' },
      'ly':  { factor: 1.057e-16,  label: 'Light Year' },
    }
  },
  Weight: {
    label: 'Mass / Weight',
    base: 'kg',
    units: {
      'kg':  { factor: 1,          label: 'Kilogram' },
      'g':   { factor: 1000,       label: 'Gram' },
      'mg':  { factor: 1e6,        label: 'Milligram' },
      't':   { factor: 0.001,      label: 'Metric Ton' },
      'lb':  { factor: 2.20462,    label: 'Pound' },
      'oz':  { factor: 35.274,     label: 'Ounce' },
      'st':  { factor: 0.157473,   label: 'Stone' },
      'ton': { factor: 0.00110231, label: 'Short Ton (US)' },
    }
  },
  Volume: {
    label: 'Volume',
    base: 'L',
    units: {
      'L':   { factor: 1,          label: 'Litre' },
      'mL':  { factor: 1000,       label: 'Millilitre' },
      'm³':  { factor: 0.001,      label: 'Cubic Metre' },
      'cm³': { factor: 1000,       label: 'Cubic Centimetre' },
      'gal': { factor: 0.264172,   label: 'US Gallon' },
      'qt':  { factor: 1.05669,    label: 'US Quart' },
      'pt':  { factor: 2.11338,    label: 'US Pint' },
      'fl oz':{ factor: 33.814,    label: 'Fluid Ounce (US)' },
      'cup': { factor: 4.22675,    label: 'Cup (US)' },
      'tbsp':{ factor: 67.628,     label: 'Tablespoon' },
      'tsp': { factor: 202.884,    label: 'Teaspoon' },
    }
  },
  Area: {
    label: 'Area',
    base: 'm²',
    units: {
      'm²':   { factor: 1,         label: 'Square Metre' },
      'km²':  { factor: 1e-6,      label: 'Square Kilometre' },
      'cm²':  { factor: 10000,     label: 'Square Centimetre' },
      'mm²':  { factor: 1e6,       label: 'Square Millimetre' },
      'ha':   { factor: 0.0001,    label: 'Hectare' },
      'acre': { factor: 0.000247105,label: 'Acre' },
      'ft²':  { factor: 10.7639,   label: 'Square Foot' },
      'in²':  { factor: 1550,      label: 'Square Inch' },
      'mi²':  { factor: 3.861e-7,  label: 'Square Mile' },
      'yd²':  { factor: 1.19599,   label: 'Square Yard' },
    }
  },
  Speed: {
    label: 'Speed',
    base: 'm/s',
    units: {
      'm/s':  { factor: 1,         label: 'Metres/Second' },
      'km/h': { factor: 3.6,       label: 'Kilometres/Hour' },
      'mph':  { factor: 2.23694,   label: 'Miles/Hour' },
      'knot': { factor: 1.94384,   label: 'Knot' },
      'ft/s': { factor: 3.28084,   label: 'Feet/Second' },
      'Mach': { factor: 0.00292,   label: 'Mach (sea level)' },
    }
  },
  Pressure: {
    label: 'Pressure',
    base: 'Pa',
    units: {
      'Pa':   { factor: 1,         label: 'Pascal' },
      'kPa':  { factor: 0.001,     label: 'Kilopascal' },
      'MPa':  { factor: 1e-6,      label: 'Megapascal' },
      'bar':  { factor: 1e-5,      label: 'Bar' },
      'atm':  { factor: 9.869e-6,  label: 'Atmosphere' },
      'psi':  { factor: 0.000145038,label: 'PSI' },
      'mmHg': { factor: 0.00750062,label: 'mmHg (Torr)' },
    }
  },
  Energy: {
    label: 'Energy',
    base: 'J',
    units: {
      'J':    { factor: 1,         label: 'Joule' },
      'kJ':   { factor: 0.001,     label: 'Kilojoule' },
      'MJ':   { factor: 1e-6,      label: 'Megajoule' },
      'cal':  { factor: 0.239006,  label: 'Calorie' },
      'kcal': { factor: 0.000239006,label: 'Kilocalorie' },
      'Wh':   { factor: 0.000277778,label: 'Watt-hour' },
      'kWh':  { factor: 2.778e-7,  label: 'Kilowatt-hour' },
      'eV':   { factor: 6.242e18,  label: 'Electron Volt' },
      'BTU':  { factor: 0.000947817,label: 'BTU' },
    }
  },
  Data: {
    label: 'Digital Storage',
    base: 'B',
    units: {
      'B':  { factor: 1,           label: 'Byte' },
      'KB': { factor: 1/1024,      label: 'Kilobyte' },
      'MB': { factor: 1/1048576,   label: 'Megabyte' },
      'GB': { factor: 1/1073741824,label: 'Gigabyte' },
      'TB': { factor: 1/1.0995e12, label: 'Terabyte' },
      'PB': { factor: 1/1.1259e15, label: 'Petabyte' },
      'Kb': { factor: 8/1024,      label: 'Kilobit' },
      'Mb': { factor: 8/1048576,   label: 'Megabit' },
      'Gb': { factor: 8/1073741824,label: 'Gigabit' },
    }
  },
};

const CAT_KEYS = Object.keys(UNITS);

function doConvert(val, fromU, toU, cat) {
  const num = parseFloat(val);
  if (isNaN(num)) return '';
  const units = UNITS[cat].units;
  const inBase = num / units[fromU].factor;
  const result = inBase * units[toU].factor;
  if (Math.abs(result) >= 0.0001 && Math.abs(result) < 1e10) {
    return parseFloat(result.toPrecision(8)).toString();
  }
  return result.toExponential(4);
}

export default function UnitConverter() {
  const [cat, setCat]     = useState('Length');
  const [fromU, setFromU] = useState('m');
  const [toU, setToU]     = useState('km');
  const [val, setVal]     = useState('');

  const unitKeys = Object.keys(UNITS[cat].units);
  const result = doConvert(val, fromU, toU, cat);
  const hasResult = val !== '' && result !== '';

  const changeCategory = (c) => {
    setCat(c);
    const ks = Object.keys(UNITS[c].units);
    setFromU(ks[0]);
    setToU(ks[1] || ks[0]);
    setVal('');
  };

  const swap = () => {
    setFromU(toU);
    setToU(fromU);
    if (result !== '') setVal(result);
  };

  return (
    <ToolLayout toolId="unit-converter">
      <div className="flex-1 flex flex-col p-6 lg:p-10 max-w-5xl mx-auto w-full">
        <h2 className="text-[#1a1a1a] dark:text-white text-2xl font-black mb-6 uppercase tracking-tight text-center">
          Unit Converter
        </h2>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {CAT_KEYS.map(c => (
            <button key={c} onClick={() => changeCategory(c)}
              className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest border transition-all active:scale-95 ${
                cat === c
                  ? 'bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] border-[#1a1a1a] dark:border-white shadow-lg'
                  : 'bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-500 dark:text-white/50 hover:border-gray-300 dark:hover:border-white/30'
              }`}>
              {UNITS[c].label}
            </button>
          ))}
        </div>

        {/* Converter area */}
        <div className="bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 p-6 space-y-6">
          <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end">
            {/* From */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-white/30">From</label>
              <select value={fromU} onChange={e => setFromU(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-[#1a1a1a] dark:text-white font-bold text-sm outline-none appearance-none cursor-pointer focus:border-[#1a1a1a] dark:focus:border-white/40 transition-all">
                {unitKeys.map(k => <option key={k} value={k}>{k} — {UNITS[cat].units[k].label}</option>)}
              </select>
              <input type="number" value={val} onChange={e => setVal(e.target.value)}
                placeholder="Enter value…"
                className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-[#1a1a1a] dark:text-white text-2xl font-black placeholder-gray-200 dark:placeholder-white/10 outline-none focus:border-[#1a1a1a] dark:focus:border-white/30 transition-all" />
            </div>

            {/* Swap */}
            <div className="flex justify-center pb-0.5">
              <button onClick={swap}
                className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 hover:bg-[#1a1a1a] dark:hover:bg-white text-gray-400 dark:text-white hover:text-white dark:hover:text-[#1a1a1a] border border-gray-200 dark:border-white/10 transition-all active:scale-90 flex items-center justify-center"
                title="Swap">
                <FiRefreshCw size={15} />
              </button>
            </div>

            {/* To */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-white/30">To</label>
              <select value={toU} onChange={e => setToU(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-[#1a1a1a] dark:text-white font-bold text-sm outline-none appearance-none cursor-pointer focus:border-[#1a1a1a] dark:focus:border-white/40 transition-all">
                {unitKeys.map(k => <option key={k} value={k}>{k} — {UNITS[cat].units[k].label}</option>)}
              </select>

              <AnimatePresence mode="wait">
                {hasResult ? (
                  <motion.div key="result"
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#1a1a1a] dark:bg-white border border-transparent min-h-[56px] flex items-center gap-2">
                    <span className="text-white dark:text-[#1a1a1a] text-2xl font-black tracking-tight truncate">{result}</span>
                    <span className="text-white/40 dark:text-[#1a1a1a]/40 font-black text-base shrink-0">{toU}</span>
                  </motion.div>
                ) : (
                  <motion.div key="empty"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-white/5 border border-dashed border-gray-200 dark:border-white/10 min-h-[56px] flex items-center justify-center">
                    <span className="text-gray-300 dark:text-white/20 text-xs font-black uppercase tracking-widest">Result</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Full formula display */}
          <AnimatePresence>
            {hasResult && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-3 flex-wrap text-center pt-2 border-t border-gray-200 dark:border-white/10">
                <span className="text-lg font-black text-[#1a1a1a] dark:text-white">{val} <span className="text-gray-400 dark:text-white/40 text-sm">{fromU}</span></span>
                <span className="text-gray-300 dark:text-white/20 font-black">=</span>
                <span className="text-lg font-black text-[#1a1a1a] dark:text-white">{result} <span className="text-gray-400 dark:text-white/40 text-sm">{toU}</span></span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Unit reference table */}
        <div className="mt-6">
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-white/30 mb-3">
            {UNITS[cat].label} — All Units
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {unitKeys.map(k => (
              <button key={k}
                onClick={() => setFromU(k)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  k === fromU
                    ? 'bg-[#1a1a1a] dark:bg-white border-[#1a1a1a] dark:border-white'
                    : 'bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 hover:border-[#1a1a1a]/20 dark:hover:border-white/20'
                }`}>
                <p className={`text-xs font-black ${k === fromU ? 'text-white dark:text-[#1a1a1a]' : 'text-[#1a1a1a] dark:text-white'}`}>{k}</p>
                <p className={`text-[9px] font-medium truncate ${k === fromU ? 'text-white/60 dark:text-[#1a1a1a]/60' : 'text-gray-400 dark:text-white/30'}`}>
                  {UNITS[cat].units[k].label}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
