import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from '../pages/Landing'
import Jugador from '../pages/Jugador'
import Observador from '../pages/Observador'
import Perfil from '../pages/Perfil'
import Challenges from '../pages/Challenges'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Landing />} />
                <Route path="/jugador/*" element={<Jugador />} />
                <Route path="/observador" element={<Observador />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/challenges" element={<Challenges />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router