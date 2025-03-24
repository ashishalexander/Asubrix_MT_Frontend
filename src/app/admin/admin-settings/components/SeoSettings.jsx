import { Card, Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

const SeoSettings = () => {
  const [seoConfig, setSeoConfig] = useState({
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    twitterCard: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
    canonicalUrl: '',
    robotsTxt: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeoConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(seoConfig);
  };

  return (
    <Card>
      <Card.Header>
        <h4 className="card-title mb-0">SEO Settings</h4>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Meta Title</Form.Label>
                <Form.Control
                  type="text"
                  name="metaTitle"
                  value={seoConfig.metaTitle}
                  onChange={handleChange}
                  placeholder="Enter meta title"
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label>Meta Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="metaDescription"
                  value={seoConfig.metaDescription}
                  onChange={handleChange}
                  placeholder="Enter meta description"
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label>Meta Keywords</Form.Label>
                <Form.Control
                  type="text"
                  name="metaKeywords"
                  value={seoConfig.metaKeywords}
                  onChange={handleChange}
                  placeholder="Enter keywords separated by commas"
                />
              </Form.Group>
            </Col>

            {/* <Col md={6}>
              <Form.Group>
                <Form.Label>OG Title</Form.Label>
                <Form.Control
                  type="text"
                  name="ogTitle"
                  value={seoConfig.ogTitle}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>OG Description</Form.Label>
                <Form.Control
                  type="text"
                  name="ogDescription"
                  value={seoConfig.ogDescription}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label>OG Image</Form.Label>
                <Form.Control
                  type="file"
                  name="ogImage"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Twitter Card</Form.Label>
                <Form.Select
                  name="twitterCard"
                  value={seoConfig.twitterCard}
                  onChange={handleChange}
                >
                  <option value="">Select card type</option>
                  <option value="summary">Summary</option>
                  <option value="summary_large_image">Summary Large Image</option>
                  <option value="app">App</option>
                  <option value="player">Player</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Twitter Title</Form.Label>
                <Form.Control
                  type="text"
                  name="twitterTitle"
                  value={seoConfig.twitterTitle}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label>Canonical URL</Form.Label>
                <Form.Control
                  type="url"
                  name="canonicalUrl"
                  value={seoConfig.canonicalUrl}
                  onChange={handleChange}
                  placeholder="Enter canonical URL"
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label>Robots.txt Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="robotsTxt"
                  value={seoConfig.robotsTxt}
                  onChange={handleChange}
                  placeholder="Enter robots.txt content"
                />
              </Form.Group>
            </Col> */}

            <Col md={12}>
              <div className="text-end">
                <button type="submit" className="btn btn-primary">Save SEO Settings</button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SeoSettings; 