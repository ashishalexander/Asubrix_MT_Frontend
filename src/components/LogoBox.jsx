import logo from '@/assets/images/logo.svg';
import logoLight from '@/assets/images/logo-light.svg';
import { Link } from 'react-router-dom';
const LogoBox = ({
  height,
  width
}) => {
  return <Link className="navbar-brand" to="/">
      <img height={height} width={width} className="light-mode-item navbar-brand-item w-auto" src={"https://diy-assets.classplus.co/_next/image?url=https://ali-cdn-diy-public.classplus.co/prod/LogoHead_1707502308358.jpeg&w=1920&q=75"} alt="logo" />
      <img height={height} width={width} className="dark-mode-item navbar-brand-item w-auto" src={"https://diy-assets.classplus.co/_next/image?url=https://ali-cdn-diy-public.classplus.co/prod/LogoHead_1707502308358.jpeg&w=1920&q=75"} alt="logo" />
    </Link>;
};
export default LogoBox;
