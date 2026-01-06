import React from 'react';

interface MessageProps {
  message: string;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-xl font-bold z-[500] shadow-[0_0_40px_rgba(255,255,255,0.4)] animate-in fade-in slide-in-from-top-4 duration-300">
      {message}
    </div>
  );
};

export default Message;
