import { Container } from "react-bootstrap";
import TopNavigationBar from "@/components/TopNavigationBar";
import Footer from "@/components/Footer";
import HeroImage from "./components/HeroImage";

const TermsAndConditions = () => {
  return (
    <>
      <TopNavigationBar />
      <HeroImage/>
      <Container className="my-5">
        <h3 className="mb-4">Terms and Conditions</h3>
        <p>Last updated: March 13, 2025</p>

        <h4>1. Introduction</h4>
      <p>
        Welcome to <strong>pudhuyugam</strong>. By accessing or using our website, you agree to be bound by these Terms and
        Conditions. If you do not agree with any part of these terms, please do not use our services.
      </p>

      <h4>2. Use of the Website</h4>
      <p>By using this site, you agree to:</p>
      <ul>
        <li>Use the website only for lawful purposes</li>
        <li>Not engage in any activity that disrupts or harms the website</li>
        <li>Not attempt to gain unauthorized access to our systems</li>
      </ul>

      <h4>3. User Accounts</h4>
      <p>
        If you create an account, you are responsible for maintaining the confidentiality of your account information.
        You agree to notify us immediately of any unauthorized access or use of your account.
      </p>

      <h4>4. Intellectual Property</h4>
      <p>
        All content on this website, including text, images, logos, and trademarks, is the property of Eduport and is
        protected by copyright and intellectual property laws.
      </p>

      <h4>5. Limitation of Liability</h4>
      <p>
        We do not guarantee that our website will always be available or free from errors. We are not responsible for any
        damages that result from your use of the site.
      </p>

      <h4>6. Termination</h4>
      <p>
        We reserve the right to suspend or terminate your access to our website at any time if you violate these terms.
      </p>

      <h4>7. Changes to Terms</h4>
      <p>
        We may update these terms from time to time. Continued use of the website after changes means you accept the
        revised terms.
      </p>

      <h4>8. Contact Us</h4>
      <p>
        If you have any questions about our Terms and Conditions, please contact us at:
        <br />
        <strong>Email:</strong> support@example.com
        <br />
        <strong>Phone:</strong> +1234 567 890
      </p>
    </Container>
    <Footer className="custom-footer" />
    </>
  );
};

export default TermsAndConditions;
