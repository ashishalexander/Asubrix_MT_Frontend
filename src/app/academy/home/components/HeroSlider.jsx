import { useState, useEffect } from 'react';
import { Card, Col, Row, Container, Spinner, Alert } from 'react-bootstrap';
import { renderToString } from 'react-dom/server';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import TinySlider from '@/components/TinySlider';
import httpClient from '@/helpers/httpClient';

const HeroSlider = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [renderSlider, setRenderSlider] = useState(false);

  // Fetch active banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const response = await httpClient.get('/api/banners/active');
        if (response.data.success) {
          setBanners(response.data.data);
        } else {
          setError('Failed to fetch banners');
        }
      } catch (error) {
        setError(`Error: ${error.response?.data?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Only render slider after loading is complete and banners exist
  useEffect(() => {
    if (!loading && banners.length > 0) {
      // Small delay to ensure DOM is fully updated before slider initializes
      const timer = setTimeout(() => {
        setRenderSlider(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [loading, banners]);

  const courseSliderSettings = {
    arrowKeys: true,
    gutter: 0,
    mouseDrag: true,
    autoplayButton: false,
    autoplayButtonOutput: false,
    controlsText: [renderToString(<FaChevronLeft size={16} />), renderToString(<FaChevronRight size={16} />)],
    autoplay: false,
    controls: true,
    edgePadding: 0,
    items: 1,
    nav: false,
    loop: true,
    speed: 1000,
    responsive: {
      320: {
        items: 1,
        controls: true
      },
      768: {
        items: 1,
        controls: true
      }
    }
  };

  // Display loading spinner while fetching banners
  if (loading) {
    return (
      <section className="pt-0">
        <div className="d-flex justify-content-center align-items-center" style={{ height: '500px' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading banners...</span>
          </Spinner>
        </div>
      </section>
    );
  }

  // Display error message if fetching failed
  if (error) {
    return (
      <section className="pt-0">
        <Container className="py-5">
          <Alert variant="danger">
            {error}
          </Alert>
        </Container>
      </section>
    );
  }

  // If no banners found, display a placeholder or nothing
  if (banners.length === 0) {
    return (
      <section className="pt-0">
        <div className="bg-light text-center py-5" style={{ height: '300px' }}>
          <Container className="d-flex align-items-center justify-content-center h-100">
            <p className="text-muted mb-0">No banners available</p>
          </Container>
        </div>
      </section>
    );
  }

  // Return banner content without the slider until we're ready to render it
  if (!renderSlider) {
    return (
      <section className="pt-0">
        <Row className="mx-0">
          <Col xs={12} className="p-0">
            <div className="overflow-hidden">
              <Card 
                className="overflow-hidden h-500px h-md-600px text-start rounded-0" 
                style={{
                  backgroundImage: `url(${banners[0]?.image})`,
                  backgroundPosition: 'center left',
                  backgroundSize: 'cover'
                }}
              >
                <div className="card-img-overlay d-flex align-items-center p-2 p-sm-4">
                  <Container>
                    <Row className="justify-content-start">
                      <Col xs={11} lg={7}>
                        <h1 className="mb-0 text-black display-6">
                          Get new skills <br /> for the&nbsp;
                          <span className="position-relative">digital world</span>
                        </h1>
                        <p className="text-black w-75">
                          Get the right professional certificate program for you. See what course other students and experts in your domain are
                          learning on
                        </p>
                        <a href={banners[0]?.link || "#"} className="btn mb-0 text-white bg-primary">
                          Get Started
                        </a>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </section>
    );
  }

  return (
    <section className="pt-0">
      <Row className="mx-0">
        <Col xs={12} className="p-0">
          <div className="tiny-slider hero-slider arrow-round arrow-blur arrow-hover rounded-0 overflow-hidden">
            <TinySlider settings={courseSliderSettings} className="tiny-slider-inner">
              {banners.map((banner) => (
                <Card 
                  key={banner._id} 
                  className="overflow-hidden h-500px h-md-600px text-start rounded-0" 
                  style={{
                    backgroundImage: `url(${banner.image})`,
                    backgroundPosition: 'center left',
                    backgroundSize: 'cover'
                  }}
                >
                  <div className="card-img-overlay d-flex align-items-center p-2 p-sm-4">
                    <Container>
                      <Row className="justify-content-start">
                        <Col xs={11} lg={7}>
                          <h1 className="mb-0 text-black display-6">
                            Get new skills <br /> for the&nbsp;
                            <span className="position-relative">digital world</span>
                          </h1>
                          <p className="text-black w-75">
                            Get the right professional certificate program for you. See what course other students and experts in your domain are
                            learning on
                          </p>
                          <a href={banner.link || "#"} className="btn mb-0 text-white bg-primary">
                            Get Started
                          </a>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </Card>
              ))}
            </TinySlider>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default HeroSlider;