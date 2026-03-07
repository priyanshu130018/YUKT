import { useState } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';

export default function BMICalculator() {
  const [h, setH] = useState(''); const [w, setW] = useState(''); const [unit, setUnit] = useState('metric'); const [result, setResult] = useState(null);

  const calculate = () => {
    const hv=parseFloat(h), wv=parseFloat(w);
    if (!hv||!wv) return;
    const bmi = unit==='metric' ? wv/((hv/100)**2) : (703*wv)/(hv**2);
    const b = Math.round(bmi*10)/10;
    const [cat,color] = b<18.5?['Underweight','#3B82F6']:b<25?['Normal','#22C55E']:b<30?['Overweight','#F97316']:['Obese','#EF4444'];
    setResult({bmi:b,cat,color});
  };

  return (
    <ToolLayout toolId="bmi-calculator">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <h2 className="text-white text-2xl font-bold mb-6 text-center">BMI Calculator</h2>
          <div className="flex gap-2 mb-6 p-1 glass rounded-xl">
            {['metric','imperial'].map(u=><button key={u} onClick={()=>{setUnit(u);setResult(null);}} className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize ${unit===u?'bg-gray-800 text-white':'text-gray-400'}`}>{u}</button>)}
          </div>
          <div className="space-y-4 mb-6">
            {[['Height',h,setH,unit==='metric'?'cm':'in'],[' Weight',w,setW,unit==='metric'?'kg':'lbs']].map(([l,v,s,suf])=>(
              <div key={l}><label className="text-gray-400 text-xs mb-1 block">{l} ({suf})</label>
                <input type="number" value={v} onChange={e=>{s(e.target.value);setResult(null);}} className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white text-sm"/>
              </div>
            ))}
          </div>
          <button onClick={calculate} className="w-full py-3 rounded-xl text-white font-semibold mb-6" style={{background:'#8B5CF6'}}>Calculate BMI</button>
          {result && (
            <div className="glass rounded-2xl p-6 text-center border" style={{borderColor:`${result.color}44`,boxShadow:`0 0 30px ${result.color}20`}}>
              <p className="text-gray-400 text-sm mb-1">Your BMI</p>
              <p className="text-6xl font-black mb-1" style={{color:result.color}}>{result.bmi}</p>
              <p className="text-white font-semibold">{result.cat}</p>
              <div className="mt-4 h-3 bg-gradient-to-r from-black via-green-500 via-orange-500 to-red-500 rounded-full relative">
                <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full"
                  style={{left:`${Math.min(Math.max((result.bmi-10)/30*100,2),98)}%`,transform:'translateX(-50%) translateY(-50%)'}}/>
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
