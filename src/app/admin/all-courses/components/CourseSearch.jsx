import { Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const CourseSearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <InputGroup>
      <Form.Control
        type="text"
        placeholder="Search courses..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border-end-0"
      />
      <InputGroup.Text className="bg-transparent">
        <FaSearch className="text-muted" />
      </InputGroup.Text>
    </InputGroup>
  );
};

export default CourseSearch; 