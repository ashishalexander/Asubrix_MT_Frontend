import { useEffect, useState } from 'react'
import GlightBox from '@/components/GlightBox'
import { Card, Col, Container, Row, Spinner, Alert } from 'react-bootstrap'
import { BsFullscreen } from 'react-icons/bs'
import { FaPlay } from 'react-icons/fa'
import httpClient from '../../../../helpers/httpClient'

const Gallery = () => {
  const [galleryData, setGalleryData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true)
        const response = await httpClient.get('/api/gallery')
        
        if (response.data.success) {
          setGalleryData(response.data.data)
        } else {
          setError('Failed to load gallery data')
        }
      } catch (err) {
        console.error('Error fetching gallery data:', err)
        setError('Error connecting to the server. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryData()
  }, [])

  if (loading) {
    return (
      <section className="pt-0 pt-md-5">
        <Container>
          <div className="text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </Container>
      </section>
    )
  }

  if (error) {
    return (
      <section className="pt-0 pt-md-5">
        <Container>
          <Alert variant="danger" className="my-3">
            {error}
          </Alert>
        </Container>
      </section>
    )
  }

  if (!galleryData || !galleryData.images || galleryData.images.length === 0) {
    return (
      <section className="pt-0 pt-md-5">
        <Container>
          <Alert variant="info" className="my-3">
            No gallery images to display.
          </Alert>
        </Container>
      </section>
    )
  }

  // Sort images by order if needed (backend should already sort them)
  const images = galleryData.images

  return (
    <section className="pt-0 pt-md-5">
      <Container>
        <Row className="mb-3 mb-sm-4">
          <Col xs={12} className="mx-auto text-center">
            <h2 className="fs-1 fw-bold">
              <span className="position-relative z-index-9">{galleryData.title?.split(' ')[0] || 'Our Best'}</span>&nbsp;
              <span className="position-relative z-index-1">{galleryData.title?.split(' ').slice(1).join(' ') || 'Moments'}</span>
            </h2>
          </Col>
        </Row>
        
        {/* Mixed layout - similar to your original layout but using dynamic data */}
        {galleryData.layout === 'mixed' && (
          <Row className="g-4">
            <Col lg={4}>
              <Row className="g-4">
                {images.slice(0, 2).map((image, index) => (
                  <Col md={6} key={image.id || index}>
                    <Card className="overflow-hidden">
                      <div className="card-overlay-hover">
                        <img src={image.src} className="rounded-3" alt={image.name || 'gallery image'} />
                      </div>
                      {galleryData.lightboxEnabled && (
                        <GlightBox 
                          className="card-element-hover position-absolute w-100 h-100" 
                          data-glightbox 
                          data-gallery="gallery" 
                          href={image.isVideo ? image.videoUrl : image.src}
                        >
                          {image.isVideo ? (
                            <span className="btn text-danger btn-round btn-white-shadow mb-0 position-absolute top-50 start-50 translate-middle">
                              <FaPlay />
                            </span>
                          ) : galleryData.showFullscreenIcon && (
                            <BsFullscreen
                              size={30}
                              className="fs-6 text-white position-absolute top-50 start-50 translate-middle bg-dark rounded-3 p-2 lh-1"
                            />
                          )}
                        </GlightBox>
                      )}
                    </Card>
                  </Col>
                ))}
                {images.length > 2 && (
                  <Col xs={12}>
                    <Card className="overflow-hidden">
                      <div className="card-overlay-hover">
                        <img src={images[2].src} className="rounded-3" alt={images[2].name || 'gallery image'} />
                      </div>
                      {galleryData.lightboxEnabled && (
                        <GlightBox 
                          className="card-element-hover position-absolute w-100 h-100" 
                          data-glightbox 
                          data-gallery="gallery" 
                          href={images[2].isVideo ? images[2].videoUrl : images[2].src}
                        >
                          {images[2].isVideo ? (
                            <span className="btn text-danger btn-round btn-white-shadow mb-0 position-absolute top-50 start-50 translate-middle">
                              <FaPlay />
                            </span>
                          ) : galleryData.showFullscreenIcon && (
                            <BsFullscreen
                              size={30}
                              className="fs-6 text-white position-absolute top-50 start-50 translate-middle bg-dark rounded-3 p-2 lh-1"
                            />
                          )}
                        </GlightBox>
                      )}
                    </Card>
                  </Col>
                )}
              </Row>
            </Col>
            
            {images.length > 3 && (
              <Col lg={4}>
                <Card className="overflow-hidden">
                  <div className="card-overlay-hover">
                    <img src={images[3].src} className="rounded-3" alt={images[3].name || 'gallery image'} />
                  </div>
                  {galleryData.lightboxEnabled && (
                    <GlightBox 
                      className="card-element-hover position-absolute w-100 h-100" 
                      data-glightbox 
                      data-gallery="gallery" 
                      href={images[3].isVideo ? images[3].videoUrl : images[3].src}
                    >
                      {images[3].isVideo ? (
                        <span className="btn text-danger btn-round btn-white-shadow mb-0 position-absolute top-50 start-50 translate-middle">
                          <FaPlay />
                        </span>
                      ) : galleryData.showFullscreenIcon && (
                        <BsFullscreen
                          size={30}
                          className="fs-6 text-white position-absolute top-50 start-50 translate-middle bg-dark rounded-3 p-2 lh-1"
                        />
                      )}
                    </GlightBox>
                  )}
                </Card>
              </Col>
            )}
            
            {images.length > 4 && (
              <Col lg={4}>
                <Row className="g-4">
                  <Col xs={12}>
                    <Card className="overflow-hidden">
                      <div className="card-overlay-hover">
                        <img src={images[4].src} className="rounded-3" alt={images[4].name || 'gallery image'} />
                      </div>
                      {galleryData.lightboxEnabled && (
                        <GlightBox 
                          className="card-element-hover position-absolute w-100 h-100" 
                          data-glightbox 
                          data-gallery="gallery" 
                          href={images[4].isVideo ? images[4].videoUrl : images[4].src}
                        >
                          {images[4].isVideo ? (
                            <span className="btn text-danger btn-round btn-white-shadow mb-0 position-absolute top-50 start-50 translate-middle">
                              <FaPlay />
                            </span>
                          ) : galleryData.showFullscreenIcon && (
                            <BsFullscreen
                              size={30}
                              className="fs-6 text-white position-absolute top-50 start-50 translate-middle bg-dark rounded-3 p-2 lh-1"
                            />
                          )}
                        </GlightBox>
                      )}
                    </Card>
                  </Col>
                  {images.slice(5, 7).map((image, index) => (
                    <Col md={6} key={image.id || index + 5}>
                      <Card className="overflow-hidden">
                        <div className="card-overlay-hover">
                          <img src={image.src} className="rounded-3" alt={image.name || 'gallery image'} />
                        </div>
                        {galleryData.lightboxEnabled && (
                          <GlightBox 
                            className="card-element-hover position-absolute w-100 h-100" 
                            data-glightbox 
                            data-gallery="gallery" 
                            href={image.isVideo ? image.videoUrl : image.src}
                          >
                            {image.isVideo ? (
                              <span className="btn text-danger btn-round btn-white-shadow mb-0 position-absolute top-50 start-50 translate-middle">
                                <FaPlay />
                              </span>
                            ) : galleryData.showFullscreenIcon && (
                              <BsFullscreen
                                size={30}
                                className="fs-6 text-white position-absolute top-50 start-50 translate-middle bg-dark rounded-3 p-2 lh-1"
                              />
                            )}
                          </GlightBox>
                        )}
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            )}
          </Row>
        )}
        
        {/* Grid layout */}
        {galleryData.layout === 'grid' && (
          <Row className="g-4">
            {images.map((image, index) => (
              <Col md={4} sm={6} key={image.id || index}>
                <Card className="overflow-hidden">
                  <div className="card-overlay-hover">
                    <img src={image.src} className="rounded-3" alt={image.name || 'gallery image'} />
                  </div>
                  {galleryData.lightboxEnabled && (
                    <GlightBox 
                      className="card-element-hover position-absolute w-100 h-100" 
                      data-glightbox 
                      data-gallery="gallery" 
                      href={image.isVideo ? image.videoUrl : image.src}
                    >
                      {image.isVideo ? (
                        <span className="btn text-danger btn-round btn-white-shadow mb-0 position-absolute top-50 start-50 translate-middle">
                          <FaPlay />
                        </span>
                      ) : galleryData.showFullscreenIcon && (
                        <BsFullscreen
                          size={30}
                          className="fs-6 text-white position-absolute top-50 start-50 translate-middle bg-dark rounded-3 p-2 lh-1"
                        />
                      )}
                    </GlightBox>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        )}
        
        {/* Masonry layout */}
        {galleryData.layout === 'masonry' && (
          <Row className="g-4">
            {/* First column */}
            <Col lg={4}>
              <Row className="g-4">
                {images.filter((_, i) => i % 3 === 0).map((image, index) => (
                  <Col xs={12} key={image.id || index}>
                    <Card className="overflow-hidden">
                      <div className="card-overlay-hover">
                        <img src={image.src} className="rounded-3" alt={image.name || 'gallery image'} />
                      </div>
                      {galleryData.lightboxEnabled && (
                        <GlightBox 
                          className="card-element-hover position-absolute w-100 h-100" 
                          data-glightbox 
                          data-gallery="gallery" 
                          href={image.isVideo ? image.videoUrl : image.src}
                        >
                          {image.isVideo ? (
                            <span className="btn text-danger btn-round btn-white-shadow mb-0 position-absolute top-50 start-50 translate-middle">
                              <FaPlay />
                            </span>
                          ) : galleryData.showFullscreenIcon && (
                            <BsFullscreen
                              size={30}
                              className="fs-6 text-white position-absolute top-50 start-50 translate-middle bg-dark rounded-3 p-2 lh-1"
                            />
                          )}
                        </GlightBox>
                      )}
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
            
            {/* Second column */}
            <Col lg={4}>
              <Row className="g-4">
                {images.filter((_, i) => i % 3 === 1).map((image, index) => (
                  <Col xs={12} key={image.id || index}>
                    <Card className="overflow-hidden">
                      <div className="card-overlay-hover">
                        <img src={image.src} className="rounded-3" alt={image.name || 'gallery image'} />
                      </div>
                      {galleryData.lightboxEnabled && (
                        <GlightBox 
                          className="card-element-hover position-absolute w-100 h-100" 
                          data-glightbox 
                          data-gallery="gallery" 
                          href={image.isVideo ? image.videoUrl : image.src}
                        >
                          {image.isVideo ? (
                            <span className="btn text-danger btn-round btn-white-shadow mb-0 position-absolute top-50 start-50 translate-middle">
                              <FaPlay />
                            </span>
                          ) : galleryData.showFullscreenIcon && (
                            <BsFullscreen
                              size={30}
                              className="fs-6 text-white position-absolute top-50 start-50 translate-middle bg-dark rounded-3 p-2 lh-1"
                            />
                          )}
                        </GlightBox>
                      )}
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
            
            {/* Third column */}
            <Col lg={4}>
              <Row className="g-4">
                {images.filter((_, i) => i % 3 === 2).map((image, index) => (
                  <Col xs={12} key={image.id || index}>
                    <Card className="overflow-hidden">
                      <div className="card-overlay-hover">
                        <img src={image.src} className="rounded-3" alt={image.name || 'gallery image'} />
                      </div>
                      {galleryData.lightboxEnabled && (
                        <GlightBox 
                          className="card-element-hover position-absolute w-100 h-100" 
                          data-glightbox 
                          data-gallery="gallery" 
                          href={image.isVideo ? image.videoUrl : image.src}
                        >
                          {image.isVideo ? (
                            <span className="btn text-danger btn-round btn-white-shadow mb-0 position-absolute top-50 start-50 translate-middle">
                              <FaPlay />
                            </span>
                          ) : galleryData.showFullscreenIcon && (
                            <BsFullscreen
                              size={30}
                              className="fs-6 text-white position-absolute top-50 start-50 translate-middle bg-dark rounded-3 p-2 lh-1"
                            />
                          )}
                        </GlightBox>
                      )}
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  )
}

export default Gallery