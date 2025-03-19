import { useState } from 'react';
import { Button, Card, Form, Modal, Breadcrumb, Dropdown } from 'react-bootstrap';
import { 
  FiFolder, FiVideo, FiFileText, FiImage, FiArchive,
  FiPlus, FiMoreVertical, FiEdit2, FiTrash2, FiMove,
  FiDownload, FiUpload, FiLink, FiX
} from 'react-icons/fi';

const CourseContent = ({ setActiveStep, setProgress }) => {
  const [contents, setContents] = useState([
    {
      id: '1',
      type: 'folder',
      name: 'Bank Exams',
      items: [
        {
          id: '1-1',
          type: 'video',
          name: 'Welcome Video',
          duration: '5:30',
          isPreview: true
        },
        {
          id: '1-2',
          type: 'document',
          name: 'Course Overview',
          size: '1.2 MB'
        }
      ]
    }
  ]);

  const [currentPath, setCurrentPath] = useState([]);
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showAddContent, setShowAddContent] = useState(false);
  const [addContentType, setAddContentType] = useState(null);
  const [contentName, setContentName] = useState('');
  const [contentFile, setContentFile] = useState(null);

  // Get current folder contents based on path
  const getCurrentContents = () => {
    let current = contents;
    for (const folderId of currentPath) {
      const folder = current.find(item => item.id === folderId);
      if (folder && folder.items) {
        current = folder.items;
      }
    }
    return current;
  };

  // Add content to current folder
  const addContent = (type, name) => {
    const newContent = {
      id: Date.now().toString(),
      type,
      name,
      items: type === 'folder' ? [] : undefined
    };

    if (currentPath.length === 0) {
      setContents([...contents, newContent]);
    } else {
      const updateNestedContent = (items, path, newItem) => {
        return items.map(item => {
          if (item.id === path[0]) {
            if (path.length === 1) {
              return {
                ...item,
                items: [...(item.items || []), newItem]
              };
            }
            return {
              ...item,
              items: updateNestedContent(item.items || [], path.slice(1), newItem)
            };
          }
          return item;
        });
      };

      setContents(updateNestedContent(contents, currentPath, newContent));
    }
  };

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      addContent('folder', newFolderName);
      setNewFolderName('');
      setShowAddFolder(false);
    }
  };

  const navigateToFolder = (folderId, folderName) => {
    setCurrentPath([...currentPath, folderId]);
  };

  const navigateBack = () => {
    setCurrentPath(currentPath.slice(0, -1));
  };

  const getBreadcrumbItems = () => {
    let items = [{ id: null, name: 'Contents' }];
    let path = [];
    
    for (const folderId of currentPath) {
      path.push(folderId);
      let current = contents;
      for (const id of path) {
        const folder = current.find(item => item.id === id);
        if (folder) {
          items.push({ id: folder.id, name: folder.name });
          current = folder.items || [];
        }
      }
    }
    
    return items;
  };

  const getContentIcon = (type) => {
    switch (type) {
      case 'folder':
        return <FiFolder className="text-warning" />;
      case 'video':
        return <FiVideo className="text-primary" />;
      case 'document':
        return <FiFileText className="text-info" />;
      case 'image':
        return <FiImage className="text-success" />;
      case 'archive':
        return <FiArchive className="text-secondary" />;
      default:
        return <FiFileText className="text-muted" />;
    }
  };

  const handleAddContent = (type) => {
    setAddContentType(type);
    setShowAddContent(true);
  };

  const handleContentSubmit = () => {
    if (contentName.trim()) {
      const newContent = {
        id: Date.now().toString(),
        type: addContentType,
        name: contentName,
        size: contentFile?.size ? `${(contentFile.size / (1024 * 1024)).toFixed(1)} MB` : undefined,
        duration: addContentType === 'video' ? '0:00' : undefined,
      };

      addContent(addContentType, contentName);
      setContentName('');
      setContentFile(null);
      setShowAddContent(false);
    }
  };

  const handleContentAction = (action, contentId, parentId = null) => {
    switch (action) {
      case 'edit':
        // Implement edit functionality
        break;
      case 'delete':
        if (parentId) {
          setContents(contents.map(content => 
            content.id === parentId
              ? { ...content, items: content.items.filter(item => item.id !== contentId) }
              : content
          ));
        } else {
          setContents(contents.filter(content => content.id !== contentId));
        }
        break;
      default:
        break;
    }
  };

  const ContentActions = ({ contentId, parentId = null }) => (
    <Dropdown align="end">
      <Dropdown.Toggle variant="link" className="btn-sm text-muted p-0 shadow-none">
        <FiMoreVertical />
      </Dropdown.Toggle>
      <Dropdown.Menu className="border-0 shadow-sm">
        <Dropdown.Item onClick={() => handleContentAction('edit', contentId, parentId)}>
          <FiEdit2 className="me-2" /> Edit
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleContentAction('delete', contentId, parentId)} className="text-danger">
          <FiTrash2 className="me-2" /> Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <div>
      {/* Add Folder Modal */}
      <Modal 
        show={showAddFolder} 
        onHide={() => setShowAddFolder(false)}
        centered
      >
        <Modal.Header className="border-0">
          <Modal.Title>Add Folder</Modal.Title>
          <Button 
            variant="link" 
            className="p-0 ms-2" 
            onClick={() => setShowAddFolder(false)}
          >
            <FiX size={20} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Folder name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="bg-light border-0"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button 
            variant="primary" 
            className="rounded-pill px-4"
            onClick={handleAddFolder}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Content Modal */}
      <Modal 
        show={showAddContent} 
        onHide={() => setShowAddContent(false)}
        centered
      >
        <Modal.Header className="border-0">
          <Modal.Title>
            {addContentType === 'video' ? 'Add Video' :
             addContentType === 'document' ? 'Add Document' :
             addContentType === 'image' ? 'Add Image' :
             addContentType === 'archive' ? 'Add Zip File' :
             'Add Content'}
          </Modal.Title>
          <Button 
            variant="link" 
            className="p-0 ms-2" 
            onClick={() => setShowAddContent(false)}
          >
            <FiX size={20} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter content name"
              value={contentName}
              onChange={(e) => setContentName(e.target.value)}
              className="bg-light border-0"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>File</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setContentFile(e.target.files?.[0])}
              className="bg-light border-0"
              accept={
                addContentType === 'video' ? 'video/*' :
                addContentType === 'image' ? 'image/*' :
                addContentType === 'archive' ? '.zip,.rar,.7z' :
                '*/*'
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button 
            variant="primary" 
            className="rounded-pill px-4"
            onClick={handleContentSubmit}
          >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Content Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Breadcrumb className="mb-0">
            {getBreadcrumbItems().map((item, index) => (
              <Breadcrumb.Item
                key={index}
                active={index === getBreadcrumbItems().length - 1}
                onClick={() => {
                  if (index === 0) {
                    setCurrentPath([]);
                  } else {
                    setCurrentPath(currentPath.slice(0, index));
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                {item.name}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>
        <div className="d-flex gap-2">
          <Dropdown>
            <Dropdown.Toggle variant="primary" className="rounded-pill d-flex align-items-center">
              <FiPlus className="me-2" /> Add Content
            </Dropdown.Toggle>
            <Dropdown.Menu className="border-0 shadow-sm">
              <Dropdown.Item onClick={() => setShowAddFolder(true)}>
                <FiFolder className="me-2" /> New Folder
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleAddContent('video')}>
                <FiVideo className="me-2" /> Upload Video
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleAddContent('document')}>
                <FiFileText className="me-2" /> Add Document
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleAddContent('image')}>
                <FiImage className="me-2" /> Add Image
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleAddContent('archive')}>
                <FiArchive className="me-2" /> Add Zip File
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleAddContent('link')}>
                <FiLink className="me-2" /> Add External Link
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="outline-primary" className="rounded-pill">
            <FiUpload className="me-2" /> Import Content
          </Button>
        </div>
      </div>

      {/* Content List */}
      <div className="content-list bg-light rounded-3 p-3">
        {getCurrentContents().map(content => (
          <Card 
            key={content.id} 
            className="border-0 bg-white mb-2 cursor-pointer"
            onClick={() => {
              if (content.type === 'folder') {
                navigateToFolder(content.id, content.name);
              }
            }}
          >
            <Card.Body className="py-2 px-3">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  {content.type === 'folder' ? (
                    <FiFolder className="text-primary" size={24} />
                  ) : content.type === 'video' ? (
                    <FiVideo className="text-info" size={24} />
                  ) : content.type === 'image' ? (
                    <FiImage className="text-success" size={24} />
                  ) : content.type === 'archive' ? (
                    <FiArchive className="text-warning" size={24} />
                  ) : content.type === 'link' ? (
                    <FiLink className="text-purple" size={24} />
                  ) : (
                    <FiFileText className="text-success" size={24} />
                  )}
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-0">{content.name}</h6>
                  {content.type === 'folder' && content.items && (
                    <small className="text-muted">
                      {content.items.filter(item => item.type === 'video').length} video(s), 
                      {content.items.filter(item => item.type !== 'video').length} file(s)
                    </small>
                  )}
                  {content.duration && (
                    <small className="text-muted">Duration: {content.duration}</small>
                  )}
                  {content.size && (
                    <small className="text-muted">Size: {content.size}</small>
                  )}
                </div>
                <Dropdown>
                  <Dropdown.Toggle variant="link" className="text-muted p-0">
                    <FiMoreVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="border-0 shadow-sm">
                    <Dropdown.Item>
                      <FiEdit2 className="me-2" /> Edit
                    </Dropdown.Item>
                    <Dropdown.Item className="text-danger">
                      <FiTrash2 className="me-2" /> Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Card.Body>
          </Card>
        ))}

        {getCurrentContents().length === 0 && (
          <div className="text-center text-muted py-5">
            <p>Insert contents inside</p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mt-4">
        <Button 
          variant="light" 
          className="px-4 rounded-pill"
          onClick={() => setActiveStep(2)}
        >
          Previous
        </Button>
        <Button 
          variant="primary" 
          className="px-4 rounded-pill"
          onClick={() => {
            setProgress(75);
            setActiveStep(4);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CourseContent; 