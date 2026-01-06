import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { GameStatus, LetterStatus, GameState } from '../types';
import { WORD_LENGTH, MAX_GUESSES, TARGET_WORDS } from '../constants';

interface UseGameResult {
  game: GameState;
  dayKey: string;
  gameNumber: number;
  isInvalid: boolean;
  message: string;
  showStats: boolean;
  showTutorial: boolean;
  keyboardStatuses: Record<string, LetterStatus>;
  handleKey: (key: string) => void;
  setShowStats: (show: boolean) => void;
  setShowTutorial: (show: boolean) => void;
  closeTutorial: () => void;
  shareResults: (timerDisplay: string) => void;
  getGuessStatuses: (guess: string, target: string) => LetterStatus[];
}

function getDayKey(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`;
}

function getGameNumber(): number {
  const startDate = Date.UTC(2026, 0, 1);
  const today = new Date();
  const todayUTC = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  return Math.floor((todayUTC - startDate) / (1000 * 60 * 60 * 24)) + 1;
}

function getDailyWord(dayKey: string): string {
  let hash = 0;
  for (let i = 0; i < dayKey.length; i++) {
    hash = (hash << 5) - hash + dayKey.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % TARGET_WORDS.length;
  return TARGET_WORDS[index].toLowerCase();
}

function getGuessStatuses(guess: string, target: string): LetterStatus[] {
  const statuses = Array(WORD_LENGTH).fill(LetterStatus.ABSENT);
  const targetArray: (string | null)[] = target.split('');
  const guessArray = guess.split('');

  guessArray.forEach((char, i) => {
    if (char === targetArray[i]) {
      statuses[i] = LetterStatus.CORRECT;
      targetArray[i] = null;
    }
  });

  guessArray.forEach((char, i) => {
    if (statuses[i] !== LetterStatus.CORRECT) {
      const targetIndex = targetArray.indexOf(char);
      if (targetIndex !== -1) {
        statuses[i] = LetterStatus.PRESENT;
        targetArray[targetIndex] = null;
      }
    }
  });

  return statuses;
}

export function useGame(
  dictionary: Set<string>,
  isLoading: boolean,
  addWord: (word: string) => void
): UseGameResult {
  const dayKey = useMemo(() => getDayKey(), []);
  const gameNumber = useMemo(() => getGameNumber(), []);

  const [game, setGame] = useState<GameState>({
    targetWord: '',
    guesses: [],
    currentGuess: '',
    status: GameStatus.PLAYING,
    startTime: null,
    endTime: null,
    definition: '',
  });

  const [isInvalid, setIsInvalid] = useState(false);
  const [message, setMessage] = useState('');
  const [showStats, setShowStats] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Refs for values needed in callbacks
  const dictionaryRef = useRef(dictionary);
  const showTutorialRef = useRef(showTutorial);

  useEffect(() => {
    dictionaryRef.current = dictionary;
  }, [dictionary]);

  useEffect(() => {
    showTutorialRef.current = showTutorial;
  }, [showTutorial]);

  // Load game on mount
  useEffect(() => {
    if (isLoading || dictionary.size === 0 || initialized) return;

    const saved = localStorage.getItem(`chronos_v3_game_${dayKey}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as GameState;
        if (parsed.targetWord) addWord(parsed.targetWord);
        setGame(parsed);
        if (parsed.status !== GameStatus.PLAYING) {
          setShowStats(true);
        }
        setInitialized(true);
        return;
      } catch {
        // Fall through to create new game
      }
    }

    const dailyWord = getDailyWord(dayKey);
    addWord(dailyWord);
    setGame(prev => ({ ...prev, targetWord: dailyWord }));

    const hasSeenTutorial = localStorage.getItem('chronos_tutorial_seen');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
    setInitialized(true);
  }, [isLoading, dictionary.size, dayKey, addWord, initialized]);

  // Submit guess function
  const submitGuess = useCallback((guess: string, currentGame: GameState) => {
    const normalized = guess.toLowerCase();

    if (!dictionaryRef.current.has(normalized)) {
      setIsInvalid(true);
      setMessage('Not in word list');
      setTimeout(() => {
        setIsInvalid(false);
        setMessage('');
      }, 800);
      setGame(g => ({ ...g, currentGuess: '' }));
      return;
    }

    const newGuesses = [...currentGame.guesses, normalized];
    const hasWon = normalized === currentGame.targetWord;
    const hasLost = !hasWon && newGuesses.length === MAX_GUESSES;
    const isOver = hasWon || hasLost;

    const newState: GameState = {
      ...currentGame,
      guesses: newGuesses,
      currentGuess: '',
      status: hasWon ? GameStatus.WON : hasLost ? GameStatus.LOST : GameStatus.PLAYING,
      endTime: isOver ? Date.now() : null,
    };

    setGame(newState);
    localStorage.setItem(`chronos_v3_game_${dayKey}`, JSON.stringify(newState));

    if (isOver) {
      setTimeout(() => setShowStats(true), 1500);
      if (hasWon) setMessage('Precision Strike!');
      if (hasLost) setMessage(`Target was ${currentGame.targetWord.toUpperCase()}`);
    }
  }, [dayKey]);

  // Handle key press
  const handleKey = useCallback((key: string) => {
    const normalizedKey = key === 'BACK' ? 'BACKSPACE' : key.toUpperCase();

    setGame(prev => {
      if (prev.status !== GameStatus.PLAYING) return prev;
      if (showTutorialRef.current) return prev;

      if (normalizedKey === 'BACKSPACE') {
        return { ...prev, currentGuess: prev.currentGuess.slice(0, -1) };
      }

      if (/^[A-Z]$/.test(normalizedKey)) {
        if (prev.currentGuess.length >= WORD_LENGTH) return prev;

        const char = normalizedKey.toLowerCase();
        const nextGuess = prev.currentGuess + char;

        let nextState = { ...prev, currentGuess: nextGuess };

        if (!prev.startTime) {
          nextState.startTime = Date.now();
        }

        // Schedule submission if word is complete
        if (nextGuess.length === WORD_LENGTH) {
          setTimeout(() => {
            setGame(currentGame => {
              // Only submit if the currentGuess still matches
              if (currentGame.currentGuess === nextGuess) {
                submitGuess(nextGuess, currentGame);
              }
              return currentGame;
            });
          }, 150);
        }

        return nextState;
      }

      return prev;
    });
  }, [submitGuess]);

  // Physical keyboard handler
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      handleKey(e.key);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKey]);

  const keyboardStatuses = useMemo(() => {
    const statuses: Record<string, LetterStatus> = {};
    game.guesses.forEach(guess => {
      const rowStatuses = getGuessStatuses(guess, game.targetWord);
      guess.split('').forEach((char, i) => {
        const currentStatus = rowStatuses[i];
        const existingStatus = statuses[char];
        if (currentStatus === LetterStatus.CORRECT) {
          statuses[char] = LetterStatus.CORRECT;
        } else if (currentStatus === LetterStatus.PRESENT) {
          if (existingStatus !== LetterStatus.CORRECT) {
            statuses[char] = LetterStatus.PRESENT;
          }
        } else if (currentStatus === LetterStatus.ABSENT) {
          if (!existingStatus) {
            statuses[char] = LetterStatus.ABSENT;
          }
        }
      });
    });
    return statuses;
  }, [game.guesses, game.targetWord]);

  const closeTutorial = useCallback(() => {
    setShowTutorial(false);
    localStorage.setItem('chronos_tutorial_seen', 'true');
  }, []);

  const shareResults = useCallback((timerDisplay: string) => {
    const statusEmoji = (status: LetterStatus) => {
      if (status === LetterStatus.CORRECT) return '🟩';
      if (status === LetterStatus.PRESENT) return '🟨';
      return '⬛';
    };

    const grid = game.guesses
      .map(guess => {
        const rowStatuses = getGuessStatuses(guess, game.targetWord);
        return rowStatuses.map(s => statusEmoji(s)).join('');
      })
      .join('\n');

    const score = game.status === GameStatus.WON ? game.guesses.length : 'X';
    const text = `Chronos #${gameNumber}\nTime: ${timerDisplay}\nGuesses: ${score}/${MAX_GUESSES}\n\n${grid}`;

    navigator.clipboard.writeText(text).then(() => {
      setMessage('Copied to clipboard');
      setTimeout(() => setMessage(''), 3000);
    });
  }, [game.guesses, game.targetWord, game.status, gameNumber]);

  return {
    game,
    dayKey,
    gameNumber,
    isInvalid,
    message,
    showStats,
    showTutorial,
    keyboardStatuses,
    handleKey,
    setShowStats,
    setShowTutorial,
    closeTutorial,
    shareResults,
    getGuessStatuses,
  };
}
