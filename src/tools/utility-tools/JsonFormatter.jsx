import { useState } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const format = () => { try { setOutput(JSON.stringify(JSON.parse(input),null,2)); setError(''); } catch(e){ setError(e.message); } };
  const minify = () => { try { setOutput(JSON.stringify(JSON.parse(input))); setError(''); } catch(e){ setError(e.message); } };
  const sample = () => setInput('{"name":"YUKT","version":"1.0","tools":37,"premium":false,"categories":["calculators","converters","text-tools"]}');

  return (
    <ToolLayout toolId="json-formatter">
      <div className="flex-1 flex flex-col p-8 max-w-5xl mx-auto w-full">
        <h2 className="text-[#1a1a1a] dark:text-white text-3xl font-black mb-10 uppercase tracking-tight text-center">JSON Structural Reformer</h2>
        <div className="flex gap-3 mb-8 justify-center flex-wrap">
          {[
            ['Format', format, 'bg-[#1a1a1a] text-white dark:bg-white dark:text-[#1a1a1a]'],
            ['Minify', minify, 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-white'],
            ['Sample', sample, 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-white']
          ].map(([l, fn, cls]) => (
            <button key={l} onClick={fn} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm ${cls}`}>{l}</button>
          ))}
          {output && !error && (
            <button onClick={() => navigator.clipboard.writeText(output)} 
              className="px-6 py-2.5 rounded-xl bg-green-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-lg active:scale-95">
              Copy Output
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-[400px]">
          <div className="flex flex-col">
            <label className="text-gray-400 text-[8px] font-black uppercase tracking-widest ml-1 mb-2">Input Source</label>
            <textarea value={input} onChange={e=>{setInput(e.target.value);setOutput('');setError('');}} placeholder='{"key":"value"}' 
              className="w-full h-full p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-[#ffffff10] text-[#1a1a1a] dark:text-white text-xs font-mono placeholder-gray-300 focus:ring-2 focus:ring-[#1a1a1a]/10 dark:focus:ring-white/10 outline-none transition-all resize-none shadow-inner"/>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-400 text-[8px] font-black uppercase tracking-widest ml-1 mb-2">{error?'Synthesis Error':'Output Specification'}</label>
            {error
              ?<div className="w-full h-full rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 p-6 text-red-500 dark:text-red-400 text-xs font-mono overflow-auto shadow-inner">{error}</div>
              :<textarea value={output} readOnly placeholder="Analytically formatted JSON will manifest here..." 
                  className="w-full h-full p-6 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a]/50 border border-gray-100 dark:border-[#ffffff10] text-[#1a1a1a] dark:text-white text-xs font-mono resize-none shadow-inner"/>}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
