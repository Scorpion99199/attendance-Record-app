import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import{Store}from '../Store'
import {useNavigate}from 'react-router-dom'
import { toast } from 'react-toastify';
import { Card ,Button } from 'react-bootstrap';
import {getError}from '../utils'
import "../App.css"
import NavigationBar from './NavBar'
const ClassesComponent = () => {
  const [classes, setClasses] = useState([]);
  const {state}=useContext(Store)
  const {userInfo}=state
  const navigate=useNavigate()

  useEffect(() => {
    
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/classes/doctor_classes', {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        const data = response.data;
        setClasses(data);
        console.log(classes)
      } catch (error) {
        toast.error(getError(error))
      }
    };

    fetchClasses();
  }, [userInfo.token,classes]);
  const clickedClass=(classId)=>{
    navigate(`/mark-attendance/${classId}`)
  }
  const deleteClass=async(classId)=>{
    try {
      await axios.delete(`http://localhost:5000/api/classes/${classId}`,{
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }).then(response=>{
        toast.success('Class deleted successfully')
      })
    } catch (error) {
      toast.error(getError(error))
    }
   
  }
return (
  <div>
    <NavigationBar/>
    <h1 className="centerh">Classes</h1>
    <div className="ownS" >
    {classes.map((cls) => (
     
      <Card className="c" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{cls.className}</Card.Title>
        <Button variant="outline-primary" onClick={(e)=>clickedClass(cls._id)}>Mark Attendance</Button>
        <Button variant="outline-danger" onClick={(e)=>deleteClass(cls._id)}>Delete</Button>
      </Card.Body>
    </Card>
    
    ))}
    </div>
  </div>
);
}
export default ClassesComponent;
