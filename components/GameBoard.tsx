import React from 'react';
import Tile from './Tile';
import { GameStatus, LetterStatus } from '../types';
import { WORD_LENGTH, MAX_GUESSES } from '../constants';

interface GameBoardProps {
  guesses: string[];
  currentGuess: string;
  targetWord: string;
  status: GameStatus;
  isInvalid: boolean;
  getGuessStatuses: (guess: string, target: string) => LetterStatus[];
}

const GameBoard: React.FC<GameBoardProps> = ({
  guesses,
  currentGuess,
  targetWord,
  status,
  isInvalid,
  getGuessStatuses,
}) => {
  const renderRow = (guess: string, rowIndex: number, isCurrent: boolean = false) => {
    const statuses =
      !isCurrent && guess
        ? getGuessStatuses(guess, targetWord)
        : Array(WORD_LENGTH).fill(LetterStatus.EMPTY);

    return (
      <div
        key={`row-${rowIndex}`}
        className={`flex gap-1 sm:gap-1.5 ${isCurrent && isInvalid ? 'animate-shake' : ''}`}
      >
        {Array.from({ length: WORD_LENGTH }).map((_, i) => {
          const char = isCurrent ? currentGuess[i] : guess ? guess[i] : '';
          return <Tile key={i} letter={char} status={statuses[i]} delay={i * 100} />;
        })}
      </div>
    );
  };

  const emptyRowsCount = MAX_GUESSES - guesses.length - (status === GameStatus.PLAYING ? 1 : 0);

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full px-4 relative min-h-0">
      <div className="grid grid-rows-6 gap-[5px] sm:gap-[6px]">
        {guesses.map((g, i) => renderRow(g, i))}
        {status === GameStatus.PLAYING && renderRow('', guesses.length, true)}
        {Array.from({ length: Math.max(0, emptyRowsCount) }).map((_, i) =>
          renderRow('', guesses.length + 1 + i)
        )}
      </div>
    </div>
  );
};

export default GameBoard;
