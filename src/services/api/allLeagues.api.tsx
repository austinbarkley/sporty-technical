import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { useFetch } from '@mantine/hooks';

export const url = 'https://www.thesportsdb.com/api/v1/json/3/all_leagues.php';

export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
}

export type LeagueSort = keyof League;

export interface AllLeaguesResponse {
  leagues: League[];
}

interface AllLeaguesStore {
  leaguesData: AllLeaguesResponse | null;
  setAllLeaguesData: (data: AllLeaguesResponse) => void;
  clearAllLeaguesData: () => void;
  getAllLeaguesData: () => AllLeaguesResponse | null;
  hasLeaguesData: () => boolean;
  allSports: () => string[];
}

const useAllLeaguesStore = create<AllLeaguesStore>()(
  devtools(
    persist(
      (set, get) => ({
        leaguesData: null,
        setAllLeaguesData: (data: AllLeaguesResponse) =>
          set(
            () => ({
              leaguesData: data,
            }),
            false,
            'setAllLeaguesData'
          ),
        clearAllLeaguesData: () =>
          set(
            () => ({
              leaguesData: null,
            }),
            false,
            'clearAllLeaguesData'
          ),
        getAllLeaguesData: () => get().leaguesData,
        hasLeaguesData: () => get().leaguesData !== null,
        allSports: () => {
          const sports = get()
            .leaguesData?.leagues.map((league) => league.strSport)
            .filter((sport) => sport !== '');

          return [...new Set(['All Sports', ...(sports || [])])];
        },
      }),
      {
        name: 'all-leagues-storage',
        storage: createJSONStorage(() => sessionStorage),
      }
    ),
    {
      name: 'all-leagues-store',
    }
  )
);

export const useAllLeaguesApi = () => {
  const { setAllLeaguesData, clearAllLeaguesData, getAllLeaguesData, hasLeaguesData, allSports } =
    useAllLeaguesStore();
  const [shouldFetch, setShouldFetch] = useState(!hasLeaguesData());

  const { data, loading, error, abort, refetch } = useFetch<AllLeaguesResponse>(
    shouldFetch ? url : '',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  useEffect(() => {
    if (data && shouldFetch) {
      setAllLeaguesData(data);
      setShouldFetch(false);
    }
  }, [data, shouldFetch, setAllLeaguesData]);

  useEffect(() => {
    setShouldFetch(!hasLeaguesData());
  }, [hasLeaguesData]);

  const resultData = hasLeaguesData() ? getAllLeaguesData() : data;
  const resultLoading = hasLeaguesData() ? false : loading;
  const resultError = hasLeaguesData() ? null : error;

  const customRefetch = () => {
    clearAllLeaguesData();
    setShouldFetch(true);
    refetch();
  };

  return {
    data: resultData?.leagues,
    loading: resultLoading,
    error: resultError,
    refetch: customRefetch,
    abort,
    allSports,
  };
};
