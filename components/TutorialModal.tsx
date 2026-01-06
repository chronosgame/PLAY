import React from 'react';

interface TutorialModalProps {
  show: boolean;
  onClose: () => void;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[400] p-4 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-[#121213] border border-[#3a3a3c] p-10 rounded-[2.5rem] w-full max-w-md shadow-[0_0_80px_rgba(0,0,0,0.5)]">
        <h2 className="text-3xl font-black uppercase tracking-widest mb-6 text-center text-white border-b border-[#3a3a3c] pb-4">
          How To Play
        </h2>
        <div className="space-y-6 mb-10 text-gray-400 text-sm leading-relaxed">
          <p>
            Solve the daily <span className="text-white font-bold">5-LETTER WORD</span> in 6
            attempts.
          </p>
          <div className="p-5 bg-green-500/10 border border-green-500/20 rounded-2xl">
            <p className="text-green-400 font-medium">
              The timer activates on your first keystroke. Try guess the word as quickly as you
              can.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center font-black bg-[#538d4e] rounded-xl text-white">
                A
              </div>
              <p>
                In the word, <span className="text-green-500 font-bold uppercase">Correct</span>{' '}
                spot.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center font-black bg-[#b59f3b] rounded-xl text-white">
                B
              </div>
              <p>
                In the word, <span className="text-yellow-500 font-bold uppercase">Wrong</span>{' '}
                spot.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center font-black bg-[#3a3a3c] rounded-xl text-white">
                C
              </div>
              <p>
                <span className="text-gray-500 font-bold uppercase">Not</span> in the target word.
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-full bg-white text-black font-black py-5 rounded-2xl transition-all hover:bg-gray-200 shadow-xl active:scale-95 text-lg"
        >
          READY
        </button>
      </div>
    </div>
  );
};

export default TutorialModal;
