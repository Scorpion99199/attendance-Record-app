
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import axios from 'axios';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../App.css"

const SignInScreen = () => {
  const navigate=useNavigate();
  const {search}=useLocation();
  const redirectInURL=new URLSearchParams(search).get("redirect");
  const redirect=redirectInURL?redirectInURL:"/";
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [showPassword, setShowPassword] = useState(true);
  const {state,dispatch:ctxDispatch}=useContext(Store);
  const {userInfo}=state;
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const submitHandler=async(e)=>{
       e.preventDefault();
       try {
          const {data}=await axios.post("http://localhost:5000/api/users/signin",{email,password});
          ctxDispatch({type:"USER_SIGNIN",payload:data});
          localStorage.setItem('userInfo',JSON.stringify(data));
          navigate(redirect || '/');
       } catch (error) {
          toast.error(getError(error));
          
       }
      
  }
  useEffect(()=>{
          if(userInfo){
            navigate(redirect);
          }
  },[userInfo,navigate,redirect])
  return (
    <Container className='small-container'>
      <Navbar>
      <Navbar.Brand className="c"><span className='A'>A</span><span className='R'>R</span></Navbar.Brand>
      </Navbar>
      <h1 className="my-3 btext">
        Sign In
      </h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
            <Form.Label>
                Email:
            </Form.Label>
            <Form.Control type="email" required onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
            <Form.Label>
              Password:
            </Form.Label>
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
        </Form.Group>
        <div className="mb-3">
          <Button type="submit" variant="btn btn-outline-primary">Sign In</Button>
          </div>
          <div>
            new user?{"  "}
            <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
          </div>
      </Form>

    </Container>
  )
}

export default SignInScreen