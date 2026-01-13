
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
        aspect-square w-[calc((100vw-48px)/5)] max-w-[62px] sm:max-w-[68px]
        flex items-center justify-center
        text-[2rem] sm:text-[2.25rem] font-bold border-2 select-none uppercase
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
