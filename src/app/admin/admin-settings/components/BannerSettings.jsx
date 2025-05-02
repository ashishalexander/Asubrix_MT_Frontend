import { useState, useEffect } from 'react'
import { Button, Card, Form, Modal, Spinner, Alert } from 'react-bootstrap'
import { BsPencilSquare, BsTrash, BsEye } from 'react-icons/bs'
import { FiSearch } from 'react-icons/fi'
import { FaPlus } from 'react-icons/fa'
import httpClient from '../../../../helpers/httpClient'


const BannerSettings = () => {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedBanner, setSelectedBanner] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    status: 'Active',
    order: 0
  })
  const [imageFile, setImageFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alertMessage, setAlertMessage] = useState({ type: '', message: '' })
  const [previewImage, setPreviewImage] = useState(null)

  // Fetch banners from API
  const fetchBanners = async () => {
    try {
      setLoading(true)
      const response = await httpClient.get(`/api/banners`)
      if (response.data.success) {
        setBanners(response.data.data)
      } else {
        setError('Failed to fetch banners')
      }
    } catch (error) {
      setError(`Error: ${error.response?.data?.message || error.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Load banners on component mount
  useEffect(() => {
    fetchBanners()
  }, [])

  // Sort banners based on selected option
  const sortedBanners = [...banners].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt)
    } else if (sortBy === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt)
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title)
    } else if (sortBy === 'order') {
      return a.order - b.order
    }
    return 0
  })

  // Filter banners based on search query
  const filteredBanners = sortedBanners.filter(
    (banner) =>
      banner.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      banner.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Handle adding a new banner
  const handleAddBanner = () => {
    setFormData({
      title: '',
      description: '',
      link: '',
      status: 'Active',
      order: 0
    })
    setSelectedBanner(null)
    setPreviewImage(null)
    setImageFile(null)
    setShowModal(true)
  }

  // Handle editing a banner
  const handleEditBanner = (banner) => {
    setFormData({
      title: banner.title,
      description: banner.description || '',
      link: banner.link || '',
      status: banner.status || 'Active',
      order: banner.order || 0
    })
    setSelectedBanner(banner)
    setPreviewImage(banner.image)
    setImageFile(null)
    setShowModal(true)
  }

  // Handle viewing a banner
  const handleViewBanner = (banner) => {
    window.open(banner.image, '_blank')
  }

  // Handle deleting a banner
  const handleDeleteBanner = async (banner) => {
    if (window.confirm(`Are you sure you want to delete the banner "${banner.title}"?`)) {
      try {
        const response = await httpClient.delete(`/api/banners/${banner._id}`)
        
        if (response.data.success) {
          setAlertMessage({
            type: 'success',
            message: 'Banner deleted successfully'
          })
          fetchBanners()
        } else {
          setAlertMessage({
            type: 'danger',
            message: response.data.message || 'Failed to delete banner'
          })
        }
      } catch (error) {
        setAlertMessage({
          type: 'danger',
          message: error.response?.data?.message || 'Error deleting banner'
        })
      }
    }
  }

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      
      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const formPayload = new FormData()
      formPayload.append('title', formData.title)
      formPayload.append('description', formData.description)
      formPayload.append('link', formData.link)
      formPayload.append('status', formData.status)
      formPayload.append('order', formData.order)

      if (imageFile) {
        formPayload.append('image', imageFile)
      }

      let response
      
      if (selectedBanner) {
        // Update existing banner
        response = await httpClient.put(`/api/banners/${selectedBanner._id}`, formPayload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      } else {
        // Create new banner
        response = await httpClient.post(`/api/banners`, formPayload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      }

      if (response.data.success) {
        setAlertMessage({
          type: 'success',
          message: selectedBanner ? 'Banner updated successfully' : 'Banner created successfully'
        })
        setShowModal(false)
        fetchBanners()
      } else {
        setAlertMessage({
          type: 'danger',
          message: response.data.message || 'Operation failed'
        })
      }
    } catch (error) {
      setAlertMessage({
        type: 'danger',
        message: error.response?.data?.message || 'An error occurred'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div>
          <h4 className="mb-0">Banner Management</h4>
          <p className="text-muted mb-0">Manage website banners and promotional content</p>
        </div>
        <Button className="btn-add-content d-flex align-items-center" onClick={handleAddBanner}>
          <FaPlus className="me-2" />
          Add New Banner
        </Button>
      </div>

      {/* Alert Messages */}
      {alertMessage.message && (
        <Alert variant={alertMessage.type} dismissible onClose={() => setAlertMessage({ type: '', message: '' })}>
          {alertMessage.message}
        </Alert>
      )}

      {/* Search and Sort */}
      <div className="row g-3 align-items-center mb-3">
        <div className="col-md-8">
          <div className="search-input">
            <div className="input-group">
              <span className="input-group-text border-end-0">
                <FiSearch className="text-muted" />
              </span>
              <Form.Control
                type="text"
                placeholder="Search banners..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-start-0 ps-0 rounded-end"
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="d-flex align-items-center justify-content-end">
            <label className="me-2 text-nowrap fw-medium">Sort by:</label>
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title</option>
              <option value="order">Display Order</option>
            </Form.Select>
          </div>
        </div>
      </div>

      {/* Loading or Error States */}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        /* Table */
        <Card className="border-0">
          <Card.Body className="p-0">
            {filteredBanners.length === 0 ? (
              <div className="text-center py-5">
                <p className="mb-0">No banners found. Create your first banner to get started.</p>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Order</th>
                    <th>Description</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBanners.map((banner) => (
                    <tr key={banner._id}>
                      <td>{banner.title}</td>
                      <td>
                        <span className={`badge ${banner.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                          {banner.status}
                        </span>
                      </td>
                      <td>{banner.order}</td>
                      <td>{banner.description}</td>
                      <td>
                        <div className="d-flex justify-content-end gap-2">
                          <Button 
                            variant="light" 
                            size="sm" 
                            className="action-btn" 
                            onClick={() => handleViewBanner(banner)}
                            title="View Banner"
                          >
                            <BsEye />
                          </Button>
                          <Button 
                            variant="light" 
                            size="sm" 
                            className="action-btn" 
                            onClick={() => handleEditBanner(banner)}
                            title="Edit Banner"
                          >
                            <BsPencilSquare />
                          </Button>
                          <Button 
                            variant="light" 
                            size="sm" 
                            className="action-btn text-danger" 
                            onClick={() => handleDeleteBanner(banner)}
                            title="Delete Banner"
                          >
                            <BsTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card.Body>
        </Card>
      )}

      {/* Banner Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedBanner ? 'Edit Banner' : 'Add New Banner'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter banner title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Image (1126px x 400px) {!selectedBanner && <span className="text-danger">*</span>}
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required={!selectedBanner}
              />
              <Form.Text className="text-muted">
                {selectedBanner ? 'Upload a new image to replace the existing one.' : 'Upload a banner image.'}
              </Form.Text>
              
              {previewImage && (
                <div className="mt-2">
                  <p className="mb-1">Preview:</p>
                  <img 
                    src={previewImage} 
                    alt="Banner preview" 
                    style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} 
                  />
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="url"
                name="link"
                placeholder="Enter banner link (e.g., https://example.com)"
                value={formData.link}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                placeholder="Enter banner description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Display Order</Form.Label>
                  <Form.Control
                    type="number"
                    name="order"
                    min="0"
                    placeholder="Display order (lower numbers appear first)"
                    value={formData.order}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                  Submitting...
                </>
              ) : (
                selectedBanner ? 'Update Banner' : 'Add Banner'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default BannerSettings