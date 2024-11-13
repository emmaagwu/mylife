import { useState, useEffect } from 'react';
import type { HomeData, CoreIdentityData, GrowthData } from '@/types/home';

const defaultIdentityData: CoreIdentityData = {
  statement: "",
  values: [],
  mission: "",
  vision: "",
  purpose: ""
}

const defaultGrowthData: GrowthData = {
  books: [],
  achievements: [],
  mentors: []
}

const defaultHomeData: HomeData = {
  identity: defaultIdentityData,
  growth: defaultGrowthData,
  quotes: [],
  visionBoard: {
    images: [],
    isPlaceholder: true,
    message: ""
  },
  events: [],
  notifications: []
}

export function useHomeData() {
  const [data, setData] = useState<HomeData>(defaultHomeData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const identityResponse = await fetch("/api/user/identity", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!identityResponse.ok) {
          throw new Error("Failed to fetch identity data");
        }

        const identityData = await identityResponse.json();

        setData(prevData => ({
          ...prevData,
          identity: {
            statement: identityData.statement || "",
            values: identityData.values || [],
            mission: identityData.mission || "",
            vision: identityData.vision || "",
            purpose: identityData.purpose || ""
          },
          growth: defaultGrowthData,
          quotes: prevData.quotes,
          visionBoard: prevData.visionBoard,
          events: prevData.events,
          notifications: prevData.notifications
        }));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return {
    identity: data.identity,
    growth: data.growth,
    quotes: data.quotes,
    visionBoard: data.visionBoard,
    events: data.events,
    notifications: data.notifications,
    isLoading,
    error
  };
} 