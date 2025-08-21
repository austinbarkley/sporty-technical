import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { useFetch } from '@mantine/hooks';

export const url = (id: string) =>
  `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${id}`;

export interface LeagueAllSeasonResponse {
  seasons: Season[];
}

export interface Season {
  strSeason: string;
  strBadge?: string;
}

interface LeagueSeasonsStore {
  seasonsData: Record<string, LeagueAllSeasonResponse>;
  setSeasonsData: (id: string, data: LeagueAllSeasonResponse) => void;
  getSeasonsData: (id: string) => LeagueAllSeasonResponse | undefined;
  hasSeasonsData: (id: string) => boolean;
}

const useLeagueSeasonsStore = create<LeagueSeasonsStore>()(
  devtools(
    persist(
      (set, get) => ({
        seasonsData: {},
        setSeasonsData: (id: string, data: LeagueAllSeasonResponse) =>
          set(
            (state) => ({
              seasonsData: {
                ...state.seasonsData,
                [id]: data,
              },
            }),
            false,
            'setSeasonsData'
          ),
        getSeasonsData: (id: string) => get().seasonsData[id],
        hasSeasonsData: (id: string) => id in get().seasonsData,
      }),
      {
        name: 'league-seasons-storage',
        storage: createJSONStorage(() => sessionStorage),
      }
    ),
    {
      name: 'league-seasons-store',
    }
  )
);

export const useLeagueAllSeasonApi = (id: string) => {
  const { setSeasonsData, getSeasonsData, hasSeasonsData } = useLeagueSeasonsStore();
  const [shouldFetch, setShouldFetch] = useState(!hasSeasonsData(id));

  const { data, loading, error, abort } = useFetch<LeagueAllSeasonResponse>(
    shouldFetch ? url(id) : '',
    {
      method: 'GET',
    }
  );

  useEffect(() => {
    if (data && shouldFetch) {
      setSeasonsData(id, data);
      setShouldFetch(false);
    }
  }, [data, shouldFetch, id, setSeasonsData]);

  useEffect(() => {
    setShouldFetch(!hasSeasonsData(id));
  }, [id, hasSeasonsData]);

  const resultData = hasSeasonsData(id) ? getSeasonsData(id) : data;
  const resultLoading = hasSeasonsData(id) ? false : loading;
  const resultError = hasSeasonsData(id) ? null : error;

  const customRefetch = () => {
    setSeasonsData(id, undefined as any);
    setShouldFetch(true);
  };

  return {
    data: resultData,
    loading: resultLoading,
    error: resultError,
    refetch: customRefetch,
    abort,
  };
};
