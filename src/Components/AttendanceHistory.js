import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import {useParams}from 'react-router-dom'
import {Store} from '../Store';
import NavigationBar from'./NavBar';
import'../App.css'
const AttendanceHistory = () => {
    const {state}=useContext(Store);
    const {userInfo}=state;
    const params=useParams();
    const {classId}=params;
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  useEffect(() => {
    fetchAttendanceHistory();
  }, []);

  const fetchAttendanceHistory = async () => {
    try {
        console.log(classId)
      const response = await axios.get(`http://localhost:5000/api/classes/${classId}`,{
        headers:{ Authorization: `Bearer ${userInfo.token}` }
    });
      setAttendanceHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
        <NavigationBar/>
      <h1 className="btext">Attendance History</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Class Name</th>
          </tr>
        </thead>
        <tbody>
          {attendanceHistory.map(record => (
            <tr key={record._id}>
              <td>{record.date}</td>
              <td className="design-status">{record.status}</td>
              <td>{record.class.className}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceHistory;
