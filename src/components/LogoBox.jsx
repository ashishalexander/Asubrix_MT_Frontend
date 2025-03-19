import logo from '@/assets/images/logo.svg';
import logoLight from '@/assets/images/logo-light.svg';
import pymainlogo from '@/assets/images/logo-puthuyugham.png';
import pymainlogo3 from '@/assets/images/pymainlogo3.webp';
import { Link } from 'react-router-dom';
import '@/assets/scss/style.scss'; // Ensure the main SCSS file is imported

const LogoBox = () => {
  return (
    <Link className="navbar-brand" to="/demos/academy/home">
      <img className="light-mode-item navbar-brand-item logo-image" src={pymainlogo} alt="logo" />
    </Link>
  );
};

export default LogoBox;