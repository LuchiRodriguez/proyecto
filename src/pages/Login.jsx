/* eslint-disable no-unused-vars */
import { Form, ChooseRol } from "../app/Styles";
import { useUserContext } from "../app/UserProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postUser } from "../app/api/Login";
import { createUser } from "../app/api/Register";

const Login = () => {
  const navigate = useNavigate();
  const [existingUser, setExistingUser] = useState(true);
  const [rol, setRol] = useState();
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [points, setPoints] = useState();
  const [user, setUser] = useUserContext();

  return (
    <Form>
      {existingUser ? (
        <>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          ></input>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <p>
            New in Final-Project ?<br />
            <span onClick={() => setExistingUser(false)}>
              Create an account
            </span>
          </p>
          <button
            type="button"
            onClick={async () => {
              await postUser(username, password).then((data) => {
                setUser({ ...data.data, username, password });
              });
              try {
                navigate("/");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            LOGIN
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          ></input>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <ChooseRol>
            <input type="radio" name="rol" onClick={() => setRol("player")} />
            <label htmlFor="jugador">Jugador</label>
            <input type="radio" name="rol" onClick={() => setRol("watcher")} />
            <label htmlFor="observador">Observador</label>
          </ChooseRol>
          <p>
            Already have an account ?<br />
            <span onClick={() => setExistingUser(true)}>Login</span>
          </p>
          <button
            type="button"
            onClick={async () => {
              setPoints(0);
              const response = await createUser({
                rol,
                username,
                email,
                password,
                points,
              });
              setUser({ rol, username, password });
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
