import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { Participant } from '../types/room';

interface Props {
  participants: Map<string, Participant>;
  currentSpeaker: string | null;
  onSendMessage: (to: string, content: string) => void;
  onUpdateGuidance: (guidance: string) => void;
}

export const InspectorPanel: React.FC<Props> = ({
  participants,
  currentSpeaker,
  onSendMessage,
  onUpdateGuidance,
}) => {
  const [selectedParticipant, setSelectedParticipant] = useState<string>('all');
  const [message, setMessage] = useState('');
  const [guidance, setGuidance] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(selectedParticipant, message);
      setMessage('');
    }
  };

  const handleUpdateGuidance = () => {
    if (guidance.trim()) {
      onUpdateGuidance(guidance);
      setGuidance('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <MessageSquare className="w-6 h-6" />
          Inspector Controls
        </h2>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Send Message To
          </label>
          <select
            value={selectedParticipant}
            onChange={(e) => setSelectedParticipant(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">Everyone</option>
            {Array.from(participants.values())
              .filter(p => !p.isInspector)
              .map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))
            }
          </select>
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Update Guidance
          </label>
          <textarea
            value={guidance}
            onChange={(e) => setGuidance(e.target.value)}
            placeholder="Type guidance for all participants..."
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
          />
          <button
            onClick={handleUpdateGuidance}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Update Guidance
          </button>
        </div>
      </div>
    </div>
  );
};