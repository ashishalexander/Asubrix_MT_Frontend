/**
 * Admin Layout SCSS:
 * src/assets/scss/components/admin/layout.scss
 * - Includes styles for sidebar, navbar, and overall admin layout structure
 */

import logoImg from '@/assets/images/logo-light.svg';
import logoImg2 from '@/assets/images/pymainlogo.webp';
import AppMenu from '@/components/admin/AppMenu';
import { useAuthContext } from '@/context/useAuthContext';
import { useLayoutContext } from '@/context/useLayoutContext';
import useViewPort from '@/hooks/useViewPort';
import { lazy } from 'react';
import { Offcanvas, OffcanvasBody, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsGearFill, BsGlobe, BsPower } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const NavbarTopbar = lazy(() => import('@/components/adminLayoutComponents/NavbarTopbar'));

const AdminLayout = ({ children }) => {
  const { width } = useViewPort();
  const { appMenuControl } = useLayoutContext();
  const { removeSession } = useAuthContext();

  const SettingsMenu = () => (
    <div className="px-3 py-3 border-top w-100 position-sticky bottom-0 bg-theme-secondary">
      <div className="d-flex align-items-center justify-content-between text-primary-hover">
        <OverlayTrigger overlay={<Tooltip id="tooltip-settings">Settings</Tooltip>}>
          <Link className="h5 mb-0 text-white" to="/admin/admin-settings">
            <BsGearFill />
          </Link>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="tooltip-home">Home</Tooltip>}>
          <Link className="h5 mb-0 text-white" to="/">
            <BsGlobe />
          </Link>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="tooltip-signout">Sign out</Tooltip>}>
          <Link className="h5 mb-0 text-white" onClick={removeSession} to="/auth/sign-in">
            <BsPower />
          </Link>
        </OverlayTrigger>
      </div>
    </div>
  );

  return (
    <main>
      <nav className="navbar sidebar navbar-expand-xl navbar-dark bg-theme-secondary">
        <div className="d-flex align-items-center">
          <Link className="navbar-brand" to="/">
            <img className="navbar-brand-item" src={logoImg2} alt="logo" />
          </Link>
        </div>
        
        {width >= 1200 ? (
          <div className="sidebar-content d-flex flex-column bg-theme-secondary h-100">
            <div className="flex-grow-1 overflow-auto" style={{ minHeight: 0 }}>
              <div className="pb-5 px-3">
                <AppMenu />
              </div>
            </div>
            <SettingsMenu />
          </div>
        ) : (
          <Offcanvas 
            className="sidebar-offcanvas h-100" 
            show={appMenuControl.open} 
            placement="start" 
            onHide={appMenuControl.toggle}
          >
            <OffcanvasBody className="d-flex flex-column bg-theme-secondary p-0">
              <div className="flex-grow-1 overflow-auto" style={{ minHeight: 0 }}>
                <div className="pb-5 px-3">
                  <AppMenu />
                </div>
              </div>
              <SettingsMenu />
            </OffcanvasBody>
          </Offcanvas>
        )}
      </nav>
      <div className="page-content">
        <NavbarTopbar />
        <div className="page-content-wrapper border">{children}</div>
      </div>
    </main>
  );
};

export default AdminLayout;
