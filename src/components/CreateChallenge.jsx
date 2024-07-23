import { useState } from "react";
import { createChallenge } from "../app/api/Challenge";
import { useUserContext } from "../app/UserProvider";
import { PopUpCreateChallenge } from "../app/Styles";

const CreateChallenge = ({ create, setCreate, refetch }) => {
  const [user] = useUserContext();
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [pointsError, setPointsError] = useState(""); //To deal with poorly validated points.
  const [error, setError] = useState();

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
      setDescription("");
      setPoints("");
      setCreate(false);
    } catch (error) {
      console.log("Error creating challenge:", error);
      setError("Failed to create challenge. Please try again");
    }
  };
  //that is not displayed or that cannot be modified. the ID
  return (
    <PopUpCreateChallenge $create={create}>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <label htmlFor="description">Description: </label>
          <button className="closeButton" onClick={() => setCreate(!create)}>
            x
          </button>
        </div>
        <textarea
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <div>
          <label htmlFor="points">Points: </label>
          <input
            type="number"
            id="points"
            value={points}
            onChange={(e) => {
              const newPoints = parseInt(e.target.value, 10);
              if (newPoints < 1 || newPoints > 500) {
                setPointsError("Points must be between 1 and 500");
              } else {
                setPointsError(""); //Clear the error if the points are valid.
                setPoints(newPoints);
              }
            }}
            min="1"
            max="500"
            required
          />
        </div>

        {pointsError && <p style={{ color: "red" }}>{pointsError}</p>}
        <button type="submit">Create challenge</button>
      </form>
    </PopUpCreateChallenge>
  );
};

export default CreateChallenge;
