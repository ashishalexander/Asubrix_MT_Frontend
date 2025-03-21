import PageMetaData from '@/components/PageMetaData';
import PaymentReportsTable from '../components/PaymentReportsTable';
import { PaymentSummaryTiles } from '../components/SummaryTiles';

const PaymentReports = () => {
  return (
    <div className="container-fluid px-4 py-4">
      <PageMetaData title="Payment Reports" />
      <div className="mb-4">
        <h1 className="h3 mb-2 mb-sm-0">Payment Reports</h1>
      </div>
      <PaymentSummaryTiles />
      <PaymentReportsTable />
    </div>
  );
};

export default PaymentReports; 