
import React from 'react';
import { KEYBOARD_ROWS } from '../constants';
import { LetterStatus } from '../types';

interface KeyboardProps {
  onKey: (key: string) => void;
  letterStatuses: Record<string, LetterStatus>;
}

const Keyboard: React.FC<KeyboardProps> = ({ onKey, letterStatuses }) => {
  const getKeyStyle = (key: string) => {
    const status = letterStatuses[key.toLowerCase()];
    switch (status) {
      case LetterStatus.CORRECT: return 'bg-[#538d4e] text-white hover:bg-[#6aaa64]';
      case LetterStatus.PRESENT: return 'bg-[#b59f3b] text-white hover:bg-[#c9b458]';
      case LetterStatus.ABSENT: return 'bg-[#3a3a3c] text-white hover:bg-[#4a4a4c]';
      default: return 'bg-[#818384] text-white hover:bg-[#919394]';
    }
  };

  return (
    <div className="w-full max-w-2xl px-2 mt-8 mb-4">
      {KEYBOARD_ROWS.map((row, i) => (
        <div key={i} className="flex justify-center mb-2 gap-1.5 touch-none">
          {row.map((key) => {
            const isSpecial = key === 'ENTER' || key === 'BACK';
            return (
              <button
                key={key}
                onClick={() => onKey(key)}
                className={`
                  ${isSpecial ? 'px-3 sm:px-4 text-xs font-bold' : 'flex-1 max-w-[44px] sm:h-14 font-semibold'}
                  h-14 rounded flex items-center justify-center transition-colors
                  ${getKeyStyle(key)}
                `}
              >
                {key === 'BACK' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                  </svg>
                ) : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
