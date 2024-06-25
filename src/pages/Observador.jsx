import Login from "../components/Login"
import NavBar from "../components/NavBar"
import {useUserContext} from '../app/UserProvider';


const Observador = () => {
  const [user, ] = useUserContext();
  return (
    <>
    {
      user ?
      <>
      <NavBar />
      </>
      :
      <Login />
    }
    </>
  )
}

export default Observador