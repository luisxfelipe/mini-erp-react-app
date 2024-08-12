import { useContext } from 'react';

import { AuthContext } from '../../contexts/authContext';

export const Home = () => {
  const { user } = useContext(AuthContext);
  return <div>Home - {user?.name}</div>;
};
