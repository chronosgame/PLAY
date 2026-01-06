
export enum LetterStatus {
  ABSENT = 'absent',
  PRESENT = 'present',
  CORRECT = 'correct',
  EMPTY = 'empty'
}

export enum GameStatus {
  PLAYING = 'playing',
  WON = 'won',
  LOST = 'lost'
}

export interface GuessResult {
  letter: string;
  status: LetterStatus;
}

export interface GameState {
  targetWord: string;
  guesses: string[];
  currentGuess: string;
  status: GameStatus;
  startTime: number | null;
  endTime: number | null;
  definition: string;
}
