import React from 'react';

interface NumericInputProps {
    label: string;
    value: number | string;
    onChange: (value: number) => void;
    unit?: string;
    placeholder?: string;
    min?: number;
    max?: number;
    step?: number;
    helpText?: string;
}

export const NumericInput: React.FC<NumericInputProps> = ({
    label,
    value,
    onChange,
    unit,
    placeholder,
    min,
    max,
    step = 1,
    helpText,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val)) {
            onChange(val);
        } else if (e.target.value === '') {
            onChange(0);
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">
                {label} {unit && <span className="text-xs font-normal text-gray-500">({unit})</span>}
            </label>
            <div className="relative">
                <input
                    type="number"
                    value={value === 0 ? '' : value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    min={min}
                    max={max}
                    step={step}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg font-medium"
                />
                {unit && value !== '' && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                        {unit}
                    </div>
                )}
            </div>
            {helpText && <p className="text-[10px] text-gray-400 text-right italic">{helpText}</p>}
        </div>
    );
};
