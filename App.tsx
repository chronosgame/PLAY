import React from 'react';
import { useDictionary, useGame, useTimer } from './hooks';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import Message from './components/Message';
import TutorialModal from './components/TutorialModal';
import StatsModal from './components/StatsModal';

const App: React.FC = () => {
  const { dictionary, isLoading, error, addWord } = useDictionary();
  const {
    game,
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
  } = useGame(dictionary, isLoading, addWord);
  const { timerDisplay } = useTimer(game.startTime, game.endTime, game.status);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#121213] text-white">
        <div className="relative w-20 h-20 mb-6">
          <div className="absolute inset-0 border-4 border-[#3a3a3c] rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-green-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-400 font-bold tracking-[0.2em] uppercase text-xs animate-pulse">
          Syncing Global Dictionary...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#121213] text-white">
        <p className="text-red-400 font-bold">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#121213] text-white overflow-hidden font-sans">
      <Message message={message} />

      <Header
        timerDisplay={timerDisplay}
        startTime={game.startTime}
        status={game.status}
        onShowTutorial={() => setShowTutorial(true)}
        onShowStats={() => setShowStats(true)}
      />

      <GameBoard
        guesses={game.guesses}
        currentGuess={game.currentGuess}
        targetWord={game.targetWord}
        status={game.status}
        isInvalid={isInvalid}
        getGuessStatuses={getGuessStatuses}
      />

      <TutorialModal show={showTutorial} onClose={closeTutorial} />

      <StatsModal
        show={showStats}
        status={game.status}
        targetWord={game.targetWord}
        guessCount={game.guesses.length}
        timerDisplay={timerDisplay}
        onClose={() => setShowStats(false)}
        onShare={() => shareResults(timerDisplay)}
      />

      <Keyboard onKey={handleKey} letterStatuses={keyboardStatuses} />
    </div>
  );
};

export default App;
