import { ReactNode } from 'react';

export const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className='w-full flex h-screen border-2 bg-slate-400'>{children}</div>
  );
};
