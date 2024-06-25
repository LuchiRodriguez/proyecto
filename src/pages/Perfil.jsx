import { useState } from "react";
import NavBar from "../components/NavBar"
import { PerfilStyle, ContainerPages } from '../app/Styles';

const Perfil = () => {
    const [nombre,] = useState();
    const [email,] = useState();
    const [perfil,] = useState();
    const [image, setImage] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                reader.readAsDataURL(file);
            }
        }
    }

    return (
        <div>
            <ContainerPages>Perfil</ContainerPages>
            <PerfilStyle>
                <div className="entrance">
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {image && (
                        <div className="foto">
                            <img src={image} alt="Selected" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                        </div>
                    )}
                </div>
                <div className="information">
                    <p>Nombre del usuario: {nombre} </p>
                    <p>Email: {email} </p>
                    <p>Perfil del usuario: {perfil}</p>
                </div>
            </PerfilStyle>
            <NavBar />
        </div>
    )
}

export default Perfil