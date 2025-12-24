import React from 'react';
import { TankVolume } from '../types';

interface VolumeSelectorProps {
  selectedVolume: TankVolume;
  onChange: (volume: TankVolume) => void;
}

export const VolumeSelector: React.FC<VolumeSelectorProps> = ({ selectedVolume, onChange }) => {
  const options: { value: TankVolume; label: string }[] = [
    { value: 500, label: '500L (小型)' },
    { value: 1500, label: '1500L (中型)' },
  ];

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center px-1">
        <label className="text-[13px] font-black text-gray-600 tracking-tight">
          ボンベ容量 <span className="text-[10px] font-bold text-gray-400 ml-1">(満タン容量)</span>
        </label>
      </div>
      <div className="grid grid-cols-2 gap-1 bg-gray-100 p-1 rounded-xl">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`py-2 text-xs font-black rounded-lg transition-all ${selectedVolume === opt.value
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500'
              }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};
