import React, { useState } from 'react'
import { Button, Card, Collapse, Toast, ToastContainer } from 'react-bootstrap'
import { FaShareAlt, FaChevronUp } from 'react-icons/fa'
import creatorLogo from '@/assets/images/logo-transparent.png'

const PriceCard = () => {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [showCoupons, setShowCoupons] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState(null)
  const [price, setPrice] = useState(275.98)
  const originalPrice = 275.98

  const coupons = [
    {
      code: 'WELCOME20',
      description: '20% off your first purchase',
      expiry: '12/31/2024',
      discount: 0.2, // 20% discount
    },
    {
      code: 'SUMMER10',
      description: '10% off summer collection',
      expiry: '8/31/2024',
      discount: 0.1, // 10% discount
    },
    {
      code: 'FREESHIP',
      description: 'Free shipping on orders over $50',
      expiry: null,
      discount: 0, // No direct price discount
    },
  ]

  const applyCoupon = (coupon) => {
    // Apply the selected coupon discount to the price
    if (selectedCoupon === coupon.code) {
      // If already selected, deselect it and restore original price
      setSelectedCoupon(null)
      setPrice(originalPrice)
    } else {
      setSelectedCoupon(coupon.code)
      const newPrice = originalPrice * (1 - coupon.discount)
      setPrice(newPrice)
    }

    setToastMessage(`Coupon ${coupon.code} applied!`)
    setShowToast(true)
    setShowCoupons(false) // Close dropdown after selection
  }

  return (
    <Card className="border p-4 rounded-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">${price.toFixed(2)}</h2>
        <Button variant="light" className="p-2 border-0 bg-transparent">
          <FaShareAlt />
        </Button>
      </div>

      <Button variant="success" className="w-100 py-3 rounded-3 mb-4" style={{ backgroundColor: '#10B981' }}>
        <div className="d-flex justify-content-center align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="me-2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          <span className="fw-medium">Buy now</span>
        </div>
      </Button>

      <div className="mb-4">
        <h5 className="mb-3">Available Offers?</h5>

        <Card className="border rounded-3 overflow-hidden">
          <Card.Body
            className="p-3 d-flex justify-content-between align-items-center"
            onClick={() => setShowCoupons(!showCoupons)}
            style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center">
              <div
                className="d-flex align-items-center justify-content-center me-3"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#FFF8E1',
                }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
              </div>
              <div>
                <h6 className="mb-0 fw-medium">{selectedCoupon ? selectedCoupon : 'Select a coupon'}</h6>
                <p className="mb-0 text-muted small">
                  {selectedCoupon ? coupons.find((c) => c.code === selectedCoupon)?.description : 'Apply discount to your order'}
                </p>
              </div>
            </div>
            <div>
              <FaChevronUp
                className={`text-secondary ${showCoupons ? 'transform rotate-180' : 'transform rotate-0'}`}
                style={{ transform: showCoupons ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </div>
          </Card.Body>

          <Collapse in={showCoupons}>
            <div>
              {coupons.map((coupon, index) => (
                <div key={index} className="border-top p-3" onClick={() => applyCoupon(coupon)} style={{ cursor: 'pointer' }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div
                        className="d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          backgroundColor: '#F0E6FF',
                        }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#7C3AED"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round">
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                          <line x1="7" y1="7" x2="7.01" y2="7"></line>
                        </svg>
                      </div>
                      <div>
                        <h6 className="mb-0 fw-medium">{coupon.code}</h6>
                        <p className="mb-0 text-muted small">{coupon.description}</p>
                      </div>
                    </div>
                    {coupon.expiry && (
                      <div className="text-end">
                        <small className="text-muted d-block">Expires</small>
                        <span className="small">{coupon.expiry}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Collapse>
        </Card>
      </div>

      <div className="d-flex align-items-center mb-2">
        <div className="me-3">
          <div className="avatar avatar-lg">
            <img className="avatar-img rounded-circle" src={creatorLogo} alt="avatar" />
          </div>
        </div>
        <div>
          <h6 className="mb-0">By Jacqueline Miller</h6>
          <p className="mb-0 text-muted small">Founder Eduport company</p>
        </div>
      </div>


      <ToastContainer position="bottom-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Card>
  )
}

export default PriceCard
