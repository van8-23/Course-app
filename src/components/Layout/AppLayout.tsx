import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const AppLayout = () => (
  <>
    <Header />
    <main className="container" style={{ padding: 24 }}>
      <Outlet />
    </main>
  </>
);

export default AppLayout;
