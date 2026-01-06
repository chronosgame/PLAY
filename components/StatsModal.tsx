import React from 'react';
import { GameStatus } from '../types';
import { MAX_GUESSES } from '../constants';

interface StatsModalProps {
  show: boolean;
  status: GameStatus;
  targetWord: string;
  guessCount: number;
  timerDisplay: string;
  onClose: () => void;
  onShare: () => void;
}

const StatsModal: React.FC<StatsModalProps> = ({
  show,
  status,
  targetWord,
  guessCount,
  timerDisplay,
  onClose,
  onShare,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[400] p-4 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-[#121213] border border-[#3a3a3c] p-10 rounded-[3rem] w-full max-w-md flex flex-col items-center text-center shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2
          className={`text-5xl font-black mb-1 uppercase tracking-tighter ${
            status === GameStatus.WON ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {status === GameStatus.WON ? 'Victory' : 'Defeat'}
        </h2>
        <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-10">
          Operation Summary
        </p>

        <div className="mb-12">
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.4em] mb-2 font-black">
            Final Time
          </p>
          <p className="text-7xl font-mono font-black text-white tabular-nums leading-none tracking-tighter">
            {timerDisplay}
          </p>
        </div>

        <div className="w-full bg-[#1e1e20] p-8 rounded-3xl mb-10 border border-[#3a3a3c] flex justify-between items-center shadow-inner">
          <div className="text-left">
            <p className="text-green-500 font-black uppercase text-[10px] tracking-widest mb-1">
              Target Word
            </p>
            <p className="text-4xl font-black uppercase tracking-wider">{targetWord}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mb-1">
              Attempts
            </p>
            <p className="text-4xl font-black">
              {guessCount}/{MAX_GUESSES}
            </p>
          </div>
        </div>

        <button
          onClick={onShare}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-6 rounded-3xl transition-all flex items-center justify-center gap-4 shadow-[0_10px_30px_rgba(37,99,235,0.3)] active:scale-95 text-xl group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 transition-transform group-hover:scale-110"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          TRANSMIT SCORE
        </button>
      </div>
    </div>
  );
};

export default StatsModal;
