import { Card, Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

const WebsiteSettings = () => {
  const [settings, setSettings] = useState({
    siteName: '',
    siteTitle: '',
    siteDescription: '',
    siteEmail: '',
    sitePhone: '',
    siteAddress: '',
    siteLogo: null,
    siteFavicon: null,
    copyrightText: '',
    facebookUrl: '',
    twitterUrl: '',
    linkedinUrl: '',
    instagramUrl: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setSettings(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(settings);
  };

  return (
    <Card>
      <Card.Header>
        <h4 className="card-title mb-0">Website Settings</h4>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Site Name</Form.Label>
                <Form.Control
                  type="text"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                  placeholder="Enter site name"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Site Title</Form.Label>
                <Form.Control
                  type="text"
                  name="siteTitle"
                  value={settings.siteTitle}
                  onChange={handleChange}
                  placeholder="Enter site title"
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label>Site Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="siteDescription"
                  value={settings.siteDescription}
                  onChange={handleChange}
                  placeholder="Enter site description"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Site Email</Form.Label>
                <Form.Control
                  type="email"
                  name="siteEmail"
                  value={settings.siteEmail}
                  onChange={handleChange}
                  placeholder="Enter site email"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Site Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="sitePhone"
                  value={settings.sitePhone}
                  onChange={handleChange}
                  placeholder="Enter site phone"
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label>Site Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="siteAddress"
                  value={settings.siteAddress}
                  onChange={handleChange}
                  placeholder="Enter site address"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Site Logo</Form.Label>
                <Form.Control
                  type="file"
                  name="siteLogo"
                  onChange={handleChange}
                  accept="image/*"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Site Favicon</Form.Label>
                <Form.Control
                  type="file"
                  name="siteFavicon"
                  onChange={handleChange}
                  accept="image/x-icon,image/png"
                />
              </Form.Group>
          </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label>Copyright Text</Form.Label>
                <Form.Control
                  type="text"
                  name="copyrightText"
                  value={settings.copyrightText}
                  onChange={handleChange}
                  placeholder="Enter copyright text"
                />
              </Form.Group>
          </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Facebook URL</Form.Label>
                <Form.Control
                  type="url"
                  name="facebookUrl"
                  value={settings.facebookUrl}
                  onChange={handleChange}
                  placeholder="Enter Facebook URL"
                />
              </Form.Group>
          </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Twitter URL</Form.Label>
                <Form.Control
                  type="url"
                  name="twitterUrl"
                  value={settings.twitterUrl}
                  onChange={handleChange}
                  placeholder="Enter Twitter URL"
                />
              </Form.Group>
          </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>LinkedIn URL</Form.Label>
                <Form.Control
                  type="url"
                  name="linkedinUrl"
                  value={settings.linkedinUrl}
                  onChange={handleChange}
                  placeholder="Enter LinkedIn URL"
                />
              </Form.Group>
          </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Instagram URL</Form.Label>
                <Form.Control
                  type="url"
                  name="instagramUrl"
                  value={settings.instagramUrl}
                  onChange={handleChange}
                  placeholder="Enter Instagram URL"
                />
              </Form.Group>
          </Col>

            <Col md={12}>
              <div className="text-end">
                <button type="submit" className="btn btn-primary">Save Settings</button>
            </div>
          </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default WebsiteSettings;
