import React, { useState, useEffect } from 'react';
import { JoinRoom } from './components/JoinRoom';
import { VideoGrid } from './components/VideoGrid';
import { InspectorPanel } from './components/InspectorPanel';
import { MessageDisplay } from './components/MessageDisplay';
import { useRoomStore } from './store/roomStore';

function App() {
  const [isJoined, setIsJoined] = useState(false);
  const {
    participants,
    currentSpeaker,
    messages,
    userId,
    setParticipants,
    updateParticipant,
    setCurrentSpeaker,
    addMessage,
    setInspectorGuidance,
    setRoomInfo,
  } = useRoomStore();

  const handleJoinRoom = async (name: string, roomId: string, isInspector: boolean) => {
    try {
      // For non-inspectors, request media access
      let stream = null;
      if (!isInspector) {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
      }
      
      const userId = Math.random().toString(36).substr(2, 9);
      const newParticipants = new Map(participants);
      newParticipants.set(userId, {
        id: userId,
        name,
        isInspector,
        isSpeaking: false,
        isMuted: isInspector,
        isVideoOn: !isInspector,
      });
      
      setParticipants(newParticipants);
      setRoomInfo(roomId, userId, name);
      setIsJoined(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const handleToggleAudio = (participantId: string) => {
    const participant = participants.get(participantId);
    if (participant && !participant.isInspector) {
      updateParticipant(participantId, {
        isMuted: !participant.isMuted,
      });
    }
  };

  const handleToggleVideo = (participantId: string) => {
    const participant = participants.get(participantId);
    if (participant && !participant.isInspector) {
      updateParticipant(participantId, {
        isVideoOn: !participant.isVideoOn,
      });
    }
  };

  const handleSendMessage = (to: string, content: string) => {
    const currentUser = participants.get(userId);
    if (currentUser && currentUser.isInspector) {
      addMessage({
        id: Math.random().toString(36).substr(2, 9),
        from: currentUser.name,
        to,
        content,
        timestamp: Date.now(),
      });
    }
  };

  const currentParticipant = participants.get(userId);

  return (
    <div className="min-h-screen bg-gray-100">
      {!isJoined ? (
        <JoinRoom onJoin={handleJoinRoom} />
      ) : (
        <div className="container mx-auto p-4">
          <MessageDisplay messages={messages} userId={userId} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <VideoGrid
                participants={participants}
                currentSpeaker={currentSpeaker}
                onToggleAudio={handleToggleAudio}
                onToggleVideo={handleToggleVideo}
              />
            </div>
            <div>
              {currentParticipant?.isInspector ? (
                <InspectorPanel
                  participants={participants}
                  currentSpeaker={currentSpeaker}
                  onSendMessage={handleSendMessage}
                  onUpdateGuidance={setInspectorGuidance}
                />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;