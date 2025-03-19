import React, { useState } from 'react';
import { Row, Col, Card, Badge, Dropdown, Form, Button, Modal, Breadcrumb } from 'react-bootstrap';
import { 
  FiFolder, FiMoreVertical, FiClock, FiUsers, FiCalendar, 
  FiPlus, FiChevronRight, FiEdit2, FiTrash2, FiArrowUp, 
  FiArrowDown, FiSearch, FiX, FiFileText
} from 'react-icons/fi';
import CreateChoiceModal from './CreateChoiceModal';

const TestsPortal = ({ view, searchQuery, onCreateTest, onOpenSettings }) => {
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
  const [sortBy, setSortBy] = useState('lastModified');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showAddContent, setShowAddContent] = useState(false);

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

  // Sort tests
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
        case 'lastAttempted':
          comparison = new Date(b.lastAttempted) - new Date(a.lastAttempted);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
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
      <div className="content-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div className="mb-3 mb-md-0">
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
        <div className="d-flex flex-wrap gap-2 align-items-center">
          <Button 
            variant="primary" 
            className="btn-add-content d-flex align-items-center"
            onClick={() => setShowAddFolder(true)}
          >
            <FiPlus className="me-2" /> New Folder
          </Button>
          <Button 
            variant="primary" 
            className="btn-add-content d-flex align-items-center"
            onClick={onCreateTest}
          >
            <FiFileText className="me-2" /> New Test
          </Button>
          <div className="d-flex gap-2 ms-md-2">
            <Dropdown align="end">
              <Dropdown.Toggle variant="light" className="btn-sort d-flex align-items-center">
                <span className="d-none d-sm-inline">Sort by:</span> {sortBy}
              </Dropdown.Toggle>
              <Dropdown.Menu className="shadow-sm">
                <Dropdown.Item onClick={() => setSortBy('title')}>Title</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy('lastModified')}>Modified Date</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy('lastAttempted')}>Last Attempted</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button 
              variant="light" 
              className="btn-sort-order"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? <FiArrowUp /> : <FiArrowDown />}
            </Button>
          </div>
        </div>
      </div>

      {/* Content List */}
      <div className="content-list">
        {/* Folders */}
        {currentContents.folders.map(folder => (
          <Card 
            key={folder.id} 
            className="content-card folder-card"
            onClick={() => navigateToFolder(folder.id)}
          >
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="content-icon">
                  <FiFolder size={24} />
                </div>
                <div className="content-details">
                  <h6 className="content-title">{folder.name}</h6>
                  <div className="content-meta">
                    {folders.filter(f => f.parentId === folder.id).length} folders, 
                    {tests.filter(t => t.folderId === folder.id).length} tests
                  </div>
                </div>
                <Dropdown onClick={e => e.stopPropagation()}>
                  <Dropdown.Toggle variant="link" className="btn-actions">
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
        ))}

        {/* Tests */}
        {filteredAndSortedTests.map(test => (
          <Card key={test.id} className="content-card test-card">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="content-icon">
                  <FiFileText size={24} />
                </div>
                <div className="content-details">
                  <h6 className="content-title">{test.title}</h6>
                  <div className="content-meta">
                    <span><FiClock className="me-1" />{test.duration}</span>
                    <span><FiUsers className="me-1" />{test.attempts} attempts</span>
                    <span><FiCalendar className="me-1" />{test.lastModified}</span>
                  </div>
                </div>
                <Dropdown>
                  <Dropdown.Toggle variant="link" className="btn-actions">
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
        ))}

        {currentContents.folders.length === 0 && filteredAndSortedTests.length === 0 && (
          <div className="empty-state">
            <p>No content in this folder</p>
          </div>
        )}
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
    </div>
  );
};

export default TestsPortal; 