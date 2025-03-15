import clsx from 'clsx';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavItem,
  Navbar,
  Nav,
  Collapse,
} from 'react-bootstrap';
import { BsBell } from 'react-icons/bs';
import { FaChevronDown } from 'react-icons/fa';
import LogoBox from '@/components/LogoBox';
import ProfileDropdown from '@/components/TopNavbar/components/ProfileDropdown';
import useScrollEvent from '@/hooks/useScrollEvent';
import useToggle from '@/hooks/useToggle';
import avatar3 from '@/assets/images/avatar/03.jpg';

const NotificationDropdown = () => (
  <Dropdown className="nav-item ms-2">
    <DropdownToggle className="btn btn-light btn-round arrow-none" as="a">
      <BsBell className="fa-fw" />
    </DropdownToggle>
    <span className="notif-badge animation-blink" />
    <DropdownMenu className="dropdown-menu-end p-0 shadow-lg border-0">
      <Card className="bg-transparent">
        <CardHeader className="bg-transparent border-bottom py-3 d-flex justify-content-between">
          <h6 className="m-0">Notifications <span className="badge bg-danger text-danger">2 new</span></h6>
          <a href="#" className="small">Clear all</a>
        </CardHeader>
        <CardBody className="p-0">
          <ul className="list-group list-unstyled">
            <li>
              <a href="#" className="list-group-item-action d-flex p-3">
                <div className="me-3">
                  <div className="avatar avatar-md">
                    <img className="avatar-img rounded-circle" src={avatar3} alt="avatar" />
                  </div>
                </div>
                <div>
                  <h6 className="mb-1">Update v2.3 completed</h6>
                  <p className="small text-body m-0">Find out about new features</p>
                  <small className="text-body">5 min ago</small>
                </div>
              </a>
            </li>
          </ul>
        </CardBody>
        <CardFooter className="text-center">
          <Link to="">See all incoming activity</Link>
        </CardFooter>
      </Card>
    </DropdownMenu>
  </Dropdown>
);

const TopNavigationBar = () => {
  const { scrollY } = useScrollEvent();
  const { isTrue: isOpen, toggle } = useToggle();

  return (
    <header className={clsx('navbar-light navbar-sticky', { 'navbar-sticky-on': scrollY >= 400 })}>
      <Navbar expand="xl" className="z-index-9">
        <Container>
          {/* Logo */}
          <Navbar.Brand>
            <LogoBox />
          </Navbar.Brand>

          {/* Navbar Toggler (Mobile) */}
          <Navbar.Toggle onClick={toggle} aria-controls="navbarCollapse" />

          {/* Collapsible Menu */}
          <Navbar.Collapse id="navbarCollapse" in={isOpen}>
            <Nav className="ms-auto">
              {[
                { label: 'Home', path: '/demos/academy/home' },
                { label: 'Courses', path: '/pages/course/grid-2' },
                { label: 'Free Test', path: '/pages/free-test' },
                { label: 'Gallery', path: '/pages/gallery' },
                { label: 'About', path: '/pages/about/about-us' },
                { label: 'Contact', path: '/pages/about/contact-us' },
              ].map(({ label, path }, idx) => (
                <NavItem key={idx}>
                  <Link className="nav-link" to={path}>{label}</Link>
                </NavItem>
              ))}
            </Nav>
          </Navbar.Collapse>

          {/* Right-Side Icons */}
          <Nav className="ms-auto">
            <NotificationDropdown />
            <ProfileDropdown className="nav-item ms-3" />
          </Nav>
        </Container>
      </Navbar>
      <hr className="my-0" />
    </header>
  );
};

export default TopNavigationBar;
