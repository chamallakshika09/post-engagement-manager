import { ReactNode } from 'react';
import Drawer from '../components/Drawer';

const NavbarLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar fixed bg-base-100 z-20 border-b border-b-base-300" />
      <div className="drawer lg:drawer-open">
        <input type="checkbox" className="drawer-toggle" readOnly={true} />
        {children}
        <Drawer />
      </div>
    </div>
  );
};

export default NavbarLayout;
