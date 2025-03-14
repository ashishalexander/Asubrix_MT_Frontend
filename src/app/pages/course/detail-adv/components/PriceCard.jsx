import { currency } from "@/context/constants";
import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import {
  FaCopy,
  FaFacebookSquare,
  FaLinkedin,
  FaShareAlt,
  FaStar,
  FaStarHalfAlt,
  FaTwitterSquare,
} from "react-icons/fa";
import { FaTag } from "react-icons/fa6";
import avatar5 from "@/assets/images/avatar/05.jpg";

const PriceCard = () => {
  return (
    <Card className="card-body border p-4">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="fw-bold mb-0 me-2">{currency}295.55</h3>
        <Dropdown>
          <DropdownToggle
            as="a"
            className="btn btn-sm arrow-none btn-light rounded mb-0 small"
            role="button"
            aria-expanded="false"
          >
            <FaShareAlt className="fa-fw" />
          </DropdownToggle>
          <DropdownMenu
            className="dropdown-w-sm dropdown-menu-end min-w-auto shadow rounded"
            aria-labelledby="dropdownShare"
          >
            <DropdownItem href="#">
              <FaTwitterSquare className="me-2" />
              Twitter
            </DropdownItem>
            <DropdownItem href="#">
              <FaFacebookSquare className="me-2" />
              Facebook
            </DropdownItem>
            <DropdownItem href="#">
              <FaLinkedin className="me-2" />
              LinkedIn
            </DropdownItem>
            <DropdownItem href="#">
              <FaCopy className="me-2" />
              Copy link
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className="mt-3 d-grid">
        <Button variant="success">Buy now</Button>
      </div>

      <hr />

      {/* Coupons Section */}
      <h5 className="mb-3">Available Offers?</h5>
      <div
        className="border p-2 rounded"
        style={{
          maxHeight: "150px",
          overflowY: "auto",
          border: "1px solid #ddd",
        }}
      >
        <div className="border rounded p-2 mb-2 text-center bg-light">
          <FaTag className="text-warning me-1" />
          <strong>WELCOME</strong>
          <p className="mb-0 small">5% off up to ₹1,500</p>
        </div>
        <div className="border rounded p-2 mb-2 text-center bg-light">
          <FaTag className="text-warning me-1" />
          <strong>PUDHUYUGAM25</strong>
          <p className="mb-0 small">50% off up to ₹2,500</p>
        </div>
        <div className="border rounded p-2 mb-2 text-center bg-light">
          <FaTag className="text-warning me-1" />
          <strong>SUMMER30</strong>
          <p className="mb-0 small">30% off up to ₹1,000</p>
        </div>
        <div className="border rounded p-2 text-center bg-light">
          <FaTag className="text-warning me-1" />
          <strong>FESTIVE50</strong>
          <p className="mb-0 small">Flat ₹500 off</p>
        </div>
      </div>

      <hr />

      <div className="d-sm-flex align-items-center">
        <div className="avatar avatar-xl">
          <img
            className="avatar-img rounded-circle"
            src={avatar5}
            alt="avatar"
          />
        </div>
        <div className="ms-sm-3 mt-2 mt-sm-0">
          <h5 className="mb-0">
            <a href="#">By Jacqueline Miller</a>
          </h5>
          <p className="mb-0 small">Founder Eduport company</p>
        </div>
      </div>

      <div className="d-sm-flex justify-content-sm-between align-items-center mt-0 mt-sm-2">
        <ul className="list-inline mb-0">
          {[...Array(4)].map((_, idx) => (
            <li key={idx} className="list-inline-item me-1 small">
              <FaStar size={14} className="text-warning" />
            </li>
          ))}
          <li className="list-inline-item me-1 small">
            <FaStarHalfAlt size={14} className="text-warning" />
          </li>
          <li className="list-inline-item ms-2 h6 fw-light mb-0">4.5/5.0</li>
        </ul>
      </div>
    </Card>
  );
};

export default PriceCard;
