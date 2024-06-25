import {Form} from '../app/Styles'
import { useUserContext } from '../app/UserProvider';
import { useState } from 'react';

const Login = () => {
    const [existingUser, setExistingUser] = useState(true);
    const [, setUser] = useUserContext();
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
            <input type="text" id="username" name="username" placeholder='Username'></input>
            <input type="text" id="email" name="email" placeholder='Email'></input>
            <input type="password" id="password" name="password" placeholder='Password'></input>
            <p>Already have an account ?<br /><span onClick={()=>setExistingUser(true)}>Login</span></p>
            <button onClick={()=>setUser()}>REGISTER</button>
        </>
        }
    </Form>
  )
}

export default Login