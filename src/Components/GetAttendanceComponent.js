import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button,Table } from 'react-bootstrap';
import {useParams}from 'react-router-dom'


const GetAttendanceComponent = () => {
  
    const params=useParams();
    const [date, setDate] = useState('');
    const {classId}=params;
    const [attendances,setAttendances]=useState([]);
    const fetchAttendanceRecords = async () => {
      console.log(date)
      try {
        const response = await axios.post(`http://localhost:5000/api/classes/${classId}`, {
          date,
        });
  
        const attendanceRecords = response.data.attendanceRecords;
        console.log('Attendance Records:', attendanceRecords);
        setAttendances(attendanceRecords);
        console.log(attendances);
        // Process the attendance records as needed
      } catch (error) {
        console.error('Error fetching attendance records:', error);
        // Handle the error
      }
    };
  
   
  
    const handleDateChange = (event) => {
      setDate(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      fetchAttendanceRecords();
    };
    return (
      <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="date">
          <Form.Label>Date:</Form.Label>
          <Form.Control type="date" value={date} onChange={handleDateChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Fetch Attendance Records
        </Button>
      </Form>
      {attendances.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Student</th>
              <th>Class</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendances.map((attendance) => (
              <tr key={attendance._id}>
                <td>{attendance.student.username}</td>
                <td>{attendance.class.className}</td>
                <td>{attendance.date}</td>
                <td>{attendance.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        )
      }
      </div>
    );
  ;
  
}

export default GetAttendanceComponent
// Import the necessary dependencies

