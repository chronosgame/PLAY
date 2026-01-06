
import React from 'react';
import { LetterStatus } from '../types';

interface TileProps {
  letter?: string;
  status: LetterStatus;
  delay?: number;
}

const Tile: React.FC<TileProps> = ({ letter = '', status, delay = 0 }) => {
  const getRevealClass = () => {
    switch (status) {
      case LetterStatus.CORRECT: return 'reveal-correct';
      case LetterStatus.PRESENT: return 'reveal-present';
      case LetterStatus.ABSENT: return 'reveal-absent';
      default: return '';
    }
  };

  const animationStyle = status !== LetterStatus.EMPTY 
    ? { animationDelay: `${delay}ms` } 
    : {};

  const borderClass = letter ? 'border-[#565758]' : 'border-[#3a3a3c]';
  const revealClass = getRevealClass();

  return (
    <div 
      style={animationStyle}
      className={`
        w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center 
        text-2xl sm:text-3xl font-bold border-2 select-none uppercase
        transition-all duration-300
        ${revealClass || borderClass}
        text-white
      `}
    >
      {letter}
    </div>
  );
};

export default Tile;
