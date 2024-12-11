import React from 'react';
import { Message } from '../types/room';

interface Props {
  messages: Message[];
  userId: string;
}

export const MessageDisplay: React.FC<Props> = ({ messages, userId }) => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50">
      {messages
        .filter(msg => msg.to === 'all' || msg.to === userId)
        .slice(-1)
        .map(message => (
          <div
            key={message.id}
            className="bg-blue-600 text-white p-4 rounded-lg shadow-lg mx-4"
          >
            <p className="font-medium">{message.content}</p>
            <p className="text-sm text-blue-200 mt-1">
              From: {message.from}
            </p>
          </div>
        ))}
    </div>
  );
};