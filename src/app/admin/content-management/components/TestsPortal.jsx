import React, { useState } from 'react';
import { Row, Col, Card, Badge, Dropdown, Form, Button, Modal, Breadcrumb } from 'react-bootstrap';
import { 
  FiFolder, FiMoreVertical, FiClock, FiUsers, FiCalendar, 
  FiPlus, FiChevronRight, FiEdit2, FiTrash2, FiArrowUp, 
  FiArrowDown, FiSearch, FiX, FiFileText
} from 'react-icons/fi';
import CreateChoiceModal from './CreateChoiceModal';

const TestsPortal = ({ 
  view, 
  searchQuery, 
  sortBy,
  showAddFolder,
  setShowAddFolder,
  onCreateTest, 
  onOpenSettings 
}) => {
  // State for folders and tests
  const [folders, setFolders] = useState([
    { id: 1, name: 'Mathematics', parentId: null },
    { id: 2, name: 'Algebra', parentId: 1 },
    { id: 3, name: 'Science', parentId: null },
    { id: 4, name: 'Physics', parentId: 3 },
  ]);

  const [tests, setTests] = useState([
    {
      id: 1,
      title: 'Algebra Basics',
      duration: '45 minutes',
      attempts: 24,
      lastModified: '2024-03-19',
      lastAttempted: '2024-03-18',
      folderId: 2,
    },
    {
      id: 2,
      title: 'Chemical Reactions',
      duration: '60 minutes',
      attempts: 18,
      lastModified: '2024-03-18',
      lastAttempted: '2024-03-17',
      folderId: 3,
    },
  ]);

  // State for sorting and filtering
  const [currentPath, setCurrentPath] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');

  // Get current folder contents based on path
  const getCurrentContents = () => {
    let current = { folders: folders.filter(f => f.parentId === null), tests: tests.filter(t => t.folderId === null) };
    
    for (const folderId of currentPath) {
      current = {
        folders: folders.filter(f => f.parentId === folderId),
        tests: tests.filter(t => t.folderId === folderId)
      };
    }
    
    return current;
  };

  // Add folder to current location
  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      const currentFolderId = currentPath[currentPath.length - 1] || null;
      const newFolder = {
        id: Math.max(...folders.map(f => f.id), 0) + 1,
        name: newFolderName,
        parentId: currentFolderId
      };
      setFolders([...folders, newFolder]);
      setNewFolderName('');
      setShowAddFolder(false);
    }
  };

  // Navigation functions
  const navigateToFolder = (folderId) => {
    setCurrentPath([...currentPath, folderId]);
  };

  const navigateToPath = (index) => {
    setCurrentPath(currentPath.slice(0, index));
  };

  // Get breadcrumb items
  const getBreadcrumbItems = () => {
    let items = [{ id: null, name: 'Tests' }];
    let path = [];
    
    for (const folderId of currentPath) {
      const folder = folders.find(f => f.id === folderId);
      if (folder) {
        items.push(folder);
      }
    }
    
    return items;
  };

  // Handle content deletion
  const handleDelete = (id, type) => {
    if (type === 'folder') {
      const hasChildren = folders.some(f => f.parentId === id);
      const hasTests = tests.some(t => t.folderId === id);
      
      if (!hasChildren && !hasTests) {
        setFolders(folders.filter(f => f.id !== id));
      } else {
        alert('Cannot delete folder that contains items');
      }
    } else {
      setTests(tests.filter(t => t.id !== id));
    }
  };

  // Sort tests based on sortBy prop
  const sortItems = (items) => {
    return [...items].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'lastModified':
          comparison = new Date(b.lastModified) - new Date(a.lastModified);
          break;
        case 'attempts':
          comparison = b.attempts - a.attempts;
          break;
        default:
          comparison = new Date(b.lastModified) - new Date(a.lastModified);
      }
      return comparison;
    });
  };

  const currentContents = getCurrentContents();
  const filteredAndSortedTests = sortItems(
    currentContents.tests.filter(test => 
      test.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="tests-portal">
      {/* Content Header */}
      <div className="content-header mb-4">
        <Breadcrumb className="mb-0">
          {getBreadcrumbItems().map((item, index) => (
            <Breadcrumb.Item
              key={index}
              active={index === getBreadcrumbItems().length - 1}
              onClick={() => navigateToPath(index)}
              className="breadcrumb-item-custom"
            >
              {item.name}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>

      {/* Add Folder Modal */}
      <Modal 
        show={showAddFolder} 
        onHide={() => setShowAddFolder(false)}
        centered
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>New Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Folder name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              autoFocus
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowAddFolder(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="primary"
            onClick={handleAddFolder}
          >
            Create Folder
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Content List */}
      <div className="content-list">
        {/* Folders */}
        <Row>
          {currentContents.folders.map(folder => (
            <Col key={folder.id} xs={12} md={6} lg={4} xl={3} className="mb-4">
              <Card 
                className="content-card folder-card h-100"
                onClick={() => navigateToFolder(folder.id)}
              >
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <div className="content-icon me-3">
                      <FiFolder size={24} className="text-primary" />
                    </div>
                    <div className="content-details flex-grow-1">
                      <h6 className="content-title mb-1">{folder.name}</h6>
                      <div className="content-meta text-muted small">
                        {folders.filter(f => f.parentId === folder.id).length} folders, 
                        {tests.filter(t => t.folderId === folder.id).length} tests
                      </div>
                    </div>
                    <Dropdown onClick={e => e.stopPropagation()}>
                      <Dropdown.Toggle variant="link" className="btn-actions text-muted">
                        <FiMoreVertical />
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu-end">
                        <Dropdown.Item>
                          <FiEdit2 className="me-2" /> Rename
                        </Dropdown.Item>
                        <Dropdown.Item 
                          className="text-danger"
                          onClick={() => handleDelete(folder.id, 'folder')}
                        >
                          <FiTrash2 className="me-2" /> Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}

          {/* Tests */}
          {filteredAndSortedTests.map(test => (
            <Col key={test.id} xs={12} md={6} lg={4} xl={3} className="mb-4">
              <Card className="content-card test-card h-100">
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <div className="content-icon me-3">
                      <FiFileText size={24} className="text-success" />
                    </div>
                    <div className="content-details flex-grow-1">
                      <h6 className="content-title mb-1">{test.title}</h6>
                      <div className="content-meta text-muted small">
                        <div><FiClock className="me-1" />{test.duration}</div>
                        <div><FiUsers className="me-1" />{test.attempts} attempts</div>
                        <div><FiCalendar className="me-1" />{test.lastModified}</div>
                      </div>
                    </div>
                    <Dropdown>
                      <Dropdown.Toggle variant="link" className="btn-actions text-muted">
                        <FiMoreVertical />
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu-end">
                        <Dropdown.Item>
                          <FiEdit2 className="me-2" /> Edit
                        </Dropdown.Item>
                        <Dropdown.Item 
                          className="text-danger"
                          onClick={() => handleDelete(test.id, 'test')}
                        >
                          <FiTrash2 className="me-2" /> Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {currentContents.folders.length === 0 && filteredAndSortedTests.length === 0 && (
          <div className="empty-state text-center py-5">
            <p className="text-muted mb-0">No content in this folder</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestsPortal; 