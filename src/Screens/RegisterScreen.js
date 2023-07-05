import React,{useState,useContext,useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import Navbar from 'react-bootstrap/Navbar'
import axios from 'axios'
import {useNavigate,useLocation,Link}from 'react-router-dom'
import {Store}from '../Store'
import { toast } from 'react-toastify';
import {getError}from '../utils'
import '../App.css'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const RegisterScreen = () => {
    const navigate=useNavigate();
    const {search}=useLocation()
    const redirectInUrl=new URLSearchParams(search).get('redirect');
    const redirect=redirectInUrl?redirectInUrl:'/'
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const[grade,setGrade]=useState('');
   const {state,dispatch:ctxDispatch}=useContext(Store);
   const [showPassword, setShowPassword] = useState(true);
   const [showConfirmPassword, setShowConnfirmPassword] = useState(true);
   const {userInfo}=state;
   const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConnfirmPassword(!showConfirmPassword);
  };
   const submitHandler=async(e)=>{
    e.preventDefault();
    if(password!==confirmPassword){
        toast.error('Password do not match');
        return;
    }
    try {
        const {data}=await axios.post('http://localhost:5000/api/users/register',{
            username,email,password,grade
        });
        ctxDispatch({type:"USER_SIGNIN",payload:data});
        localStorage.setItem('userInfo',JSON.stringfy(data));
        toast.success('your account created');
        navigate(redirect || '/')
    } catch (error) {
        toast.error(getError(error))
    }
   }
   useEffect(()=>{
      if(userInfo){
        navigate(redirect)
      }
   },[navigate,userInfo,redirect])
  return (
    <Container className="small-container">
      <Navbar>
      <Navbar.Brand className="c"><span className='A'>A</span><span className='R'>R</span></Navbar.Brand>
      </Navbar>
      <h1 className="my-3 btext">Sign Up</h1>
      <Form onSubmit={submitHandler} >
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Fullname: <span className="rs">*</span></Form.Label>
          <Form.Control onChange={(e)=>setUsername(e.target.value)}  placeholder='username' required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email:<span className="rs">*</span></Form.Label>
          <Form.Control

            type="email"
            required
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='example@gmail.com'
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password:<span className="rs">*</span></Form.Label>
          <div className='password-input'>
                    <Form.Control
                    type={showPassword?'password':'text'}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    className='password-field' 
                    />
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className='password-icon'
                      onClick={togglePasswordVisibility} />
                    </div>
          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>Confirm Password:<span className="rs">*</span></Form.Label>
            <div className='password-input'>
                    <Form.Control
                    type={showConfirmPassword?'password':'text'}
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    required
                    className='password-field' 
                    />
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEyeSlash : faEye}
                      className='password-icon'
                      onClick={toggleConfirmPasswordVisibility} />
                    </div>
          </Form.Group>
        </Form.Group>
        <label htmlFor="grade" className="my-2">Select your grade:<span className="rs">*</span></label>
        <Form.Select id="grade" onChange={e=>setGrade(e.target.value)} aria-label="Default select example">
      <option>Choose your grade</option>
      <option value="1st">One</option>
      <option value="2nd">Two</option>
      <option value="3rd">Three</option>
      <option value="4th">Four</option>
    </Form.Select>
        <div className="mb-3 my-4">
          <Button type="submit" variant="btn btn-outline-primary" >Sign Up</Button>
        </div>
        <div>
            Already have an account?{"  "}
            <Link to={`/signin?redirect=${redirect}`}>
                 Sign-In
            </Link>
        </div>
      </Form>
    </Container>
  )
}

export default RegisterScreen