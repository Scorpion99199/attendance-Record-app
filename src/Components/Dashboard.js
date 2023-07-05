import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AdminDashboard from './AdminDashboard'
import {Store}from '../Store'
import ManageClass from './ManageClasses'
import AttendanceComponent from'./Attendance'
import ClassesComponent from './ClassComponent'
import NavigationBar from '../Components/NavBar'
const Dashboard = () => {
  const { state } = useContext(Store);
  const{userInfo}=state;
  

  return (
    
    <div className="container">
      <NavigationBar/>
      <h1 className="mt-4">Welcome to the Dashboard!</h1>
      {userInfo.role === 'admin' && (
        <div>
          
          {/* Display admin-specific information and options */}
          <ul className="list-group mt-3">
            <li className="list-group-item">
              <AdminDashboard/>
            </li>
            
          
           
          </ul>
        </div>
      )}
      {userInfo.role === 'student' && (
        <div>
          <h2>Student Dashboard</h2>
          {/* Display student-specific information and options */}
          <ul className="list-group mt-3">
            <li className="list-group-item">
              <Link to="/profile">View Profile</Link>
            </li>
            <li className="list-group-item">
              <Link to="/class-schedule">Class Schedule</Link>
            </li>
            <li className="list-group-item">
              <Link to="/attendance-records">Attendance Records</Link>
            </li>
          </ul>
        </div>
      )}
      {userInfo.role === 'doctor' && (
        <div>
          <h2>Doctor Dashboard</h2>
          {/* Display teacher-specific information and options */}
          <ul className="list-group mt-3">
            
           
            
            <li className="list-group-item">
              <Link to="/manage-students">Manage Students</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
