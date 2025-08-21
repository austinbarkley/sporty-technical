import { useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Center,
  CloseButton,
  Container,
  Flex,
  Loader,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
} from '@mantine/core';
import { useDebouncedValue, useDocumentTitle } from '@mantine/hooks';
import { League, useAllLeaguesApi } from '@/services/api/allLeagues.api';
import ListHeader from './components/ListHeader/ListHeader';
import ListRow from './components/ListRow/ListRow';

const List = () => {
  useDocumentTitle('Leagues');
  const navigate = useNavigate();

  const { data, loading, error, refetch, allSports } = useAllLeaguesApi();
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, 200);
  const fuse = new Fuse(data || [], {
    keys: ['strLeague'],
    threshold: 0.3,
  });

  const [sportFilter, setSportFilter] = useState<string>('All Sports');

  const getFilteredData = (data: League[]) => {
    const searchData = debouncedSearch
      ? fuse.search(debouncedSearch).map((result) => result.item)
      : data;
    const sportData =
      sportFilter !== 'All Sports'
        ? searchData.filter((league) => league.strSport === sportFilter)
        : searchData;
    return sportData;
  };

  const dataToDisplay = getFilteredData(data || []);

  if (loading) {
    return (
      <Container h="100vh">
        <Center h="100%">
          <Loader size="xl" />
        </Center>
      </Container>
    );
  }

  if (error) {
    return (
      <Container h="100vh">
        <Center h="100%">
          <Stack>
            <Text>Error loading leagues. Please try again.</Text>
            <Button onClick={() => refetch()}>Try again</Button>
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <>
      {dataToDisplay && (
        <Stack gap="md">
          <Flex gap="md" direction={{ base: 'column', sm: 'row' }}>
            <TextInput
              type="search"
              w="100%"
              label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by league name"
              leftSection={<IconSearch size={16} />}
              rightSection={
                search !== '' && (
                  <CloseButton aria-label="Clear input" onClick={() => setSearch('')} />
                )
              }
            />
            <Select
              label="Filter by Sport"
              data={allSports().map((sport) => ({ value: sport, label: sport }))}
              value={sportFilter}
              defaultValue="All Sports"
              allowDeselect={false}
              onChange={(value) => setSportFilter(value || '')}
            />
          </Flex>

          <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
            <ListHeader />
            <Table.Tbody>
              {dataToDisplay.length === 0 && (
                <Table.Tr>
                  <Table.Td colSpan={3}>
                    <Center mt="md">
                      <Card withBorder p="md">
                        <Text>
                          No results found for {debouncedSearch && `"${debouncedSearch}" and`}
                          {`"${sportFilter}"`}
                        </Text>
                      </Card>
                    </Center>
                  </Table.Td>
                </Table.Tr>
              )}

              {dataToDisplay.map((league) => {
                return (
                  <ListRow
                    key={league.idLeague}
                    league={league}
                    onClick={(id) => navigate(`/leagues/${id}`)}
                  />
                );
              })}
            </Table.Tbody>
          </Table>
        </Stack>
      )}
    </>
  );
};

export default List;
