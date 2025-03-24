import { useState } from 'react';
import { Card, Table, Button, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaTrash, FaKey } from 'react-icons/fa';

const UserRoles = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Super Admin', members: 1 },
    { id: 2, name: 'Customer', members: 1 },
    { id: 3, name: 'Manager', members: 0 },
    { id: 4, name: 'POS Operator', members: 0 },
    { id: 5, name: 'Staff', members: 0 },
    { id: 6, name: 'Admin', members: 1 },
    { id: 7, name: 'Teacher', members: 0 }
  ]);

  const [showPermissions, setShowPermissions] = useState(false);
  const [showAddRole, setShowAddRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [permissions, setPermissions] = useState({
    dashboard: { view: true },
    courses: { create: true, update: true, delete: true, view: true },
    students: { create: true, update: true, delete: true, view: true },
    faculty: { create: true, update: true, delete: true, view: true },
    content: { create: true, update: true, delete: true, view: true }
  });

  const handleShowPermissions = (role) => {
    setSelectedRole(role);
    setShowPermissions(true);
  };

  return (
    <>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4 className="card-title mb-0">Role & Permissions</h4>
          <Button variant="primary" onClick={() => setShowAddRole(true)}>
            Add Role
          </Button>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table className="table-hover">
              <thead>
                <tr>
                  <th>Role Name</th>
                  <th>Members</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.id}>
                    <td>{role.name}</td>
                    <td>({role.members}) Members</td>
                    <td className="text-end">
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleShowPermissions(role)}
                      >
                        <FaKey /> Permissions
                      </Button>
                      <Button variant="outline-success" size="sm" className="me-2">
                        <FaEdit /> Edit
                      </Button>
                      {role.name !== 'Super Admin' && (
                        <Button variant="outline-danger" size="sm">
                          <FaTrash /> Delete
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Permissions Modal */}
      <Modal 
        show={showPermissions} 
        onHide={() => setShowPermissions(false)} 
        size="lg"
        className="permissions-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Role & Permissions ({selectedRole?.name})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table className="permissions-table">
            <thead>
              <tr>
                <th>#</th>
                <th>MODULE</th>
                <th>CREATE</th>
                <th>UPDATE</th>
                <th>DELETE</th>
                <th>VIEW</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(permissions).map(([page, perms], idx) => (
                <tr key={page}>
                  <td>{idx + 1}</td>
                  <td className="module-name text-capitalize">{page}</td>
                  <td>
                    {perms.create !== undefined && (
                      <Form.Check type="checkbox" defaultChecked={perms.create} />
                    )}
                  </td>
                  <td>
                    {perms.update !== undefined && (
                      <Form.Check type="checkbox" defaultChecked={perms.update} />
                    )}
                  </td>
                  <td>
                    {perms.delete !== undefined && (
                      <Form.Check type="checkbox" defaultChecked={perms.delete} />
                    )}
                  </td>
                  <td>
                    <Form.Check type="checkbox" defaultChecked={perms.view} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPermissions(false)}>
            Cancel
          </Button>
          <Button className='bg-primary border-0'>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Role Modal */}
      <Modal show={showAddRole} onHide={() => setShowAddRole(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Role Name</Form.Label>
            <Form.Control type="text" placeholder="Enter role name" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddRole(false)}>
            Cancel
          </Button>
          <Button variant="primary">Add Role</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserRoles; 