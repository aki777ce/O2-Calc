import React from 'react';

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit: string;
  accentColor: string; // Hex code
  onChange: (value: number) => void;
  marks?: number[];
}

export const SliderInput: React.FC<SliderInputProps> = ({ 
  label, 
  value, 
  min, 
  max, 
  step = 1, 
  unit, 
  accentColor, 
  onChange,
  marks
}) => {
  // Calculate percentage for the gradient background
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="group">
      <div className="flex justify-between items-end mb-3">
        <label className="text-sm font-bold text-gray-600 tracking-wide">{label}</label>
        <div 
          className="font-bold text-2xl tabular-nums leading-none" 
          style={{ color: accentColor }}
        >
          {value} <span className="text-sm font-medium text-gray-400 ml-1">{unit}</span>
        </div>
      </div>
      
      <div className="relative w-full h-8 flex items-center">
        <input 
          type="range" 
          min={min} 
          max={max} 
          step={step} 
          value={value} 
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full absolute z-10 transition-all duration-200"
          style={{ 
            // Create a dynamic linear gradient to simulate the progress bar
            background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${percentage}%, #E2E8F0 ${percentage}%, #E2E8F0 100%)` 
          }}
        />
      </div>
      
      {marks && (
        <div className="flex justify-between text-[10px] font-medium text-gray-400 mt-1 px-1">
          {marks.map((mark) => (
            <span key={mark}>{mark}</span>
          ))}
        </div>
      )}
    </div>
  );
};