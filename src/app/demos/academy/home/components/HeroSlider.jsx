import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TinySlider from '@/components/TinySlider';
import { renderToString } from 'react-dom/server';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import backgroundImg1 from '@/assets/images/bg/01.jpg';
import backgroundImg2 from '@/assets/images/bg/02.jpg';
import backgroundBannerImg from '@/assets/images/bg/home-banner.webp';
import backgroundBannerImg2 from '@/assets/images/bg/home-banner2.webp';

const HeroSlider = () => {
  const courseSliderSettings = {
    arrowKeys: true,
    gutter: 0,
    mouseDrag: true,
    autoplayButton: false,
    autoplayButtonOutput: false,
    nested: 'inner',
    controlsText: [renderToString(<FaChevronLeft size={16} />), renderToString(<FaChevronRight size={16} />)],
    autoplay: false,
    controls: true,
    edgePadding: 2,
    items: 1,
    nav: false
  };

  return (
    <section className="pt-0">
      <div className="w-100">
        <Row className="mx-0">
          <Col xs={12} className="p-0">
            <div className="tiny-slider arrow-round arrow-blur arrow-hover rounded-0 overflow-hidden">
              <TinySlider settings={courseSliderSettings} className="tiny-slider-inner">
                <Card className="overflow-hidden h-500px h-md-600px text-center rounded-0" style={{
                  backgroundImage: `url(${backgroundBannerImg})`,
                  backgroundPosition: 'center left',
                  backgroundSize: 'cover'
                }}>
                  <div className="bg-overlay bg-dark opacity-6" />
                  <div className="card-img-overlay d-flex align-items-center p-2 p-sm-4">
                    <div className="w-100 my-auto">
                      <Row className="justify-content-center">
                        <Col xs={11} lg={7}>
                          {/* <h1 className="text-white display-6">Discover Lifelong Learning</h1>
                          <p className="text-white">
                            This Bootstrap 5 based theme is ideal for all types of sites that offer education such as Kindergarten, School, College,
                            University, Courses Hub, Training Center, or any Academy.
                          </p>
                          <Link to="/university/admission/form" className="btn btn-primary me-2 mb-0">
                            Admissions
                          </Link> */}
                          <a href="#" className="btn btn-white mb-0">
                            Get Started
                          </a>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Card>
                <Card className="overflow-hidden h-500px h-md-600px text-center rounded-0" style={{
                  backgroundImage: `url(${backgroundBannerImg2})`,
                  backgroundPosition: 'center left',
                  backgroundSize: 'cover'
                }}>
                  <div className="bg-overlay bg-dark opacity-6" />
                  <div className="card-img-overlay d-flex align-items-center p-3 p-sm-4">
                    <div className="w-100 my-auto">
                      <Row className="justify-content-center">
                        <Col xs={11} lg={6}>
                          {/* <img className="rounded-1 h-70px" src={universityLogo} alt="university logo" /> */}
                          {/* <h1 className="mb-0 text-white display-6">
                            Get new skills <br /> for the&nbsp;
                            <span className="position-relative">
                              digital world
                            </span>
                          </h1>
                          <p className="text-white">
                            Get the right professional certificate program for you. See what course other students and experts in your domain are
                            learning on
                          </p> */}
                          <a href="#" className="btn btn-white mb-0">
                            Get Started
                          </a>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Card>
              </TinySlider>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default HeroSlider;
