/*import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const AppLayout = () => (
  <>
    <Header />
    <main className="container" style={{ padding: 24 }}>
      <Outlet />
    </main>
  </>
);

export default AppLayout;*/

// src/layouts/AppLayout.tsx (example)
import React, { useState } from 'react';
import Header from '../../components/Header/Header';

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const handleLogout = () => {
    
    setIsAuth(false);
  };

  return (
    <>
      <Header isAuth={isAuth} onLogout={handleLogout} />
      <main>{children}</main>
    </>
  );
};

export default AppLayout;
