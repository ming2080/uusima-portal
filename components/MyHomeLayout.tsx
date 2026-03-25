import React from 'react';
import Sidebar from './Sidebar';
import { User } from '../types';

interface MyHomeLayoutProps {
  children: React.ReactNode;
  user: User;
}

const MyHomeLayout: React.FC<MyHomeLayoutProps> = ({ children, user }) => {
  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-gray-50">
      <Sidebar role={user.role} />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default MyHomeLayout;
