import React from 'react';
import Sidebar from './Sidebar';
import { User } from '../types';

interface MyHomeLayoutProps {
  children: React.ReactNode;
  user: User;
}

const MyHomeLayout: React.FC<MyHomeLayoutProps> = ({ children, user }) => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row min-h-[calc(100vh-80px)] gap-6 lg:gap-8 py-6 lg:py-8">
        <aside className="w-full md:w-64 flex-shrink-0 flex flex-col h-auto md:sticky md:top-28 md:h-[calc(100vh-140px)]">
          <Sidebar role={user.role} />
        </aside>
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MyHomeLayout;
