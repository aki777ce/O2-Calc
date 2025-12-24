import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-[#0056D2] to-[#0172B1] text-white pt-6 pb-12 px-4 shadow-lg rounded-b-[1.5rem]">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl md:text-3xl font-black mb-1 tracking-tight drop-shadow-sm">
          酸素ボンベ残量計算アプリ
        </h1>
        <p className="text-sm opacity-90 font-bold tracking-wider">
          NPPV/NHNC対応
        </p>
      </div>
    </header>
  );
};
