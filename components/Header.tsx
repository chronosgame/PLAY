import React from 'react';
import { GameStatus } from '../types';

interface HeaderProps {
  timerDisplay: string;
  startTime: number | null;
  status: GameStatus;
  onShowTutorial: () => void;
  onShowStats: () => void;
}

const Header: React.FC<HeaderProps> = ({
  timerDisplay,
  startTime,
  status,
  onShowTutorial,
  onShowStats,
}) => {
  return (
    <header className="w-full max-w-lg flex items-center justify-between px-6 py-4 border-b border-[#3a3a3c] mb-8 bg-[#121213]/80 backdrop-blur-md z-50">
      <button
        onClick={onShowTutorial}
        className="p-2 text-gray-400 hover:text-white transition-all hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      <h1 className="text-3xl font-black tracking-[0.3em] uppercase text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
        Chronos
      </h1>

      <div className="flex items-center gap-4">
        <span
          className={`font-mono text-xl sm:text-2xl font-black ${
            startTime && status === GameStatus.PLAYING ? 'text-green-500' : 'text-gray-500'
          }`}
        >
          {timerDisplay}
        </span>
        {status !== GameStatus.PLAYING && (
          <button
            onClick={onShowStats}
            className="p-2 bg-[#3a3a3c] hover:bg-[#4a4a4c] rounded-xl transition-all shadow-lg active:scale-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
