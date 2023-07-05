import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import {Store} from '../Store';
import NavigationBar from '../Components/NavBar'
import '../App.css'
import { Card ,Button } from 'react-bootstrap';
import {useNavigate}from 'react-router-dom'
const StudentClasses = () => {
  const navigate=useNavigate()
  const [classes, setClasses] = useState([]);
  const {state}=useContext(Store);
  const {userInfo}=state;
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/atendanceRec/${userInfo._id}`, {
            headers:{ Authorization: `Bearer ${userInfo.token}` }
        });
        setClasses(response.data);
        console.log(classes)
      } catch (error) {
        console.error(error);
      }
    };

    fetchClasses();
  }, [classes,userInfo]);
  const clickedClass=(classId)=>{
    navigate(`/getAttendanceHistory/${classId}`)
  }
  return (
    <div className="container">
        <NavigationBar/>
    <h2 className="mt-4 mb-3 tit">Enrolled Classes</h2>
    <div className='ownS'>
    {classes.map((classItem) => (
      
      <div key={classItem._id} className="card mb-3 card-shadow" >
        <Card.Body>
          <Card.Title>{classItem.className}</Card.Title>
          <Card.Text className="card-text">Doctor: {classItem.doctor.username}</Card.Text>
          <Card.Text className="card-text">Class Time: {classItem.classTime}</Card.Text>
          <Button variant="btn btn-outline-primary" onClick={(e)=>clickedClass(classItem._id)}>Attendance History</Button>
        </Card.Body>
      </div>
    ))}
    </div>
  </div>
  );
};

export default StudentClasses;
