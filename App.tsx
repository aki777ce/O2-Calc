import React, { useState } from 'react';
import { Header } from './components/Header';
import { VolumeSelector } from './components/VolumeSelector';
import { NumericInput } from './components/NumericInput';
import { ToggleSwitch } from './components/ToggleSwitch';
import { ResultDisplay } from './components/ResultDisplay';
import { TankVolume, InputMode, SafetyStatus } from './types';

function App() {
  const [fio2, setFio2] = useState<number>(70);
  const [totalFlow, setTotalFlow] = useState<number>(40);
  const [inputMode, setInputMode] = useState<InputMode>('pressure');
  const [volume, setVolume] = useState<TankVolume>(500);
  const [pressure, setPressure] = useState<number>(10);
  const [currentLiters, setCurrentLiters] = useState<number>(0);

  const [result, setResult] = useState<{ minutes: number; consumption: number; status: SafetyStatus } | null>(null);

  const calculate = () => {
    // Oxygen consumption logic
    // FiO2 = (O2 + 0.21 * (Total - O2)) / Total
    // FiO2 * Total - 0.21 * Total = 0.79 * O2
    // O2 = (FiO2/100 - 0.21) * Total / 0.79
    const o2Consumption = ((fio2 / 100) - 0.21) * totalFlow / 0.79;

    let remainingVolume = 0;
    if (inputMode === 'pressure') {
      // Assuming 14.7 MPa is full for the conversion
      remainingVolume = (pressure / 14.7) * volume;
    } else {
      remainingVolume = currentLiters;
    }

    if (o2Consumption <= 0) {
      setResult({ minutes: 0, consumption: 0, status: SafetyStatus.DANGER });
      return;
    }

    const minutes = Math.floor(remainingVolume / o2Consumption);

    let status = SafetyStatus.SAFE;
    if (minutes < 20) {
      status = SafetyStatus.DANGER;
    } else if (minutes <= 30) {
      status = SafetyStatus.WARNING;
    }

    setResult({ minutes, consumption: o2Consumption, status });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12 font-sans text-gray-800">
      <Header />

      <main className="px-4 -mt-10 relative z-10">
        <section className="max-w-[600px] mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-10 space-y-8">

          <NumericInput
            label="① 酸素濃度 (FiO₂ %)"
            value={fio2}
            onChange={setFio2}
            placeholder="例: 70"
            min={21}
            max={100}
          />

          <NumericInput
            label="② トータルフロー (L/min)"
            value={totalFlow}
            onChange={setTotalFlow}
            placeholder="例: 40"
            min={1}
            max={80}
          />

          <ToggleSwitch
            label="③ ボンベ残量の入力方法を選択"
            value={inputMode}
            onChange={(mode) => {
              setInputMode(mode);
              setResult(null);
            }}
          />

          <div className="space-y-6 pt-2 border-t border-gray-50">
            <VolumeSelector selectedVolume={volume} onChange={setVolume} />

            {inputMode === 'pressure' ? (
              <NumericInput
                label="現在の圧力 (MPa)"
                value={pressure}
                onChange={setPressure}
                unit="MPa"
                placeholder="例: 10"
                helpText="※満タンは約14.7MPa"
              />
            ) : (
              <NumericInput
                label="現在の残量 (L)"
                value={currentLiters}
                onChange={setCurrentLiters}
                unit="L"
                placeholder="例: 300"
              />
            )}
          </div>

          <button
            onClick={calculate}
            className="w-full py-4 bg-[#002B6B] hover:bg-[#001F4D] text-white font-bold rounded-xl transition-all shadow-lg active:scale-[0.98] text-lg mt-4"
          >
            計算する
          </button>

          <ResultDisplay
            minutes={result?.minutes || 0}
            oxygenConsumption={result?.consumption || 0}
            status={result?.status || SafetyStatus.SAFE}
            calculated={!!result}
          />

          <p className="text-[10px] text-gray-400 text-center">
            ※ 14.7MPaを満タンとして計算しています。
          </p>

        </section>
      </main>
    </div>
  );
}

export default App;
