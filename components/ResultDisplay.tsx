import React from 'react';
import { SafetyStatus } from '../types';

interface ResultDisplayProps {
  minutes: number;
  status: SafetyStatus;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ minutes, status }) => {
  
  const getStatusConfig = (status: SafetyStatus) => {
    switch (status) {
      case SafetyStatus.DANGER:
        return {
          bg: 'bg-red-50',
          border: 'border-red-100',
          badgeBg: 'bg-[#FF4D4D]',
          badgeText: 'text-white',
          badgeLabel: `交換推奨 (< 20分)`,
          textColor: 'text-[#FF4D4D]',
          animate: 'animate-pulse'
        };
      case SafetyStatus.WARNING:
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-100',
          badgeBg: 'bg-[#FFC300]',
          badgeText: 'text-[#5A4200]',
          badgeLabel: `注意喚起 (20〜30分)`,
          textColor: 'text-[#E6AC00]',
          animate: ''
        };
      case SafetyStatus.SAFE:
      default:
        return {
          bg: 'bg-[#F0F9FF]',
          border: 'border-[#E0F2FE]',
          badgeBg: 'bg-[#0056D2]',
          badgeText: 'text-white',
          badgeLabel: '安全圏内',
          textColor: 'text-[#0056D2]',
          animate: ''
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className={`rounded-2xl p-6 text-center border-2 transition-all duration-300 flex flex-col items-center justify-center h-full min-h-[220px] ${config.bg} ${config.border}`}>
      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">使用可能時間</span>
      
      <div className="flex items-baseline justify-center gap-2 my-2">
        <div className={`text-6xl font-black tracking-tight transition-colors duration-300 ${config.textColor}`}>
          {minutes}
        </div>
        <span className="text-xl font-bold text-gray-400">分</span>
      </div>

      <div className={`mt-4 px-5 py-2 rounded-full text-sm font-bold shadow-sm transition-all duration-300 flex items-center gap-2 ${config.badgeBg} ${config.badgeText} ${config.animate}`}>
        {status === SafetyStatus.DANGER && <span>🚨</span>}
        {status === SafetyStatus.WARNING && <span>⚠️</span>}
        {status === SafetyStatus.SAFE && <span>✅</span>}
        {config.badgeLabel}
      </div>
    </div>
  );
};