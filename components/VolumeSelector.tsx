import React from 'react';
import { TankVolume } from '../types';

interface VolumeSelectorProps {
  selectedVolume: TankVolume;
  onChange: (volume: TankVolume) => void;
}

export const VolumeSelector: React.FC<VolumeSelectorProps> = ({ selectedVolume, onChange }) => {
  const options: { value: TankVolume; label: string }[] = [
    { value: 500, label: '500L (小型・搬送用)' },
    { value: 1500, label: '1500L (中型)' },
    { value: 2000, label: '2000L' },
    { value: 3000, label: '3000L' },
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-gray-700">
        ボンベの種類 (満タン時の容量)
      </label>
      <div className="relative">
        <select
          value={selectedVolume}
          onChange={(e) => onChange(Number(e.target.value) as TankVolume)}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-base font-medium appearance-none"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};
