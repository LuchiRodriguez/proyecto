import { useState } from "react";
import { createChallenge } from "../app/api/Challenge";
import { useUserContext } from "../app/UserProvider";
import { PopUpCreateChallenge } from "../app/Styles";

const CreateChallenge = ({ create, setCreate, refetch }) => {
  // const history = useHistory(); //Para obtener el objeto historia para navegar.
  const [user] = useUserContext();
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [pointsError, setPointsError] = useState(""); //Para lidiar con los puntos mal validados.

  const handleSubmit = async (e) => {
    e.preventDefault(); //evita el envío predeterminado del formulario

    if (points < 1 || points > 500) {
      setPointsError("Los puntos deben estar entre 1 y 500");
      return;
    }
    const formData = new FormData();
    formData.append("description", description);
    formData.append("points", points);
    formData.append("watcher", user.username);

    try {
      const res = await createChallenge(formData);
      console.log("New challenge created: ", res.data);
      refetch();
      setCreate(false);
    } catch (error) {
      console.log("Error creating challenge:", error);
    }
  };
  //que no se muestre o que no se pueda modificar. el id
  return (
    <PopUpCreateChallenge create={create}>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="points">Points: </label>
          <input
            type="number"
            id="points"
            value={points}
            onChange={(e) => {
              const newPoints = parseInt(e.target.value, 10);
              if (isNaN(newPoints)) {
                setPointsError("Los puntos deben ser un número entero");
                return;
              }
              setPoints(newPoints);
              setPointsError(""); //Borrar el error si los puntos son válidos.
            }}
            min="1"
            max="500"
            required
          />
          {pointsError && <span className="error">{pointsError}</span>}
        </div>
        <button type="submit">Crear desafío</button>
      </form>
    </PopUpCreateChallenge>
  );
};

export default CreateChallenge;
