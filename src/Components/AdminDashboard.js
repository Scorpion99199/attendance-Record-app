import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { Card, Table, Button, Modal, Form } from 'react-bootstrap';
import {Store}from '../Store'
import NavigationBar from '../Components/NavBar'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import {getError}from '../utils'
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const {state}=useContext(Store);
  const {userInfo}=state;
  const [editUserModalShow, setEditUserModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUserName, setEditUserName] = useState('');
  const [editUserEmail, setEditUserEmail] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [role, setRole] = useState('');
const[grade,setGrade]=useState('');
const [showPassword, setShowPassword] = useState(true);
  useEffect(() => { 
    axios.get('http://localhost:5000/api/users',{
      headers:{ Authorization: `Bearer ${userInfo.token}` }
  })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        toast.error(getError(error))
      });
  }, [userInfo.token,users]);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const isAdmin = userInfo.role
  const deleteUser = (userId) => {
    axios.delete(`http://localhost:5000/api/users/${userId}`,{
      headers:{ Authorization: `Bearer ${userInfo.token}` }
  })
      .then((response) => {
        setUsers(users.filter(user => user._id !== userId));
        toast.success("user deleted successfully")
      })
      .catch((error) => {
        toast.error(getError(error))
      });
  };
  const openEditUserModal = (user) => {
    setSelectedUser(user);
    setEditUserName(user.username);
    setEditUserEmail(user.email);
    setEditUserModalShow(true);
  };

  const closeEditUserModal = () => {
    setSelectedUser(null);
    setEditUserName('');
    setEditUserEmail('');
    setEditUserModalShow(false);
  };

  const saveEditedUser = () => {
    const updatedUser = {
      ...selectedUser,
      username: editUserName,
      email: editUserEmail
    };
    axios.put(`http://localhost:5000/api/users/${selectedUser._id}`, updatedUser,{
      headers:{ Authorization: `Bearer ${userInfo.token}` }
  })
      .then((response) => {
        const updatedUsers = users.map(user =>
          user._id === selectedUser._id ? response.data : user
        );
        setUsers(updatedUsers);
        closeEditUserModal();
        toast.success("user updated successfully")
      })
      .catch((error) => {
        toast.error(getError(error))
      });
  };
  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);
    console.log(role) 
  };
  
  const handleAddUser = async () => {
    try {
      const newUser = {
        username,
        email,
        password,
        role,grade
      };
      const response = await axios.post('http://localhost:5000/api/users/add', newUser,{
        headers:{ Authorization: `Bearer ${userInfo.token}` }
    });
      setShowAddUserModal(false);
      setUsername('');
      setEmail('');
      setPassword('');
      toast.success('new user added');
    } catch (error) {
      toast.error(getError(error))
    }
  };
  

  return (
    <div className="container">
      <NavigationBar/>
      <h1 className="mt-4 btext">Welcome to the Dashboard!🖐</h1>
      
      {isAdmin && (
        <Card>
          <Card.Header className='fw-bold'>User Management</Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                  {
                    
                  }
                </tr>
              </thead>
              <tbody>
              {users.map((user) => (
  user.role !== 'admin' && (
    <tr key={user._id}>
      <td>{user._id}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <Button variant="btn btn-outline-primary" onClick={() => openEditUserModal(user)}>Edit</Button>
        <Button variant="btn btn-outline-danger" onClick={() => deleteUser(user._id)}>Delete</Button>
      </td>
    </tr>
  )))}
              </tbody>
            </Table>
            <Button variant="btn btn-outline-primary" onClick={() => setShowAddUserModal(true)}>Add User</Button>
          </Card.Body>
        </Card>
      )}
       <Modal show={editUserModalShow} onHide={closeEditUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              value={editUserName}
              onChange={(e) => setEditUserName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={editUserEmail}
              onChange={(e) => setEditUserEmail(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-outline-secondary" onClick={closeEditUserModal}>Cancel</Button>
          <Button variant="btn btn-outline-primary" onClick={saveEditedUser}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAddUserModal} onHide={() => setShowAddUserModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title className="btext c">Add User</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group>
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" value={username} onChange={handleNameChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" value={email} onChange={handleEmailChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <div className='password-input'>
                    <Form.Control
                    type={showPassword?'password':'text'}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    className='password-field' 
                    />
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className='password-icon'
                      onClick={togglePasswordVisibility} />
                    </div>
      </Form.Group>
    </Form>
    <Form.Group>
    <Form.Label>Role</Form.Label>
    <Form.Check
      type="radio"
      label="Prof"
      name="role"
      value="doctor"
      onChange={handleRoleChange}
    />
    <Form.Check
      type="radio"
      label="student"
      name="role"
      value="student"
      onChange={handleRoleChange}
    />
  </Form.Group>
  {
    role==='student'?(
      <>
          <Form.Select onChange={e=>setGrade(e.target.value)} aria-label="Default select example">
      <option>Choose your grade</option>
      <option value="1st">One</option>
      <option value="2nd">Two</option>
      <option value="3rd">Three</option>
      <option value="4th">Four</option>
    </Form.Select>
      </>
    ):null
  }
 
  </Modal.Body>
  <Modal.Footer>
    <Button variant="btn btn btn-outline-secondary" onClick={() => setShowAddUserModal(false)}>
      Cancel
    </Button>
    <Button variant="btn btn-outline-primary" onClick={handleAddUser}>
      Add User
    </Button>
  </Modal.Footer>
</Modal>  
    </div>
  );
};

export default AdminDashboard;
