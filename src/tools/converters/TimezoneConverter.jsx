import { useState, useEffect } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';

const ZONES = [
  {city:'New York',tz:'America/New_York'},{city:'London',tz:'Europe/London'},
  {city:'Paris',tz:'Europe/Paris'},{city:'Dubai',tz:'Asia/Dubai'},
  {city:'Mumbai',tz:'Asia/Kolkata'},{city:'Singapore',tz:'Asia/Singapore'},
  {city:'Tokyo',tz:'Asia/Tokyo'},{city:'Sydney',tz:'Australia/Sydney'},
  {city:'Los Angeles',tz:'America/Los_Angeles'},
];

export default function TimezoneConverter() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t=setInterval(()=>setNow(new Date()),1000); return ()=>clearInterval(t); },[]);

  return (
    <ToolLayout toolId="timezone-converter">
      <div className="flex-1 flex items-center justify-center p-8 max-w-4xl mx-auto w-full">
        <div className="w-full">
          <h2 className="text-black dark:text-white text-3xl font-black mb-10 uppercase tracking-tight text-center">Global Temporal Registry</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ZONES.map(z=>{
              const t=now.toLocaleTimeString('en-US',{timeZone:z.tz,hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true});
              const d=now.toLocaleDateString('en-US',{timeZone:z.tz,weekday:'short',month:'short',day:'numeric'});
              return(
                <div key={z.city} className="flex items-center justify-between px-8 py-6 bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-[#ffffff10] shadow-sm hover:border-[black]/20 dark:hover:border-white/40 transition-all group overflow-hidden relative">
                  <div className="absolute inset-y-0 left-0 w-1 bg-[black] dark:bg-white opacity-0 group-hover:opacity-100 transition-opacity"/>
                  <div>
                    <p className="text-black dark:text-white font-black text-sm uppercase tracking-widest mb-1">{z.city}</p>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-tight">{d}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-black dark:text-white text-2xl font-black tabular-nums tracking-tighter group-hover:scale-105 transition-transform">{t.split(' ')[0]}</p>
                    <p className="text-gray-400 text-[8px] font-black uppercase tracking-widest">{t.split(' ')[1]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
