import { useState } from 'react';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  Center,
  Container,
  Flex,
  Image,
  List,
  Loader,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { useLeagueAllSeasonApi } from '@/services/api/leagueAllSeason.api';

const League = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useDocumentTitle(`League ${id}`);

  const { data, loading, error } = useLeagueAllSeasonApi(id || '');
  const [imageLoaded, setImageLoaded] = useState(false);

  if (loading) {
    return (
      <Container h="100vh">
        <Center h="100%">
          <Loader size="xl" />
        </Center>
      </Container>
    );
  }

  if (!id) {
    return <div>No league id</div>;
  }

  if (error) {
    return (
      <Container h="100vh">
        <Center h="100%">
          <Text>Error: {error.message}</Text>
        </Center>
      </Container>
    );
  }

  if (!data && !loading) {
    return (
      <Container h="100vh">
        <Center h="100%">
          <Text>No data available</Text>
        </Center>
      </Container>
    );
  }

  if (data && data.seasons.length === 0) {
    return (
      <Container h="100vh">
        <Center h="100%">
          <Text>No seasons found</Text>
        </Center>
      </Container>
    );
  }

  return (
    <div>
      <Button leftSection={<IconArrowLeft />} onClick={() => navigate(-1)} mb="md">
        Back
      </Button>

      <Stack gap="md">
        <Card withBorder title={`League ${id}`} shadow="sm" radius="md">
          <Title order={1}>League {id}</Title>
          <Card.Section p="sm">
            <Flex justify="center" align="center" gap="md">
              {!imageLoaded && <Skeleton width={150} height={150} radius="md" />}
              <Image
                src={data?.seasons[0]?.strBadge}
                alt="Badge"
                width={150}
                height={150}
                maw={150}
                fit="contain"
                onLoad={() => setImageLoaded(true)}
                style={{ display: imageLoaded ? 'block' : 'none' }}
              />
            </Flex>
          </Card.Section>
        </Card>

        <Text>Number of seasons: {data?.seasons.length}</Text>
        <List>
          {data?.seasons.map((season) => (
            <List.Item key={season.strSeason}>{season.strSeason}</List.Item>
          ))}
        </List>
      </Stack>
    </div>
  );
};

export default League;
