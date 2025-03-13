import { Container } from "react-bootstrap";

const PrivacyPolicy = () => {
  return (
    <Container className="my-5">
      <h1 className="mb-4">Privacy Policy</h1>
      <p>Last updated: March 13, 2025</p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to <strong>Puthuyugam</strong>. We respect your privacy and are committed to protecting your personal data.
        This privacy policy explains how we collect, use, and safeguard your information.
      </p>

      <h2>2. Information We Collect</h2>
      <p>We may collect and process the following types of data:</p>
      <ul>
        <li>Personal identification information (Name, email address, phone number, etc.)</li>
        <li>Usage data (pages visited, time spent, and browsing patterns)</li>
        <li>Cookies and tracking data</li>
      </ul>

      <h2>3. How We Use Your Data</h2>
      <p>We use your data for the following purposes:</p>
      <ul>
        <li>To provide and maintain our services</li>
        <li>To improve user experience</li>
        <li>To send promotional emails (only if you subscribe)</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2>4. Sharing Your Information</h2>
      <p>
        We do not sell, trade, or rent your personal information to third parties. However, we may share data with service
        providers who assist us in operating our platform.
      </p>

      <h2>5. Security</h2>
      <p>
        We take data security seriously and implement appropriate measures to protect your personal information from
        unauthorized access or disclosure.
      </p>

      <h2>6. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Request correction or deletion of your data</li>
        <li>Opt-out of marketing communications</li>
      </ul>

      <h2>7. Changes to This Policy</h2>
      <p>
        We may update this privacy policy from time to time. The latest version will always be available on our website.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        If you have any questions about our Privacy Policy, please contact us at:
        <br />
        <strong>Email:</strong> support@example.com
        <br />
        <strong>Phone:</strong> +1234 567 890
      </p>
    </Container>
  );
};

export default PrivacyPolicy;
