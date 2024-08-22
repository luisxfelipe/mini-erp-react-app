import { ReactNode } from 'react';

export const Container = ({ children }: { children: ReactNode }) => {
  return <div className='w-full h-screen'>{children}</div>;
};
