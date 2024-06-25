import { Link } from 'react-router-dom';
import { NavBarStyle } from '../app/Styles';

const NavBar = () => {
    return (
        <NavBarStyle>
            <div className="navbar">
                <ul className="navbarlist">
                    <li><Link to="/"><img src="/src/fotos/icons8-casa-48.png" alt="" /></Link></li>
                    <li><Link to="/jugador"><img src="/src/fotos/icons8-objetivo-50.png" alt="" /></Link></li>
                    <li><Link to="/perfil"><img src="/src/fotos/icons8-usuario-de-género-neutro-50.png" alt="" /></Link>
                    </li>
                </ul>
            </div>
        </NavBarStyle>
    )
}

export default NavBar; 