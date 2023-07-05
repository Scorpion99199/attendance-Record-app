import React, { useContext } from 'react';
import NavigationBar from '../Components/NavBar'
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../App.css'
import {Store}from '../Store'
const HomeScreen = () => {
  const { state } = useContext(Store);
  const{userInfo}=state;
  return (
    <Container>
        <NavigationBar/>
      <Row className="mt-4">
        <Col>
        {
          userInfo.role==='doctor'?(
          <h2 className="btext">Welcome, dr {userInfo.username}🖐</h2>):(
          <h2 className='btext'>Welcome, {userInfo.username}🖐</h2>
          )
        }
        </Col>
      </Row>
      <Row className="mt-4">
  <Col>
    <div className="profile-info">
      <p><strong>Name:</strong> {userInfo.username}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
    </div>
  </Col>
</Row> {userInfo.role === 'doctor' ? (
        <>
           <Row className="mt-4">
        <Col>
          <h4>Quick Access to Key Features</h4>
          <Link to='/classes'><Button variant="btn btn-outline-primary" className="mr-5 ">Manage Classes</Button></Link>
          <Link to="mark-attendance"><Button variant="btn btn-outline-primary" className="mr-3">Mark Attendance</Button></Link>
        </Col>
      </Row>
        </>
      ) : null}
      {userInfo.role === 'admin' ? (
        <>
           <Row className="mt-4">
        <Col>
          <h4>Quick Access to Key Features</h4>
          <Link to='/dashboard'><Button variant="btn btn-outline-primary" className="mr-5 ">Manage Users</Button></Link>
        </Col>
      </Row>
        </>
      ) : null}
       {userInfo.role === 'student' ? (
        <>
           <Row className="mt-4">
        <Col>
          <h4>Quick Access to Key Features</h4>
          <Link to='/class-schedule'><Button variant="btn btn-outline-primary" className="mr-5 ">Classes and Attendance Record</Button></Link>
        </Col>
      </Row>
        </>
      ) : null}
    </Container>
  );
};

export default HomeScreen;

    