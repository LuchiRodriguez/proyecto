import { Link } from 'react-router-dom';
import { NavBarStyle } from '../app/Styles';
import userImg from '../app/img/user.png';
import challenge from '../app/img/challenge.png'
import home from '../app/img/home.png'

const NavBar = () => {
    return (
        <NavBarStyle>
                <ul>
                    <li><Link to="/"><img src={home} alt="" /></Link></li>
                    <li><Link to="/challenges"><img src={challenge} alt="" /></Link></li>
                    <li><Link to="/perfil"><img src={userImg} alt="" /></Link></li>
                </ul>
        </NavBarStyle>
    )
}

export default NavBar; 