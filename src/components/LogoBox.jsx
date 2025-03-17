import logo from '@/assets/images/logo.svg';
import logoLight from '@/assets/images/logo-light.svg';
import pymainlogo from '@/assets/images/pymainlogo.webp';
import pymainlogo3 from '@/assets/images/pymainlogo3.webp';
import { Link } from 'react-router-dom';
const LogoBox = ({
  height,
  width
}) => {
  return <Link className="navbar-brand" to="/">
      <img height={height} width={width} className="light-mode-item navbar-brand-item w-auto" src={pymainlogo3} alt="logo" />
      {/* <img height={height} width={width} className="dark-mode-item navbar-brand-item w-auto" src={pymainlogo2} alt="logo" /> */}
    </Link>;
};
export default LogoBox;
