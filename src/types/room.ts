export interface Participant {
  id: string;
  name: string;
  isInspector: boolean;
  isSpeaking: boolean;
  isMuted: boolean;
  isVideoOn: boolean;
}

export interface Message {
  id: string;
  from: string;
  to: string | 'all';
  content: string;
  timestamp: number;
}

export interface RoomState {
  participants: Map<string, Participant>;
  currentSpeaker: string | null;
  messages: Message[];
  inspectorGuidance: string;
  roomId: string;
  userId: string;
  userName: string;
}