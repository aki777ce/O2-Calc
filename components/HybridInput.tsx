import React from 'react';

interface HybridInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step?: number;
    unit: string;
}

export const HybridInput: React.FC<HybridInputProps> = ({
    label,
    value,
    onChange,
    min,
    max,
    step = 1,
    unit,
}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val)) {
            onChange(Math.min(max, Math.max(min, val)));
        } else if (e.target.value === '') {
            onChange(min);
        }
    };

    return (
        <div className="space-y-1.5 p-2.5 bg-gray-50/50 rounded-xl border border-gray-100 transition-colors">
            <div className="flex justify-between items-center px-0.5">
                <label className="text-[13px] font-black text-gray-600 tracking-tight">
                    {label}
                </label>
                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-gray-200 shadow-sm">
                    <input
                        type="number"
                        value={value}
                        onChange={handleInputChange}
                        className="w-12 bg-transparent text-right font-black text-blue-600 outline-none text-sm"
                    />
                    <span className="text-[9px] font-black text-gray-400 uppercase">{unit}</span>
                </div>
            </div>

            <div className="px-0.5">
                <div className="relative flex items-center h-4">
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        onChange={(e) => onChange(parseFloat(e.target.value))}
                        className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                    />
                </div>
                <div className="flex justify-between -mt-1.5">
                    <span className="text-[8px] font-bold text-gray-300">{min}{unit}</span>
                    <span className="text-[8px] font-bold text-gray-300">{max}{unit}</span>
                </div>
            </div>
        </div>
    );
};
