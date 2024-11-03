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
  purpose: string;
  drivers: string[];
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
  coverUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  description?: string;
}

export interface Mentor {
  id: string;
  name: string;
  expertise: string;
  imageUrl?: string;
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