import React from 'react';
import { Participant } from '../types/room';
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';

interface Props {
  participants: Map<string, Participant>;
  currentSpeaker: string | null;
  onToggleAudio: (id: string) => void;
  onToggleVideo: (id: string) => void;
}

export const VideoGrid: React.FC<Props> = ({
  participants,
  currentSpeaker,
  onToggleAudio,
  onToggleVideo,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {Array.from(participants.values()).map((participant) => (
        <div
          key={participant.id}
          className={`relative rounded-lg overflow-hidden aspect-video ${
            currentSpeaker === participant.id
              ? 'ring-4 ring-blue-500'
              : 'ring-1 ring-gray-300'
          }`}
        >
          {participant.stream && participant.isVideoOn ? (
            <video
              autoPlay
              playsInline
              muted={participant.isMuted}
              ref={(video) => {
                if (video) video.srcObject = participant.stream!;
              }}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <span className="text-white text-xl">{participant.name}</span>
            </div>
          )}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 py-1 bg-black bg-opacity-50 rounded">
            <span className="text-white text-sm truncate">{participant.name}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => onToggleAudio(participant.id)}
                className="p-1 rounded-full hover:bg-gray-700"
              >
                {participant.isMuted ? (
                  <MicOff className="w-4 h-4 text-red-500" />
                ) : (
                  <Mic className="w-4 h-4 text-white" />
                )}
              </button>
              <button
                onClick={() => onToggleVideo(participant.id)}
                className="p-1 rounded-full hover:bg-gray-700"
              >
                {participant.isVideoOn ? (
                  <Video className="w-4 h-4 text-white" />
                ) : (
                  <VideoOff className="w-4 h-4 text-red-500" />
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};