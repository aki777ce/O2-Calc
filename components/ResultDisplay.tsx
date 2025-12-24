import React from 'react';
import { SafetyStatus } from '../types';

interface ResultDisplayProps {
  minutes: number;
  oxygenConsumption: number;
  status: SafetyStatus;
  calculated: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  minutes,
  oxygenConsumption,
  status,
  calculated
}) => {
  const getStatusConfig = (status: SafetyStatus) => {
    switch (status) {
      case SafetyStatus.DANGER:
        return { color: 'text-red-600', bg: 'bg-red-50/50', label: '残りわずか！', border: 'border-red-100' };
      case SafetyStatus.WARNING:
        return { color: 'text-amber-600', bg: 'bg-amber-50/50', label: '早めの準備を', border: 'border-amber-100' };
      case SafetyStatus.SAFE:
        return { color: 'text-blue-600', bg: 'bg-blue-50/50', label: '安定しています', border: 'border-blue-100' };
      default:
        return { color: 'text-gray-400', bg: 'bg-gray-50/50', label: '--', border: 'border-gray-100' };
    }
  };

  const config = calculated ? getStatusConfig(status) : getStatusConfig(SafetyStatus.SAFE);

  return (
    <div className={`rounded-2xl p-4 text-center border transition-all duration-500 flex flex-col items-center justify-center space-y-2 ${config.bg} ${config.border}`}>
      <div className="space-y-0.5">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          使用可能時間 (目安)
        </span>
        <div className={`px-2 py-0.5 rounded-full text-[9px] font-black inline-block ${config.color} border border-current opacity-70`}>
          {config.label}
        </div>
      </div>

      <div className="flex items-baseline justify-center gap-1.5">
        <div className={`text-6xl font-black tracking-tighter transition-all duration-500 drop-shadow-sm ${config.color}`}>
          {calculated ? minutes : '--'}
        </div>
        <span className={`text-xl font-black ${calculated ? 'text-gray-700' : 'text-gray-300'}`}>
          分
        </span>
      </div>

      <div className="flex items-center gap-2 uppercase">
        <span className="text-[9px] font-black text-gray-400 tracking-tighter">酸素消費量</span>
        <div className="text-[13px] font-black text-gray-700">
          {calculated ? oxygenConsumption.toFixed(1) : '--'} <span className="text-[9px] text-gray-400 tracking-tighter">L/MIN</span>
        </div>
      </div>
    </div>
  );
};
