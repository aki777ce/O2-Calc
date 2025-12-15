import React from 'react';
import { TankVolume } from '../types';

interface VolumeSelectorProps {
  selectedVolume: TankVolume;
  onChange: (volume: TankVolume) => void;
}

export const VolumeSelector: React.FC<VolumeSelectorProps> = ({ selectedVolume, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-600 mb-3 tracking-wide">ボンベ容量</label>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onChange('1500')}
          className={`relative p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-md ${
            selectedVolume === '1500' 
              ? 'border-[#0056D2] bg-blue-50/50 text-[#0056D2] ring-1 ring-[#0056D2] ring-offset-1' 
              : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
          }`}
        >
          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${selectedVolume === '1500' ? 'border-[#0056D2]' : 'border-gray-400'}`}>
            {selectedVolume === '1500' && <div className="w-2.5 h-2.5 rounded-full bg-[#0056D2]" />}
          </div>
          <span className="font-bold text-lg">1500L</span>
        </button>
        
        <button
          onClick={() => onChange('500')}
          className={`relative p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-md ${
            selectedVolume === '500' 
              ? 'border-[#0056D2] bg-blue-50/50 text-[#0056D2] ring-1 ring-[#0056D2] ring-offset-1' 
              : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
          }`}
        >
          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${selectedVolume === '500' ? 'border-[#0056D2]' : 'border-gray-400'}`}>
            {selectedVolume === '500' && <div className="w-2.5 h-2.5 rounded-full bg-[#0056D2]" />}
          </div>
          <span className="font-bold text-lg">500L</span>
        </button>
      </div>
    </div>
  );
};