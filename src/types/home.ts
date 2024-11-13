export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface CoreIdentityData {
  statement: string;
  values: string[];
  mission: string;
  vision: string;
  purpose: string;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  isFavorite: boolean;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  progress: number;
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
}

export interface Mentor {
  id: string;
  name: string;
  expertise: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  type: 'work' | 'personal' | 'growth';
  description?: string;
}

export interface Notification {
  id: string;
  message: string;
  time: string;
  read: boolean;
  type: 'achievement' | 'reminder' | 'message' | 'system';
}

export interface VisionBoardData {
  images: string[];
  isPlaceholder?: boolean;
  message?: string;
}

export interface GrowthData {
  books: Book[];
  achievements: Achievement[];
  mentors: Mentor[];
}

export interface HomeData {
  identity: {
    statement: string;
    values: string[];
    mission: string;
    vision: string;
    purpose: string;
  };
  growth: GrowthData;
  quotes: Array<{
    id: string;
    text: string;
    author: string;
    isFavorite: boolean;
  }>;
  visionBoard: {
    images: string[];
    isPlaceholder: boolean;
    message: string;
  };
  events: any[]; // Define specific type if needed
  notifications: any[]; // Define specific type if needed
} 