/* eslint-disable no-unused-vars */
import {Form} from '../app/Styles'
import { useUserContext } from '../app/UserProvider';
import { useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {postUser} from '../app/api/Login';
import {createUser} from '../app/api/Register';

const Login = () => {
      const navigate = useNavigate();
    const params = useParams();
    const [existingUser, setExistingUser] = useState(true);
    const [rol, setRol] = useState();
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [, setUser] = useUserContext();
    const settingRol = () => {
      if(params.name == "jugador"){
        setRol(0);
      } else if(params.name == "observador"){
        setRol(1);
      }
    }
    useEffect(() => {
      settingRol();
    }, [])
  return (
    <Form>
        {existingUser ? 
        <>
            <input type="text" id="user" name="user" placeholder='Email' onChange={(e)=> setUserName(e.target.value)}></input>
            <input type="password" id="password" name="password" placeholder='Password' onChange={(e)=> setPassword(e.target.value)}></input>
            <p>New in Final-Project ?<br /><span onClick={()=>setExistingUser(false)}>Create an account</span></p>
            <button type='button' onClick={async() => {
              await postUser(username, password);
              setUser(username, password);
              navigate('/home')
            }}>
              LOGIN
            </button>
        </>
        :
        <>
            <input type="text" id="username" name="username" placeholder='Username' onChange={(e)=> setUserName(e.target.value)}></input>
            <input type="text" id="email" name="email" placeholder='Email' onChange={(e)=> setEmail(e.target.value)}></input>
            <input type="password" id="password" name="password" placeholder='Password' onChange={(e)=> setPassword(e.target.value)}></input>
            <p>Already have an account ?<br /><span onClick={()=>setExistingUser(true)}>Login</span></p>
            <button type='button' onClick={async() => {
              await createUser({rol, username, email, password});
              setUser({rol, username, email});
              navigate('/home')
            }}>
              REGISTER
            </button>
        </>
        }
    </Form>
  )
}

export default Login