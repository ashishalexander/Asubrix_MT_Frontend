import { Link } from 'react-router-dom'
import { Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap'
import { FaChevronUp, FaFacebookF, FaYoutube, FaInstagram, FaTelegramPlane, FaTwitter } from 'react-icons/fa'
import { currentYear, developedBy, developedByLink } from '@/context/constants'
import clsx from 'clsx'
import logo from '@/assets/images/logo.svg'
import logoLight from '@/assets/images/logo-light.svg'
// import pymainlogo from '@/assets/images/pymainlogo.webp';
import pylogo from '@/assets/images/puthuyougam_logo.png';
import googlePlay from '@/assets/images/client/google-play.svg'
import playStore from '@/assets/images/client/app-store.svg'
import { footerLinks } from '@/assets/data/footer-items'
import '@/assets/scss/style.scss'; 

const Footer = ({ className }) => {
  return (
    <footer className={clsx('pt-5', className)}>
      <Container>
        <Row className="g-4">
          <Col lg={3}>
            <Link className="me-0" to="/">
              <img className="light-mode-item logo-image-footer" width={189} height={40} src={pylogo} alt="logo" />
              {/* <img className="dark-mode-item h-40px" width={189} height={40} src={pymainlogo} alt="logo" /> */}
            </Link>
            <p className="my-3">
            Pudhuyugam Academy embarked on a resolute mission to deliver top-notch education for a spectrum of competitive examinations  </p>
            <ul className="list-inline mb-0 mt-3">
              <li className="list-inline-item">
                <a
                  className="btn btn-white btn-sm shadow px-2 text-facebook"
                  href="https://www.facebook.com/people/Pudhuyugamacademy/61553787314656/"
                  target="_blank"
                  rel="noopener noreferrer">
                  <FaFacebookF className="fa-fw" />
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  className="btn btn-white btn-sm shadow px-2 text-instagram"
                  href="https://www.instagram.com/pudhuyugamacademy/"
                  target="_blank"
                  rel="noopener noreferrer">
                  <FaInstagram className="fa-fw" />
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  className="btn btn-white btn-sm shadow px-2 text-telegram"
                  href="https://t.me/pudhuyugam"
                  target="_blank"
                  rel="noopener noreferrer">
                  <FaTelegramPlane className="fa-fw" />
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  className="btn btn-white btn-sm shadow px-2 text-youtube"
                  href="https://www.youtube.com/@PudhuyugamAcademy"
                  target="_blank"
                  rel="noopener noreferrer">
                  <FaYoutube className="fa-fw" />
                </a>
              </li>
            </ul>
          </Col>
          <Col lg={6}>
            <Row className="g-4">
              {footerLinks.map((link, idx) => (
                <Col xs={6} md={4} key={idx}>
                  <h5 className="mb-2 mb-md-4">{link.title}</h5>
                  <ul className="nav flex-column">
                    {link.items.map((item, idx) => (
                      <li className="nav-item" key={idx}>
                        <Link className="nav-link" to={item.link ?? ''}>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Col>
              ))}
            </Row>
          </Col>
          <Col lg={3}>
            <h5 className="mb-2 mb-md-4">Contact</h5>
            <p className="mb-2">4, Hari Garderns, Ramanuja Nagar, Uppilipayam Post, Coimbatore - 641 015 Contact Number : 9488722512,  6381048227</p>
            <p className="mb-0">
              Email:<span className="h6 fw-light ms-2">official@pudhuyugamacademy.in </span>
            </p>
            <Row className="g-2 mt-2">
              <Col xs={6} sm={4} md={3} lg={6}>
                <span role="button">
                  <img height={45} width={145} className="w-auto" src={googlePlay} alt="google-play" />
                </span>
              </Col>
              <Col xs={6} sm={4} md={3} lg={6}>
                <span role="button">
                  <img height={45} width={145} className="w-auto" src={playStore} alt="app-store" />
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr className="mt-4 mb-0" />
        <div className="py-3">
          <Container className="px-0">
            <div className="d-lg-flex justify-content-between align-items-center py-3 text-center text-md-left">
              <div className="text-body text-primary-hover">
                Powered by{' '}
                <Link to="https://asubrix.com/ " target="_blank" className="text-body">
                  Asubrix International Pvt Ltd
                </Link>
                . © Pudhuyugam Academy {currentYear}. All rights reserved
              </div>
              <div className="justify-content-center mt-3 mt-lg-0">
                <ul className="nav list-inline justify-content-center mb-0">
                  <li className="list-inline-item">
                    <a className="nav-link" href="/pages/terms-conditions">
                      Terms and Conditions
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="nav-link pe-0" href="/pages/privacy-policy">
                      Privacy policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>
      </Container>
    </footer>
  )
}
export default Footer
