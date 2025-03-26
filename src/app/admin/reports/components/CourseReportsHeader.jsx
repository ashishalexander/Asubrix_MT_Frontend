import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Dropdown, Form, InputGroup } from 'react-bootstrap'
import { FaFileExport, FaFilter, FaSearch } from 'react-icons/fa'
import * as XLSX from 'xlsx'

// New Header Component
const CourseReportsHeader = ({ searchQuery, setSearchQuery, tableData, onDateFilterChange, onSortChange }) => {
  // Export function to handle Excel and PDF exports
  const handleExport = (format) => {
    if (format === 'excel') {
      const worksheet = XLSX.utils.json_to_sheet(tableData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Course Reports')
      XLSX.writeFile(workbook, 'course_reports.xlsx')
    } else if (format === 'pdf') {
      const doc = new jsPDF()
      doc.autoTable({
        head: [Object.keys(tableData[0])],
        body: tableData.map((row) => Object.values(row)),
      })
      doc.save('course_reports.pdf')
    }
  }

  return (
    <div className="mb-4 mt-5">
      <div className="d-flex align-items-center justify-content-between mb-3">
        {/* Search Input */}
        <InputGroup className="w-50 search-input">
          <InputGroup.Text className="bg-light border-0">
            <FaSearch className="text-muted" />
          </InputGroup.Text>
          <Form.Control
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses..."
            className="border-0 bg-light"
          />
        </InputGroup>

        <div className="d-flex justify-content-between align-items-center">
          {/* Date Filter Dropdown */}
          <Dropdown className="me-2">
            <Dropdown.Toggle variant="outline-secondary" id="date-filter-dropdown">
              <FaFilter className="me-2" /> Date Filter
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => onDateFilterChange('last7days')}>Last 7 Days</Dropdown.Item>
              <Dropdown.Item onClick={() => onDateFilterChange('lastMonth')}>Last Month</Dropdown.Item>
              <Dropdown.Item onClick={() => onDateFilterChange('lastQuarter')}>Last Quarter</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Sort Dropdown */}
          <Dropdown className="me-2">
            <Dropdown.Toggle variant="outline-secondary" id="sort-dropdown">
              Sort By
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => onSortChange('courseName')}>Course Name</Dropdown.Item>
              <Dropdown.Item onClick={() => onSortChange('enrollments')}>Enrollments</Dropdown.Item>
              <Dropdown.Item onClick={() => onSortChange('completionRate')}>Completion Rate</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Export Dropdown */}
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" id="export-dropdown">
              <FaFileExport className="me-2" /> Export
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleExport('excel')}>Export to Excel</Dropdown.Item>
              <Dropdown.Item onClick={() => handleExport('pdf')}>Export to PDF</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default CourseReportsHeader
