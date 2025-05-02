import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Modal, Image, Tabs, Tab, Alert, Spinner } from 'react-bootstrap';
import { FaImages, FaUpload, FaTrash, FaPlus, FaCog } from 'react-icons/fa';
import { BsFullscreen } from 'react-icons/bs';
import GlightBox from '@/components/GlightBox';
import 'glightbox/dist/css/glightbox.min.css';
import httpClient from '../../../../helpers/httpClient';

const GallerySettings = () => {
  const [activeTab, setActiveTab] = useState('configuration');
  const [galleryConfig, setGalleryConfig] = useState({
    title: 'Our Best Moments',
    layout: 'mixed',
    maxImages: 6,
    allowVideoEmbeds: true,
    showFullscreenIcon: true,
    galleryType: 'event',
    imageQuality: 'high',
    lightboxEnabled: true
  });

  const [images, setImages] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  
  // State for handling loading and error states
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch gallery settings on component mount
  useEffect(() => {
    fetchGallerySettings();
  }, []);

  const fetchGallerySettings = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await httpClient.get('/api/gallery/settings');
      const { data } = response.data;
      
      // Update the gallery configuration
      setGalleryConfig({
        title: data.title,
        layout: data.layout,
        maxImages: data.maxImages,
        allowVideoEmbeds: data.allowVideoEmbeds,
        showFullscreenIcon: data.showFullscreenIcon,
        galleryType: data.galleryType,
        imageQuality: data.imageQuality,
        lightboxEnabled: data.lightboxEnabled
      });
      
      // Update the images array
      const formattedImages = data.images.map(image => ({
        id: image._id,
        src: image.path,
        name: image.name,
        isVideo: image.isVideo,
        videoUrl: image.videoUrl,
        order: image.order
      }));
      
      // Sort images by order property
      formattedImages.sort((a, b) => a.order - b.order);
      setImages(formattedImages);
      
    } catch (err) {
      console.error('Error fetching gallery settings:', err);
      setError('Failed to load gallery settings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfigChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGalleryConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file, index) => ({
      id: `temp-${Date.now()}-${index}`,
      src: URL.createObjectURL(file),
      name: file.name,
      file: file
    }));
    setSelectedFiles([...selectedFiles, ...newImages]);
  };

  const removeSelectedFile = (id) => {
    setSelectedFiles(selectedFiles.filter(file => file.id !== id));
  };

  const confirmUpload = async () => {
    if (selectedFiles.length === 0) return;
    
    setUploading(true);
    setError(null);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Use array upload endpoint if multiple files, single upload endpoint if one file
      if (selectedFiles.length > 1) {
        // For multiple files, append each file with the same name to indicate an array
        selectedFiles.forEach(fileObj => {
          formData.append('images', fileObj.file);
        });
        
        const response = await httpClient.post('/api/gallery/images', formData);
        const uploadedImages = response.data.data.map(image => ({
          id: image._id,
          src: image.path,
          name: image.name,
          order: image.order,
          isVideo: image.isVideo,
          videoUrl: image.videoUrl
        }));
        
        setImages([...images, ...uploadedImages]);
        setSuccess(`Successfully uploaded ${uploadedImages.length} images`);
      } else {
        // For single file
        formData.append('image', selectedFiles[0].file);
        
        const response = await httpClient.post('/api/gallery/image', formData);
        const uploadedImage = response.data.data;
        
        setImages([...images, {
          id: uploadedImage._id,
          src: uploadedImage.path,
          name: uploadedImage.name,
          order: uploadedImage.order,
          isVideo: uploadedImage.isVideo,
          videoUrl: uploadedImage.videoUrl
        }]);
        setSuccess('Image uploaded successfully');
      }
      
      // Clear selected files and close modal
      setSelectedFiles([]);
      setShowUploadModal(false);
      
    } catch (err) {
      console.error('Error uploading images:', err);
      setError('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
      // Clear success message after a delay
      if (success) {
        setTimeout(() => setSuccess(null), 3000);
      }
    }
  };

  const removeImage = async (id) => {
    if (!id) return;
    
    if (window.confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
      setLoading(true);
      setError(null);
      
      try {
        await httpClient.delete(`/api/gallery/image/${id}`);
        
        // Remove from local state
        setImages(images.filter(img => img.id !== id));
        setSuccess('Image removed successfully');
        
      } catch (err) {
        console.error('Error removing image:', err);
        setError('Failed to remove image. Please try again.');
      } finally {
        setLoading(false);
        // Clear success message after a delay
        if (success) {
          setTimeout(() => setSuccess(null), 3000);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      await httpClient.put('/api/gallery/settings', galleryConfig);
      setSuccess('Gallery settings saved successfully');
    } catch (err) {
      console.error('Error saving gallery settings:', err);
      setError('Failed to save gallery settings. Please try again.');
    } finally {
      setSaving(false);
      // Clear success message after a delay
      if (success) {
        setTimeout(() => setSuccess(null), 3000);
      }
    }
  };

  // Function to add video
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoData, setVideoData] = useState({
    videoUrl: '',
    thumbnailUrl: '',
    name: '',
  });

  const handleVideoDataChange = (e) => {
    const { name, value } = e.target;
    setVideoData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addVideo = async () => {
    if (!videoData.videoUrl || !videoData.thumbnailUrl) {
      setError('Video URL and thumbnail URL are required');
      return;
    }
    
    setUploading(true);
    setError(null);
    
    try {
      const response = await httpClient.post('/api/gallery/video', videoData);
      const newVideo = response.data.data;
      
      setImages([...images, {
        id: newVideo._id,
        src: newVideo.path,
        name: newVideo.name,
        order: newVideo.order,
        isVideo: true,
        videoUrl: newVideo.videoUrl
      }]);
      
      // Reset form and close modal
      setVideoData({ videoUrl: '', thumbnailUrl: '', name: '' });
      setShowVideoModal(false);
      setSuccess('Video added successfully');
      
    } catch (err) {
      console.error('Error adding video:', err);
      setError('Failed to add video. Please try again.');
    } finally {
      setUploading(false);
      // Clear success message after a delay
      if (success) {
        setTimeout(() => setSuccess(null), 3000);
      }
    }
  };

  if (loading && images.length === 0) {
    return (
      <Card className="mb-4">
        <Card.Header>
          <Card.Title>Gallery Management</Card.Title>
        </Card.Header>
        <Card.Body className="text-center p-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3">Loading gallery settings...</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mb-4">
      <Card.Header>
        <Card.Title className="d-flex align-items-center">
          <FaImages className="me-2" />
          Gallery Management
        </Card.Title>
      </Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <Tabs 
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
        >
          <Tab eventKey="configuration" title={<><FaCog className="me-2" />Configuration</>}>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Gallery Title</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="title"
                      value={galleryConfig.title}
                      onChange={handleConfigChange}
                      placeholder="Enter gallery title"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Gallery Type</Form.Label>
                    <Form.Select 
                      name="galleryType"
                      value={galleryConfig.galleryType}
                      onChange={handleConfigChange}
                    >
                      <option value="event">Event Gallery</option>
                      <option value="portfolio">Portfolio</option>
                      <option value="team">Team Photos</option>
                      <option value="product">Product Gallery</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Layout Style</Form.Label>
                    <Form.Select 
                      name="layout"
                      value={galleryConfig.layout}
                      onChange={handleConfigChange}
                    >
                      <option value="mixed">Mixed Layout</option>
                      <option value="grid">Grid Layout</option>
                      <option value="masonry">Masonry Layout</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Max Number of Images</Form.Label>
                    <Form.Control 
                      type="number" 
                      name="maxImages"
                      value={galleryConfig.maxImages}
                      onChange={handleConfigChange}
                      min={1}
                      max={12}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Check 
                      type="checkbox"
                      name="allowVideoEmbeds"
                      label="Allow Video Embeds"
                      checked={galleryConfig.allowVideoEmbeds}
                      onChange={handleConfigChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Check 
                      type="checkbox"
                      name="showFullscreenIcon"
                      label="Show Fullscreen Icon"
                      checked={galleryConfig.showFullscreenIcon}
                      onChange={handleConfigChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Check 
                      type="checkbox"
                      name="lightboxEnabled"
                      label="Enable Lightbox Viewer"
                      checked={galleryConfig.lightboxEnabled}
                      onChange={handleConfigChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Image Quality</Form.Label>
                    <Form.Select 
                      name="imageQuality"
                      value={galleryConfig.imageQuality}
                      onChange={handleConfigChange}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Button 
                variant="primary" 
                type="submit" 
                className="mt-3" 
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Gallery Settings'}
              </Button>
            </Form>
          </Tab>
          
          <Tab eventKey="images" title={<><FaImages className="me-2" />Images</>}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Uploaded Images</h5>
              <div>
                <Button 
                  variant="primary" 
                  onClick={() => setShowVideoModal(true)}
                  className="me-2"
                >
                  <FaPlus className="me-2" /> Add Video
                </Button>
                <Button 
                  variant="success" 
                  onClick={() => setShowUploadModal(true)}
                >
                  <FaPlus className="me-2" /> Add Images
                </Button>
              </div>
            </div>
            {images.length === 0 && !loading ? (
              <Alert variant="info">
                No images found. Click "Add Images" to upload some gallery images.
              </Alert>
            ) : (
              <Row className="g-4">
                {images.map((image) => (
                  <Col key={image.id} xs={6} md={4} lg={3} className="position-relative">
                    <Card className="overflow-hidden">
                      <div className="card-overlay-hover position-relative">
                        <img 
                          src={image.src} 
                          className="img-fluid rounded-3" 
                          alt={image.name}
                        />
                        {image.isVideo && (
                          <span className="position-absolute top-0 start-0 m-2 badge bg-danger">
                            Video
                          </span>
                        )}
                        <Button 
                          variant="danger" 
                          size="sm" 
                          className="position-absolute top-0 end-0 m-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(image.id);
                          }}
                          disabled={loading}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                      <GlightBox 
                        className="card-element-hover position-absolute w-100 h-100" 
                        data-glightbox 
                        data-gallery="gallery-admin" 
                        href={image.src}
                      >
                        <BsFullscreen
                          size={30}
                          className="fs-6 text-white position-absolute top-50 start-50 translate-middle bg-dark rounded-3 p-2 lh-1"
                        />
                      </GlightBox>
                    </Card>
                    <p className="text-center mt-2 text-truncate">
                      {image.name} {image.isVideo && '(Video)'}
                    </p>
                  </Col>
                ))}
              </Row>
            )}
          </Tab>
        </Tabs>
      </Card.Body>

      {/* Upload Images Modal */}
      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Upload Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form.Group className="mb-3">
            <Form.Control 
              type="file" 
              multiple 
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Form.Group>

          {selectedFiles.length > 0 && (
            <Row className="g-4 mb-3">
              {selectedFiles.map((file) => (
                <Col key={file.id} xs={6} md={4} lg={3} className="position-relative">
                  <Card className="overflow-hidden">
                    <div className="card-overlay-hover">
                      <img 
                        src={file.src} 
                        className="img-fluid rounded-3" 
                        alt={file.name}
                      />
                      <Button 
                        variant="danger" 
                        size="sm" 
                        className="position-absolute top-0 end-0 m-2"
                        onClick={() => removeSelectedFile(file.id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                    <GlightBox 
                      className="card-element-hover position-absolute w-100 h-100" 
                      data-glightbox 
                      data-gallery="gallery-upload" 
                      href={file.src}
                    >
                      <BsFullscreen
                        size={30}
                        className="fs-6 text-white position-absolute top-50 start-50 translate-middle bg-dark rounded-3 p-2 lh-1"
                      />
                    </GlightBox>
                  </Card>
                  <p className="text-center mt-2 text-truncate">{file.name}</p>
                </Col>
              ))}
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUploadModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={confirmUpload}
            disabled={selectedFiles.length === 0 || uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Images'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Video Modal */}
      <Modal show={showVideoModal} onHide={() => setShowVideoModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form.Group className="mb-3">
            <Form.Label>Video Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={videoData.name}
              onChange={handleVideoDataChange}
              placeholder="Enter video name"
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Video URL (YouTube/Vimeo)</Form.Label>
            <Form.Control
              type="url"
              name="videoUrl"
              value={videoData.videoUrl}
              onChange={handleVideoDataChange}
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Thumbnail URL</Form.Label>
            <Form.Control
              type="url"
              name="thumbnailUrl"
              value={videoData.thumbnailUrl}
              onChange={handleVideoDataChange}
              placeholder="https://img.youtube.com/vi/..."
              required
            />
            <Form.Text className="text-muted">
              Enter the URL of a thumbnail image for this video
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowVideoModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={addVideo}
            disabled={!videoData.videoUrl || !videoData.thumbnailUrl || uploading}
          >
            {uploading ? 'Adding...' : 'Add Video'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default GallerySettings;