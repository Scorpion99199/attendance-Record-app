import React,{useContext,useEffect} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer}from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import {Store}from '../Store'
import '../App.css'
const NavigationBar = () => {

      const {state,dispatch}=useContext(Store);
      const{userInfo}=state;
      const signoutHandler=()=>{
        dispatch({type:'USER_SIGNOUT'});
        localStorage.removeItem('userInfo');
        window.location.href = '/signin';

        
      }
      useEffect(()=>{
        console.log(userInfo)
      })
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/"><span className='A'>A</span><span className='R'>R</span></Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          
          
          {userInfo.role === 'doctor' ? (
        <>
          <Nav.Link as={Link} to="/classes">Create Class</Nav.Link>
          <Nav.Link as={Link} to="/mark-attendance">Attendance</Nav.Link>
        </>
      ) : null}
          {userInfo.role==='admin'?(
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          ):null}
          {userInfo.role==='student'?(
           <Nav.Link as={Link} to="/class-schedule">Classes</Nav.Link>
          ):null}
          
          
          
          {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
