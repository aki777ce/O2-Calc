import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-[#0056D2] to-[#00A3E0] text-white pt-10 pb-16 px-6 shadow-lg rounded-b-[2rem]">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight drop-shadow-sm">
          酸素ボンベ残量換算アプリ
        </h1>
        <p className="text-lg opacity-90 font-medium tracking-wide">
          500L / 1500L 対応クイックカリキュレーター
        </p>
      </div>
    </header>
  );
};