import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { VolumeSelector } from './components/VolumeSelector';
import { SliderInput } from './components/SliderInput';
import { ResultDisplay } from './components/ResultDisplay';
import { TankVolume, SafetyStatus } from './types';

// Constants
const TANK_CAPACITY_PER_MPA = {
  '1500': 100, // 1500L / 15MPa = 100 L/MPa
  '500': 500 / 15 // ~33.33 L/MPa
};

const THRESHOLD_DANGER = 20;
const THRESHOLD_WARNING = 30;

function App() {
  const [volume, setVolume] = useState<TankVolume>('1500');
  const [pressure, setPressure] = useState<number>(15);
  const [flow, setFlow] = useState<number>(2);

  const { minutes, status } = useMemo(() => {
    if (flow <= 0) return { minutes: 0, status: SafetyStatus.DANGER };

    const capacityPerMPa = TANK_CAPACITY_PER_MPA[volume];
    const remainingVolume = pressure * capacityPerMPa;
    const calcMinutes = Math.floor(remainingVolume / flow);

    let calcStatus = SafetyStatus.SAFE;
    if (calcMinutes < THRESHOLD_DANGER) {
      calcStatus = SafetyStatus.DANGER;
    } else if (calcMinutes <= THRESHOLD_WARNING) {
      calcStatus = SafetyStatus.WARNING;
    }

    return { minutes: calcMinutes, status: calcStatus };
  }, [volume, pressure, flow]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12 font-sans text-gray-800">
      <Header />

      <main className="px-4 -mt-10 relative z-10">
        <section className="max-w-[900px] mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch pt-2">
            {/* Input Section */}
            <div className="lg:col-span-7 space-y-10">
              
              <VolumeSelector selectedVolume={volume} onChange={setVolume} />

              <div className="space-y-8 p-1">
                <SliderInput 
                  label="ボンベ圧力計 (MPa)"
                  value={pressure}
                  min={1}
                  max={15}
                  unit="MPa"
                  accentColor="#0056D2"
                  onChange={setPressure}
                  marks={[1, 5, 10, 15]}
                />

                <SliderInput 
                  label="酸素流量 (L/分)"
                  value={flow}
                  min={1}
                  max={30}
                  unit="L/分"
                  accentColor="#00C2CB"
                  onChange={setFlow}
                  marks={[1, 10, 20, 30]}
                />
              </div>

            </div>

            {/* Result Section */}
            <div className="lg:col-span-5 flex flex-col">
              <ResultDisplay minutes={minutes} status={status} />
              
              <div className={`mt-4 transition-all duration-500 overflow-hidden ${volume === '500' ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                  <p className="text-xs text-gray-500">
                    ※ 500Lボンベは通常、最大流量が10L/分程度に設定されています。
                  </p>
                </div>
              </div>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}

export default App;