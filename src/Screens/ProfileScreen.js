import React, { useContext, useReducer, useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import axios from 'axios';
import NavigationBar from '../Components/NavBar'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../App.css'

const reducer=(state,action)=>{
    switch(action.type){
        case 'UPDATE_REQUEST':
            return {
                ...state,loadingUpdate:true
            }
            case 'UPDATE_SUCCESS':
            return {
                ...state,loadingUpdate:false
            }
            case 'UPDATE_FAIL':
            return {
                ...state,loadingUpdate:false
            }
        default:
            return state
    }
}
export default function ProfileScreen(){
    const [{loadingUpdate},dispatch]=useReducer(reducer,{
        loadingUpdate:false
    })
    const {state,dispatch:ctxDispatch}=useContext(Store)
    const{userInfo}=state;
    const [username,setUsername]=useState(userInfo.username)
    const [email,setEmail]=useState(userInfo.email)
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConnfirmPassword] = useState(true);
   useEffect(()=>{
       console.log(userInfo)
   },[userInfo])
   const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConnfirmPassword(!showConfirmPassword);
  };
   const submitHandler=async(e)=>{
    e.preventDefault();
    try {
        const{data}=await axios.put('http://localhost:5000/api/users/profile',{
            username,
            email,
            password,
        },
        {
            headers:{ Authorization: `Bearer ${userInfo.token}` }
        }
        );
        if(confirmPassword!==password){
            toast.error("Password and ConfirmPassword Should be the same")
        }else{
            dispatch({type:"UPDATE_SUCCESS"});
            ctxDispatch({type:'USER_SIGNIN',payload:data});
            localStorage.setItem('userInfo',JSON.stringify(data))
            toast.success('User updated successfully')
        }  
    } catch (error) {
        dispatch({type:'UPDATE_FAIL',});
        toast.error(getError(error))
    }
   }
    return(
        <div className='container small-container'>
           <NavigationBar/>
            <h1 className='my-3 btext'>User Profile</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='mb-3' controlId='name'>
                    <Form.Label>Fullname:</Form.Label>
                    <Form.Control
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    required
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='email'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='password'>
                    <Form.Label>Password:</Form.Label>
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
                <Form.Group className='mb-3' controlId='password'>
                    <Form.Label>Confirm Password:</Form.Label>
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
                <div>
                    <Button variant="outline-primary" type='submit'>Update</Button>
                </div>
            </Form>
        </div>
    )
}