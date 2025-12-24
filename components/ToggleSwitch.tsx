import React from 'react';
import { InputMode } from '../types';

interface ToggleSwitchProps {
    label: string;
    value: InputMode;
    onChange: (value: InputMode) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, value, onChange }) => {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-700 text-center">
                {label}
            </label>
            <div className="flex p-1 bg-gray-100 rounded-xl">
                <button
                    onClick={() => onChange('pressure')}
                    className={`flex-1 py-2 px-4 text-sm font-bold rounded-lg transition-all ${value === 'pressure'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    圧力計 (MPa)
                </button>
                <button
                    onClick={() => onChange('volume')}
                    className={`flex-1 py-2 px-4 text-sm font-bold rounded-lg transition-all ${value === 'volume'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    残量 (L)
                </button>
            </div>
        </div>
    );
};
