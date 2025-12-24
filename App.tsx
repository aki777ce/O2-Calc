import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { VolumeSelector } from './components/VolumeSelector';
import { HybridInput } from './components/HybridInput';
import { ResultDisplay } from './components/ResultDisplay';
import { TankVolume, SafetyStatus } from './types';

function App() {
  const [fio2, setFio2] = useState<number>(70);
  const [totalFlow, setTotalFlow] = useState<number>(40);
  const [volume, setVolume] = useState<TankVolume>(500);
  const [pressure, setPressure] = useState<number>(10);

  const result = useMemo(() => {
    // Oxygen consumption logic
    const o2Consumption = ((fio2 / 100) - 0.21) * totalFlow / 0.79;

    // Remaining volume based on pressure (14.7 MPa as full)
    const remainingVolume = (pressure / 14.7) * volume;

    if (o2Consumption <= 0) {
      return { minutes: 0, consumption: 0, status: SafetyStatus.SAFE, calculated: true };
    }

    const minutes = Math.floor(remainingVolume / o2Consumption);

    let status = SafetyStatus.SAFE;
    if (minutes < 10) {
      status = SafetyStatus.DANGER;
    } else if (minutes <= 20) {
      status = SafetyStatus.WARNING;
    }

    return { minutes, consumption: o2Consumption, status, calculated: true };
  }, [fio2, totalFlow, volume, pressure]);

  return (
    <div className="min-h-screen bg-transparent pb-8 font-sans text-gray-800">
      <Header />

      <main className="px-3 -mt-8 relative z-10">
        <section className="max-w-[450px] mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-4 space-y-4">

          <div className="space-y-3">
            <HybridInput
              label="① 酸素濃度 (FiO₂)"
              value={fio2}
              min={21}
              max={100}
              unit="%"
              onChange={setFio2}
            />

            <HybridInput
              label="② トータルフロー"
              value={totalFlow}
              min={1}
              max={100}
              unit="L/min"
              onChange={setTotalFlow}
            />

            <VolumeSelector selectedVolume={volume} onChange={setVolume} />

            <HybridInput
              label="現在の圧力"
              value={pressure}
              min={0}
              max={15}
              step={0.1}
              unit="MPa"
              onChange={setPressure}
            />
          </div>

          <ResultDisplay
            minutes={result.minutes}
            oxygenConsumption={result.consumption}
            status={result.status}
            calculated={result.calculated}
          />

          <div className="text-center">
            <p className="text-[9px] text-gray-400 font-bold">
              ※ 14.7MPaを満タンとして換算しています。
            </p>
          </div>

        </section>
      </main>
    </div>
  );
}

export default App;
