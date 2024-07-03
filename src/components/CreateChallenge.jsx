import { useState } from "react";
import { createChallenge } from "../app/api/Challenge";
import { useUserContext } from "../app/UserProvider";
import { PopUpCreateChallenge } from "../app/Styles";

const CreateChallenge = ({ create, setCreate, refetch }) => {
  // const history = useHistory(); //To get the history object to browse. 
  const [user] = useUserContext();
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [pointsError, setPointsError] = useState(""); //To deal with poorly validated points.

  const handleSubmit = async (e) => {
    e.preventDefault(); //Prevent default form submission

    if (points < 1 || points > 500) {
      setPointsError("Points must be between 1 and 500");
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
  //that is not displayed or that cannot be modified. the ID
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
                setPointsError("Points must be a whole number");
                return;
              }
              setPoints(newPoints);
              setPointsError(""); //Clear the error if the points are valid.
            }}
            min="1"
            max="500"
            required
          />
          {pointsError && <span className="error">{pointsError}</span>}
        </div>
        <button type="submit">Create challenge</button>
      </form>
    </PopUpCreateChallenge>
  );
};

export default CreateChallenge;
