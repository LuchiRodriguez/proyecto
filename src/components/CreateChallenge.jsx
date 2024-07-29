import { useState, useCallback } from "react";
import { createChallenge } from "../app/api/Challenge";
import { useUserContext } from "../app/UserProvider";
import { PopUpCreateChallenge } from "../app/Styles";

const CreateChallenge = ({ create, setCreate, refetch }) => {
  const [user] = useUserContext();
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [pointsError, setPointsError] = useState("");
  const [error, setError] = useState();

  const validatePoints = useCallback((points) => {
    if (points < 1 || points > 500) {
      setPointsError("Points must be between 1 and 500");
      return false;
    }
    setPointsError("");
    return true;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePoints(points)) {
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
      console.error("Error creating challenge:", error);
      setError("Failed to create challenge. Please try again");
    }
  };

  return (
    <PopUpCreateChallenge $create={create}>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <label htmlFor="description">Description: </label>
          <button
            type="button"
            className="closeButton"
            onClick={() => setCreate(false)}
          >
            x
          </button>
        </div>
        <textarea
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
              if (!validatePoints(newPoints)) {
                return;
              }
              setPoints(newPoints);
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

