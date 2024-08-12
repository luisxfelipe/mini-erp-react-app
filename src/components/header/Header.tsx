import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className='flex flex-col h-screen border-2 w-1/5'>
      <Link to='/dashboard'>Mini - ERP</Link>
      <Link to='/dashboard'>Dashboard</Link>
      <Link to='/dashboard/new'>Cadastrar carro</Link>
    </header>
  );
};
