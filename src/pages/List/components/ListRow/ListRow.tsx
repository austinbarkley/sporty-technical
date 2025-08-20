import { Table } from '@mantine/core';
import { League } from '@/services/api/allLeagues.api';

export interface IListRowProps {
  league: League;
  onClick: (id: string) => void;
}

const ListRow = ({ league, onClick }: IListRowProps) => {
  return (
    <Table.Tr
      key={league.idLeague}
      tabIndex={0}
      onClick={() => onClick(league.idLeague)}
      style={{ cursor: 'pointer' }}
    >
      <Table.Td>{league.strLeague}</Table.Td>
      <Table.Td>{league.strSport}</Table.Td>
      <Table.Td>{league.strLeagueAlternate}</Table.Td>
    </Table.Tr>
  );
};

export default ListRow;
