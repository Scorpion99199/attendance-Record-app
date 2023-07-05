import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import RegisterScreen from './Screens/RegisterScreen';
import SignInScreen from './Screens/SignInScreen';
import ProfileScreen from './Screens/ProfileScreen';
import AdminDashboard from './Components/AdminDashboard';
import AttendanceComponent from './Components/Attendance';
import GetAttendanceComponent from './Components/GetAttendanceComponent';
import ManageClass from './Components/ManageClasses';
import ClassesComponent from './Components/ClassComponent';
import AttendanceHistory from './Components/AttendanceHistory';
import AdminRegister from './Components/AdminRegister'
import StudentClasses from './Screens/StudentClasses';
import { Store } from './Store';

function App() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const handleHomeClick = () => {
    if (!userInfo) {
      navigate('/register');
    }
  };

  return (
   
      <div className="d-flex flex-column site-container active-cont">
        <header>
          <Container>
            <ToastContainer position="bottom-center" limit={1} />
            <Routes>
              <Route
                path="/"
                element={
                  userInfo ? (
                    <HomeScreen />
                  ) : (
                    <div className="nouser">
                      <h1>Welcome!</h1>
                      <p>Please register to continue.</p>
                      <button className="btn btn-outline-primary" onClick={handleHomeClick}>Register</button>
                    </div>
                  )
                }
              />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route
                path="/mark-attendance/:id"
                element={<AttendanceComponent />}
              />
              <Route path='/registerforadmin' element={<AdminRegister/>}/>
              <Route
                path="/get-attendance/:classId"
                element={<GetAttendanceComponent />}
              />
              <Route path="/classes" element={<ManageClass />} />
              <Route path="/mark-attendance" element={<ClassesComponent />} />
              <Route path="/class-schedule" element={<StudentClasses />} />
              <Route
                path="/getAttendanceHistory/:classId"
                element={<AttendanceHistory />}
              />
            </Routes>
          </Container>
        </header>
      </div>

  );
}

export default App;
