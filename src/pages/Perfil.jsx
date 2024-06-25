import { useState } from "react";
import useUserContext from "../app/UserProvider"
import PerfilStyle from "../app/Styles"
import NavBar from "../components/NavBar"
import Landing from "./Landing";

const Perfil = () => {
    const [user,] = useUserContext({});
    const [nombre, setNombre] = useState();
    const [email, setEmail] = useState();
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
        <div>Perfil
            {!user ?
                <Landing />
                :
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
                    </div>
                </PerfilStyle>
            }
            <NavBar />
        </div>
    )
}

export default Perfil