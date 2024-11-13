import { useState, useEffect } from 'react';
import type { HomeData, CoreIdentityData } from '@/types/home';

const defaultIdentityData: CoreIdentityData = {
  statement: "",
  values: [],
  mission: "",
  vision: "",
  purpose: ""
}

export function useHomeData() {
  const [data, setData] = useState<HomeData | null>(null);
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
          growth: prevData?.growth || [],
          quotes: prevData?.quotes || [],
          visionBoard: prevData?.visionBoard || {
            images: [],
            isPlaceholder: true,
            message: ""
          },
          events: prevData?.events || [],
          notifications: prevData?.notifications || []
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
    identity: data?.identity || defaultIdentityData,
    growth: data?.growth || [],
    quotes: data?.quotes || [],
    visionBoard: data?.visionBoard || {
      images: [],
      isPlaceholder: true,
      message: "Loading vision board..."
    },
    events: data?.events || [],
    notifications: data?.notifications || [],
    isLoading,
    error
  };
} 