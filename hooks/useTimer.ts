import { useState, useEffect } from 'react';
import { GameStatus } from '../types';

interface UseTimerResult {
  timerDisplay: string;
}

function formatTime(elapsed: number): string {
  const minutes = Math.floor(elapsed / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);
  const centiseconds = Math.floor((elapsed % 1000) / 10);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
}

export function useTimer(
  startTime: number | null,
  endTime: number | null,
  status: GameStatus
): UseTimerResult {
  const [timerDisplay, setTimerDisplay] = useState('00:00.00');

  useEffect(() => {
    let interval: number;

    if (startTime && status === GameStatus.PLAYING) {
      interval = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        setTimerDisplay(formatTime(elapsed));
      }, 50);
    } else if (startTime && endTime) {
      const elapsed = endTime - startTime;
      setTimerDisplay(formatTime(elapsed));
    }

    return () => clearInterval(interval);
  }, [startTime, endTime, status]);

  return { timerDisplay };
}
