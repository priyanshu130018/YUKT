import { useState } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';

export default function EMICalculator() {
  const [P, setP] = useState(''); const [r, setR] = useState(''); const [n, setN] = useState(''); const [result, setResult] = useState(null);

  const calculate = () => {
    const p=parseFloat(P), rate=parseFloat(r)/12/100, months=parseFloat(n)*12;
    if (!p||!rate||!months) return;
    const emi = (p*rate*Math.pow(1+rate,months))/(Math.pow(1+rate,months)-1);
    const total = emi*months;
    setResult({emi:emi.toFixed(2),total:total.toFixed(2),interest:(total-p).toFixed(2)});
  };

  const fmt = (v) => parseFloat(v).toLocaleString('en-IN',{minimumFractionDigits:2});

  return (
    <ToolLayout toolId="emi-calculator">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <h2 className="text-white text-2xl font-bold mb-8 text-center">EMI Calculator</h2>
          <div className="space-y-4 mb-6">
            {[['Loan Amount (₹)',P,setP,'e.g. 500000'],['Annual Rate (%)',r,setR,'e.g. 8.5'],['Tenure (years)',n,setN,'e.g. 5']].map(([l,v,s,ph])=>(
              <div key={l}><label className="text-gray-400 text-xs mb-1 block">{l}</label>
                <input type="number" value={v} onChange={e=>{s(e.target.value);setResult(null);}} placeholder={ph} className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white text-sm"/>
              </div>
            ))}
          </div>
          <button onClick={calculate} className="w-full py-3 rounded-xl text-white font-semibold mb-6" style={{background:'#8B5CF6'}}>Calculate EMI</button>
          {result && (
            <div className="space-y-3">
              <div className="glass rounded-xl p-5 text-center border border-gray-800/30">
                <p className="text-gray-400 text-xs mb-1">Monthly EMI</p>
                <p className="text-4xl font-black" style={{color:'#8B5CF6'}}>₹{fmt(result.emi)}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[['Total',result.total,'text-white'],['Interest',result.interest,'text-orange-400']].map(([l,v,c])=>(
                  <div key={l} className="glass rounded-xl p-4 text-center border border-white/5">
                    <p className="text-gray-400 text-xs mb-1">{l}</p>
                    <p className={`font-bold ${c}`}>₹{fmt(v)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
