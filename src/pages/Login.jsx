/* eslint-disable no-unused-vars */
import { Form } from "../app/Styles";
import { useUserContext } from "../app/UserProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postUser } from "../app/api/Login";
import { createUser } from "../app/api/Register";
// import SwitchButton from "../components/SwitchButton";
import player from "../app/img/playerNavBar/player.png";
import watcher from "../app/img/watcherNavBar/watcher.png";

const Login = () => {
  const navigate = useNavigate();
  const [existingUser, setExistingUser] = useState(true);
  const [rol, setRol] = useState();
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [points, setPoints] = useState();
  const [user, setUser] = useUserContext();
  const [error, setError] = useState();

  const handleRolChange = (event) => {
    setRol(event.target.value);
  };

  return (
    <Form>
      {existingUser ? (
        <>
          {error && (
            <p style={{ color: "#f40e03" }}>
              {" "}
              Failed to login. Please try again
            </p>
          )}
          <input
            autoComplete="off"
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            required
          ></input>
          <input
            autoComplete="off"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <p>
            New in AIM?
            <br />
            <span onClick={() => setExistingUser(false)}>
              Create an account
            </span>
          </p>
          <button
            type="button"
            onClick={async () => {
              setError(null);
              try {
                await postUser(username, password).then((data) => {
                  setUser({ ...data.data, username, password });
                });

                navigate("/");
              } catch (error) {
                setError(error.message);
              }
            }}
          >
            LOGIN
          </button>
        </>
      ) : (
        <>
          <p>Selecciona tu rol:</p>
          <fieldset required>
            <div>
              <label htmlFor="player">
                <img src={player} alt="" />
              </label>

              <input
                type="radio"
                name="rol"
                id="player"
                value="player"
                onChange={handleRolChange}
              />
            </div>
            <div>
              <label htmlFor="watcher">
                <img src={watcher} alt="" />
              </label>

              <input
                type="radio"
                name="rol"
                id="watcher"
                value="watcher"
                onChange={handleRolChange}
              />
            </div>
          </fieldset>
          <input
            autoComplete="off"
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            required
          ></input>
          <input
            autoComplete="off"
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <input
            autoComplete="off"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <p>
            Already have an account ?<br />
            <span onClick={() => setExistingUser(true)}>Login</span>
          </p>
          <button
            type="button"
            onClick={async () => {
              setPoints(0);
              await createUser({
                rol,
                username,
                email,
                password,
                points,
              });
              setUser({ rol, username, password });
              console.log(rol);
              localStorage.setItem(
                "user",
                JSON.stringify({ rol, username, password })
              );
              navigate("/");
            }}
          >
            REGISTER
          </button>
        </>
      )}
    </Form>
  );
};

export default Login;
