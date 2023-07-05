
import{Store}from '../Store'
import  '../App.css';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Form, Button, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import NavigationBar from './NavBar'
import {getError}from '../utils';
import { toast } from 'react-toastify';

const AttendanceComponent = () => {
  const [classInfo, setClassInfo] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const {state}=useContext(Store)
  const {userInfo}=state
  const params=useParams();
  const {id}=params;
  console.log(userInfo.token)

  useEffect(() => {
    const fetchClassInfo  = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        const data = response.data;
        setClassInfo(data);
      
        

      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClassInfo();
  }, [id,userInfo.token]);
 

  const toggleStudentSelection = (studentId) => {
    setSelectedStudents((prevSelectedStudents) => {
      if (prevSelectedStudents.includes(studentId)) {
        return prevSelectedStudents.filter((id) => id !== studentId);
      } else {
        return [...prevSelectedStudents, studentId];
      }
    });
  };

  
  const markAttendance = async (classId, selectedStudents) => {

    try {
      const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;
const status = 'Present'; 
      const response = await axios.post(
        'http://localhost:5000/api/classes/mark',
        {
          classId,
          date:formattedDate,
          status,
          studentIds: selectedStudents,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      toast.success('Attendance marked successfully')
    } catch (error) {
      toast.error(getError(error))
    }
  };
  

  if (!classInfo) {
    return <div>Loading class information...</div>;
  }
  return (
    <div>
      <NavigationBar/>
      <h1 className='btext'>Class Name: {classInfo.className}</h1>
      <p className='fw-bold'>Doctor: {classInfo.doctor.username}</p>
      <p className='fw-bold'>Class Time: {classInfo.classTime}</p>

      <h4 className='fw-bold'>Students:</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {classInfo.students.map((student) => (
            <tr key={student.id}>
              <td>{student.username}</td>
              <td>
                <Form.Check
                  type="checkbox"
                  id={student.id}
                  checked={selectedStudents.includes(student.id)}
                  onChange={() => toggleStudentSelection(student.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button
        variant="btn btn-outline-primary"
        onClick={()=>markAttendance(classInfo.id,selectedStudents)}
        disabled={selectedStudents.length === 0}
      >
        Mark Attendance
      </Button>
    </div>
  );};

export default AttendanceComponent;
