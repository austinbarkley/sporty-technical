import { Table } from '@mantine/core';
import { LeagueSort } from '@/services/api/allLeagues.api';

interface IListHeaderProps {
  onColumnClick?: (column: LeagueSort) => void;
}

const ListHeader = ({ onColumnClick }: IListHeaderProps) => {
  const isClickable = onColumnClick !== undefined;
  const clickableStyle = isClickable ? { cursor: 'pointer' } : {};
  const tabIndex = isClickable ? 0 : undefined;

  return (
    <Table.Thead>
      <Table.Tr>
        <Table.Th
          onClick={() => onColumnClick?.('strLeague')}
          tabIndex={tabIndex}
          style={clickableStyle}
        >
          League
        </Table.Th>
        <Table.Th
          onClick={() => onColumnClick?.('strSport')}
          tabIndex={tabIndex}
          style={clickableStyle}
        >
          Sport
        </Table.Th>
        <Table.Th
          onClick={() => onColumnClick?.('strLeagueAlternate')}
          tabIndex={tabIndex}
          style={clickableStyle}
        >
          Alternate Name
        </Table.Th>
      </Table.Tr>
    </Table.Thead>
  );
};

export default ListHeader;
