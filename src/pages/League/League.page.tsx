import { useParams } from 'react-router-dom';

const League = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>League {id}</h1>
    </div>
  );
};

export default League;
