import { create } from 'zustand';
import { RoomState, Participant, Message } from '../types/room';

interface RoomStore extends RoomState {
  setParticipants: (participants: Map<string, Participant>) => void;
  updateParticipant: (id: string, participant: Partial<Participant>) => void;
  setCurrentSpeaker: (id: string | null) => void;
  addMessage: (message: Message) => void;
  setInspectorGuidance: (guidance: string) => void;
  setRoomInfo: (roomId: string, userId: string, userName: string) => void;
}

export const useRoomStore = create<RoomStore>((set) => ({
  participants: new Map(),
  currentSpeaker: null,
  messages: [],
  inspectorGuidance: '',
  roomId: '',
  userId: '',
  userName: '',
  
  setParticipants: (participants) => set({ participants }),
  updateParticipant: (id, participant) => 
    set((state) => {
      const newParticipants = new Map(state.participants);
      const existing = newParticipants.get(id);
      if (existing) {
        newParticipants.set(id, { ...existing, ...participant });
      }
      return { participants: newParticipants };
    }),
  setCurrentSpeaker: (id) => set({ currentSpeaker: id }),
  addMessage: (message) => 
    set((state) => ({
      messages: [...state.messages, message]
    })),
  setInspectorGuidance: (guidance) => set({ inspectorGuidance: guidance }),
  setRoomInfo: (roomId, userId, userName) => set({ roomId, userId, userName }),
}));