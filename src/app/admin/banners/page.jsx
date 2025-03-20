'use client';

import { useState } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { BsPencilSquare, BsTrash, BsEye } from 'react-icons/bs';
import BannerModal from './components/BannerModal';

const BannersPage = () => {
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: 'Banner One',
      status: 'Active',
      image: '/path/to/banner1.jpg',
      link: '#',
      description: 'Main homepage banner'
    },
    {
      id: 2,
      title: 'Banner Two',
      status: 'Active',
      image: '/path/to/banner2.jpg',
      link: '#',
      description: 'Secondary promotional banner'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const handleAddBanner = () => {
    setSelectedBanner(null);
    setShowModal(true);
  };

  const handleEditBanner = (banner) => {
    setSelectedBanner(banner);
    setShowModal(true);
  };

  const handleViewBanner = (banner) => {
    // Implement view functionality
    console.log('Viewing banner:', banner);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBanner(null);
  };

  return (
    <div className="banner-management p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="page-title">Banner Management</h1>
        <Button 
          variant="primary" 
          onClick={handleAddBanner}
          className="add-banner-btn"
        >
          Add New Banner
        </Button>
      </div>

      <Card className="banner-card">
        <Card.Body>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((banner) => (
                  <tr key={banner.id}>
                    <td>{banner.title}</td>
                    <td>
                      <Badge bg={banner.status === 'Active' ? 'success' : 'secondary'}>
                        {banner.status}
                      </Badge>
                    </td>
                    <td>{banner.description}</td>
                    <td>
                      <div className="action-buttons">
                        <Button 
                          className="btn-action view-btn"
                          onClick={() => handleViewBanner(banner)}
                        >
                          <BsEye />
                        </Button>
                        <Button 
                          className="btn-action edit-btn"
                          onClick={() => handleEditBanner(banner)}
                        >
                          <BsPencilSquare />
                        </Button>
                        <Button 
                          className="btn-action delete-btn"
                        >
                          <BsTrash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>

      <BannerModal 
        show={showModal}
        onHide={handleCloseModal}
        banner={selectedBanner}
      />
    </div>
  );
};

export default BannersPage; 