import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import '@/assets/scss/custom/_resource-carousel.scss';

const resources = [
  'https://img-c.udemycdn.com/course/750x422/382300_f75b_3.jpg',
  'https://img-c.udemycdn.com/course/750x422/382300_f75b_3.jpg',
  'https://img-c.udemycdn.com/course/750x422/382300_f75b_3.jpg',
  'https://img-c.udemycdn.com/course/750x422/382300_f75b_3.jpg',
];

const ResourceCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="resource-carousel-container container-fluid position-relative mb-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            indicators={true}
            controls={false} // Disable default controls
            className="custom-carousel"
          >
            {resources.map((image, idx) => (
              <Carousel.Item key={idx}>
                <div className="img-box">
                  <img src={image} alt={`Slide ${idx + 1}`} className="d-block w-100" />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>

          {/* Custom Navigation Buttons */}
          <button
            className="carousel-control-prev custom-control"
            onClick={() => setIndex(index === 0 ? resources.length - 1 : index - 1)}
          >
            ❮
          </button>
          <button
            className="carousel-control-next custom-control"
            onClick={() => setIndex(index === resources.length - 1 ? 0 : index + 1)}
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCarousel;