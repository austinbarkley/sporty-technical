import { useFetch } from '@mantine/hooks';

export const url = 'https://www.thesportsdb.com/api/v1/json/3/all_leagues.php';

export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
}

export interface AllLeaguesResponse {
  leagues: League[];
}

export const useAllLeaguesApi = () => {
  const getAllLeagues = async () => {
    const { data, loading, error, refetch, abort } = useFetch<AllLeaguesResponse>(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'default',
    });

    return { data: data?.leagues, loading, error, refetch, abort };
  };

  return { getAllLeagues };
};
