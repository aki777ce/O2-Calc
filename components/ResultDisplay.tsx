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
  const getStatusColor = (status: SafetyStatus) => {
    switch (status) {
      case SafetyStatus.DANGER: return 'text-red-500';
      case SafetyStatus.WARNING: return 'text-amber-500';
      case SafetyStatus.SAFE: return 'text-blue-600';
      default: return 'text-gray-400';
    }
  };

  const textColor = calculated ? getStatusColor(status) : 'text-gray-300';

  return (
    <div className="bg-blue-50/50 rounded-2xl p-8 text-center border border-blue-100/50 flex flex-col items-center justify-center space-y-2">
      <span className="text-sm font-bold text-gray-500">
        使用可能時間（目安）
      </span>

      <div className="flex items-baseline justify-center gap-2">
        <div className={`text-6xl font-black tracking-tight transition-all duration-500 ${textColor}`}>
          {calculated ? minutes : '--'}
        </div>
        <span className={`text-2xl font-black ${calculated ? 'text-gray-700' : 'text-gray-300'}`}>
          分
        </span>
      </div>

      <div className="text-sm font-bold text-gray-400 mt-2">
        酸素消費量: {calculated ? oxygenConsumption.toFixed(1) : '--'} L/min
      </div>
    </div>
  );
};
