import { useNavigate } from 'react-router-dom';
import { Button, Center, Container, Loader, Stack, Table, Text } from '@mantine/core';
import { useFetch } from '@mantine/hooks';
import { AllLeaguesResponse, url as allLeaguesUrl } from '@/services/api/allLeagues.api';
import ListHeader from './components/ListHeader/ListHeader';
import ListRow from './components/ListRow/ListRow';

const List = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useFetch<AllLeaguesResponse>(allLeaguesUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'default',
  });

  return (
    <>
      {loading && (
        <Container h="100vh">
          <Center h="100%">
            <Loader size="xl" />
          </Center>
        </Container>
      )}

      {!loading && !error && data && (
        <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
          <ListHeader
            onColumnClick={(column) => {
              console.log(column);
            }}
          />
          <Table.Tbody>
            {data?.leagues.map((league) => (
              <ListRow
                key={league.idLeague}
                league={league}
                onClick={(id) => navigate(`/leagues/${id}`)}
              />
            ))}
          </Table.Tbody>
        </Table>
      )}

      {error && (
        <Container h="100vh">
          <Center h="100%">
            <Stack>
              <Text>Error loading leagues. Please try again.</Text>
              <Button onClick={() => refetch()}>Try again</Button>
            </Stack>
          </Center>
        </Container>
      )}
    </>
  );
};

export default List;
