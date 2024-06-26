/* eslint-disable no-unused-vars */
import {Form} from '../app/Styles'
import { useUserContext } from '../app/UserProvider';
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
// import {postUsers} from '../app/api/Login';
import {createUser} from '../app/api/Register';

const Login = () => {
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
            <input type="text" id="user" name="user" placeholder='Username or email'></input>
            <input type="password" id="password" name="password" placeholder='Password'></input>
            <p>New in Final-Project ?<br /><span onClick={()=>setExistingUser(false)}>Create an account</span></p>
            <button onClick={()=>setUser()}>LOGIN</button>
        </>
        :
        <>
            <input type="text" id="username" name="username" placeholder='Username' onChange={(e)=> setUserName(e.target.value)}></input>
            <input type="text" id="email" name="email" placeholder='Email' onChange={(e)=> setEmail(e.target.value)}></input>
            <input type="password" id="password" name="password" placeholder='Password' onChange={(e)=> setPassword(e.target.value)}></input>
            <p>Already have an account ?<br /><span onClick={()=>setExistingUser(true)}>Login</span></p>
            <button type='button' onClick={async()=>{
              await createUser({rol, username, email, password});
            }}>
              REGISTER
            </button>
        </>
        }
    </Form>
  )
}

export default Login