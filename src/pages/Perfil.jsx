import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { PerfilStyle } from "../app/Styles";
import { useUserContext } from "../app/UserProvider";

const Perfil = () => {
  const [user] = useUserContext();
  const [nombre] = useState();
  const [email] = useState();
  const [perfil] = useState();
  const [image, setImage] = useState(null);
  const [, setChallengesData] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        reader.readAsDataURL(file);
      };
    }
  };

  useEffect(() => {
    console.log(user);
    fetch("../components/desafios.json")
      .then((res) => res.json())
      .then((data) => {
        setChallengesData(data);
        calculateTotalPoints(data);
      });
  }, []);

  const calculateTotalPoints = (challenges) => {
    let total = 0;
    for (const challenge of challenges) {
      total += parseInt(challenge.points, 10);
    }
    setTotalPoints(total);
  };

  return (
    <>
      <PerfilStyle>
        <div className="entrance">
          <img src={image} alt="" />
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <div>
          <p>Username : {nombre} </p>
          <p>Email: {email} </p>
          <p>User profile: {perfil}</p>
          <p>Points: {totalPoints}</p>
        </div>
      </PerfilStyle>
      <NavBar />
    </>
  );
};

export default Perfil;
