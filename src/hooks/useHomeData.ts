import { useState, useEffect } from 'react';
import { CoreIdentityData, Book, Achievement, Mentor, Quote, Event, Notification } from '@/types/home';

interface UseHomeDataReturn {
  identity: CoreIdentityData | null;
  growth: {
    books: Book[];
    achievements: Achievement[];
    mentors: Mentor[];
  } | null;
  quotes: Quote[];
  visionBoard: string[];
  events: Event[];
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
}

export function useHomeData(): UseHomeDataReturn {
  const [identity, setIdentity] = useState<CoreIdentityData | null>(null);
  const [growth, setGrowth] = useState<{
    books: Book[];
    achievements: Achievement[];
    mentors: Mentor[];
  } | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [visionBoard, setVisionBoard] = useState<string[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [identityRes, growthRes, inspirationRes, eventsRes, notificationsRes] = await Promise.all([
          fetch('/api/user/identity'),
          fetch('/api/user/growth'),
          fetch('/api/user/inspiration'),
          fetch('/api/user/events'),
          fetch('/api/user/notifications')
        ]);

        if (!identityRes.ok || !growthRes.ok || !inspirationRes.ok || !eventsRes.ok || !notificationsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [identityData, growthData, inspirationData, eventsData, notificationsData] = await Promise.all([
          identityRes.json(),
          growthRes.json(),
          inspirationRes.json(),
          eventsRes.json(),
          notificationsRes.json()
        ]);

        setIdentity(identityData);
        setGrowth(growthData);
        setQuotes(inspirationData.quotes);
        setVisionBoard(inspirationData.visionBoard);
        setEvents(eventsData.events);
        setNotifications(notificationsData.notifications);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { 
    identity, 
    growth, 
    quotes, 
    visionBoard, 
    events, 
    notifications, 
    isLoading, 
    error 
  };
} 