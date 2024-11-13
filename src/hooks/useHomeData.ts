import { useState, useEffect } from 'react';
import type { HomeData } from '@/types/home';

export function useHomeData() {
  const [data, setData] = useState<HomeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/home');
        if (!response.ok) throw new Error('Failed to fetch home data');
        
        const homeData = await response.json();
        setData(homeData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return {
    identity: data?.identity,
    growth: data?.growth,
    quotes: data?.quotes || [],
    visionBoard: data?.visionBoard || {
      images: [],
      isPlaceholder: true,
      message: 'Loading vision board...'
    },
    events: data?.events,
    notifications: data?.notifications,
    isLoading,
    error
  };
} 