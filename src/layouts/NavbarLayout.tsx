import { ReactNode } from 'react';
import Drawer from '../components/Drawer';

const NavbarLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar fixed bg-base-100 z-20 border-b border-b-base-300" />
      <div className="drawer lg:drawer-open">
        <input type="checkbox" className="drawer-toggle" readOnly={true} />
        <div className="drawer-content">
          <div className="pt-24">
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-9">{children}</div>
          </div>
        </div>
        <Drawer />
      </div>
    </div>
  );
};

export default NavbarLayout;
