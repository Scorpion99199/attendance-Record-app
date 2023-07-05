import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import {Store}from'../Store'
import NavigationBar from './NavBar'
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form'
import {getError}from '../utils'
const ManageClass = () => {
  const {state}=useContext(Store);
  const {userInfo}=state;
  const [className, setClassName] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const[grade,setGrade]=useState('');
  const [studentIds, setStudentIds] = useState([]);
  const [time, setTime] = useState('');
  const [users, setUsers] = useState([]);
 

  useEffect(() => {
    
    axios.get('http://localhost:5000/api/users/students',{
      headers:{ Authorization: `Bearer ${userInfo.token}` }
  })
      .then(response => {
        setUsers(response.data);
        
      })
      .catch(error => {
        toast.error(getError(error))
      });
      axios.get('')
      
  }, [userInfo.token]);

  
  const handleStudentChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions);
    const selectedIds = selectedOptions.map(option => option.value);
    setStudentIds(selectedIds);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newClass = {
      className,
      doctorId:userInfo._id,
      studentIds,
      time
    };
    axios.post('http://localhost:5000/api/classes/createClass', newClass,{
      headers:{ Authorization: `Bearer ${userInfo.token}` }
  })
      .then(response => {
        setClassName('');
        setDoctorId('');
        setStudentIds([]);
        setTime('');
        toast.success('Class created successfully')
      }
      )
      .catch(error => {
        toast.error(getError(error))
      });
  };

  return (
    <div className="container">
      <NavigationBar/>
      <h1 className="btext">Create a Class</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="classNameInput">Class Name:</label>
          <input
            type="text"
            id="classNameInput"
            className="form-control my-3"
            value={className}
            onChange={event => setClassName(event.target.value)}
            required
          />
        </div>
        <Form.Select id="grade" onChange={e=>setGrade(e.target.value)} aria-label="Default select example">
      <option>Choose your grade</option>
      <option value="1st">One</option>
      <option value="2nd">Two</option>
      <option value="3rd">Three</option>
      <option value="4th">Four</option>
    </Form.Select>

        <div className="form-group">
          <label htmlFor="studentSelect">Students:</label>
          <select
            id="studentSelect"
            className="form-control my-3"
            multiple
            value={studentIds}
            onChange={handleStudentChange}
            required
          >
           {users.map(user => (
  user.role === 'student' && user.grade === grade && (
    <option key={user._id} value={user._id}>{user.username}</option>
  )
))}
          </select>
        </div>

        <div className="form-group my-3">
          <label htmlFor="classTimeInput">Class date and time</label>
          <input
            type="date"
            id="classTimeInput"
            className="form-control my-3"
            value={time}
            onChange={event => setTime(event.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-outline-primary my-3">Create Class</button>
      </form>
    </div>
  );
};

export default ManageClass;
