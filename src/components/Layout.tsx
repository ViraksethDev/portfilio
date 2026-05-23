import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import CustomCursor from './CustomCursor';
import Footer from './Footer';

function Layout() {
  return (
    <div className="min-h-screen bg-obsidian relative">
      <CustomCursor />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
