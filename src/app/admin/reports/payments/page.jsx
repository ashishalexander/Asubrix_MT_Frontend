import PageMetaData from '@/components/PageMetaData';
import PaymentReportsTable from '../components/PaymentReportsTable';
import { PaymentSummaryTiles } from '../components/SummaryTiles';
import { Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

const PaymentReports = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="container-fluid px-4 py-4">
      <PageMetaData title="Payment Reports" />
      <div className="mb-4 d-flex align-items-center justify-content-between">
        <h1 className="h3 mb-0">Payment Reports</h1>
        <InputGroup className="w-50 search-input">
          <InputGroup.Text className="bg-light border-0">
            <FaSearch className="text-muted" />
          </InputGroup.Text>
          <Form.Control
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search payments..."
            className="border-0 bg-light"
          />
        </InputGroup>
      </div>
      <PaymentSummaryTiles />
      <PaymentReportsTable searchQuery={searchQuery} />
    </div>
  );
};

export default PaymentReports;