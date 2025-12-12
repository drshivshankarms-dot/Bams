export interface Chapter {
  id: string;
  title: string;
  videoUrl?: string; // Placeholder for video link
  pdfUrl?: string;   // Placeholder for notes
  duration: string;
}

export interface Subject {
  id: string;
  name: string;
  sanskritName: string;
  description: string;
  chapters: Chapter[];
}

export interface Proff {
  id: number;
  title: string;
  description: string;
  subjects: Subject[];
}

export enum AccessStatus {
  LOCKED = 'LOCKED',
  PENDING = 'PENDING',
  UNLOCKED = 'UNLOCKED',
}

export interface UserAccess {
  unlockedProffs: number[]; // Array of Proff IDs (1, 2, or 3)
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}