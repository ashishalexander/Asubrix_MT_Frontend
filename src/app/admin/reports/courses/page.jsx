import PageMetaData from '@/components/PageMetaData';
import CourseReportsTable from '../components/CourseReportsTable';
import { CourseSummaryTiles } from '../components/SummaryTiles';

const CourseReports = () => {
  return (
    <div className="container-fluid px-4 py-4">
      <PageMetaData title="Course Reports" />
      <div className="mb-4">
        <h1 className="h3 mb-2 mb-sm-0">Course Reports</h1>
      </div>
      <CourseSummaryTiles />
      <CourseReportsTable />
    </div>
  );
};

export default CourseReports; 