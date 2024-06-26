import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from '../pages/Landing'
import Jugador from '../pages/Jugador'
import Observador from '../pages/Observador'
import Home from '../pages/Home'
import Perfil from '../pages/Perfil'
import Challenges from '../pages/Challenges'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Landing />} />
                <Route path="/:name" element={<Jugador />} />
                <Route path="/:name" element={<Observador />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/challenges" element={<Challenges />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router