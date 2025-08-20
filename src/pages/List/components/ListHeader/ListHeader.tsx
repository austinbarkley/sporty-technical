import { Table } from '@mantine/core';

interface IListHeaderProps {
  onColumnClick: (column: 'strLeague' | 'strSport' | 'strLeagueAlternate') => void;
}

const ListHeader = ({ onColumnClick }: IListHeaderProps) => {
  return (
    <Table.Thead>
      <Table.Tr>
        <Table.Th
          onClick={() => onColumnClick('strLeague')}
          tabIndex={0}
          style={{ cursor: 'pointer' }}
        >
          League
        </Table.Th>
        <Table.Th
          onClick={() => onColumnClick('strSport')}
          tabIndex={0}
          style={{ cursor: 'pointer' }}
          onClickCapture={(e) => {
            e.stopPropagation();
            onColumnClick('strSport');
          }}
        >
          Sport
        </Table.Th>
        <Table.Th
          onClick={() => onColumnClick('strLeagueAlternate')}
          tabIndex={0}
          style={{ cursor: 'pointer' }}
        >
          Alternate Name
        </Table.Th>
      </Table.Tr>
    </Table.Thead>
  );
};

export default ListHeader;
