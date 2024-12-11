import React from 'react';
import { MessageSquare } from 'lucide-react';

interface Props {
  guidance: string;
  currentSpeaker: string | null;
  participants: Map<string, any>;
}

export const GuidancePanel: React.FC<Props> = ({
  guidance,
  currentSpeaker,
  participants,
}) => {
  const speakerName = currentSpeaker
    ? participants.get(currentSpeaker)?.name
    : null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <MessageSquare className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Strategic Guidance</h2>
      </div>
      <div className="space-y-4">
        {speakerName && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-medium text-blue-800">
              Current Speaker: {speakerName}
            </p>
          </div>
        )}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-800">{guidance}</p>
        </div>
      </div>
    </div>
  );
};