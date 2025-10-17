import type { ReactNode } from 'react';

type MainContainerProps = {
  children: ReactNode;
};

export default function MainContainer({ children }: MainContainerProps) {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
