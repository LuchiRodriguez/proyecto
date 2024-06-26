import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from '../pages/Landing'
import Jugador from '../pages/Jugador'
import Observador from '../pages/Observador'
import Home from '../pages/Home'
import Perfil from '../pages/Perfil'
import Challenges from '../pages/Challenges'
import Challenge from '../pages/Challenge'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Landing />} />
                <Route path="/jugador/*" element={<Jugador />} />
                <Route path="/observador" element={<Observador />} />
                <Route path="/home" element={<Home />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/challenges" element={<Challenges />} />
                <Route path="/createChallenge" element={<Challenge />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router