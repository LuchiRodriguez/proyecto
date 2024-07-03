import styled, { createGlobalStyle } from "styled-components";
import Brose from "../app/fonts/Brose.ttf";
import { Link } from "react-router-dom";

export const GlobalStyle = createGlobalStyle`
	@font-face {
		font-family: Brose;
		src: url(${Brose});
	}
	body {
		background-color: #202124;
		font-family: Brose;
		letter-spacing: 4px;
    color: white;
		margin: 0;
		padding: 10px;
	}
`;

export const LandingPage = styled.div`
  text-align: center;
  margin-top: 200px;
  h1 {
    color: #03e9f4;
    text-transform: uppercase;
    font-size: x-large;
    margin-bottom: 30px;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  a {
    width: 180px;
    position: relative;
    display: inline-block;
    padding: 20px 0;
    margin: 40px 10px;
    color: #03e9f4;
    text-decoration: none;
    transition: 0.5s;
    letter-spacing: 4px;
    overflow: hidden;
  }
  a:hover {
    background: #03e9f4;
    color: #050801;
    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
      0 0 50px #03e9f4;
    -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
  }
  a:nth-child(1) {
    filter: hue-rotate(270deg);
  }
  a:nth-child(2) {
    filter: hue-rotate(110deg);
  }
  a span {
    position: absolute;
    display: block;
  }
  a span:nth-child(1) {
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #03e9f4);
    animation: animate1 1s linear infinite;
  }
  @keyframes animate1 {
    0% {
      left: -100%;
    }
    50%,
    100% {
      left: 100%;
    }
  }
  a span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #03e9f4);
    animation: animate2 1s linear infinite;
    animation-delay: 0.25s;
  }
  @keyframes animate2 {
    0% {
      top: -100%;
    }
    50%,
    100% {
      top: 100%;
    }
  }
  a span:nth-child(3) {
    bottom: 0;
    right: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #03e9f4);
    animation: animate3 1s linear infinite;
    animation-delay: 0.5s;
  }
  @keyframes animate3 {
    0% {
      right: -100%;
    }
    50%,
    100% {
      right: 100%;
    }
  }

  a span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #03e9f4);
    animation: animate4 1s linear infinite;
    animation-delay: 0.75s;
  }
  @keyframes animate4 {
    0% {
      bottom: -100%;
    }
    50%,
    100% {
      bottom: 100%;
    }
  }
`;

export const NavBarStyle = styled.nav`
  position: fixed;
  height: 50px;
  width: 100%;
  left: 0;
  bottom: 0;
  background-color: #202124;
  ul {
    margin: 0;
    padding: 0;
    border-top: 1px solid #03e9f4;
    display: flex;
    justify-content: space-between;
    list-style: none;
  }

  img {
    width: 30px;
    height: 30px;
    padding: 10px;
    color: #03e9f4;
  }
`;

export const Form = styled.form`
  color: #03e9f4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: auto;
  input {
    color: #03e9f4;
    background-color: #202124 !important;
    outline: none;
    text-transform: uppercase;
    margin-top: 60px;
    border: #03e9f4 3px solid;
    border-radius: 10px;
    height: 30px;
    width: 300px;
    padding: 6px;
    transition: all 0.15s ease-in-out;
    &:focus {
      box-shadow: 0 0 10px 0 #03e9f4, 0 0 20px 2px #03e9f4;
      background-color: #202124;
    }
    &:active {
      box-shadow: 0 0 10px 0 #03e9f4, 0 0 20px 2px #03e9f4;
      background-color: #202124;
    }
  }

  p {
    font-size: xx-small;
    text-align: center;
  }
  span {
    cursor: pointer;
  }
  button {
    background-color: #202124;
    border: #03e9f4 3px solid;
    border-radius: 10px;
    color: #03e9f4;
    padding: 10px;
    margin-top: 30px;
  }
  button:focus {
    box-shadow: 0 0 10px 0 #03e9f4 inset, 0 0 20px 2px #03e9f4;
  }
`;

export const ChooseRol = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  padding: 0;
  width: 80%;
  font-size: x-small;
  input {
    margin: 0;
    width: 10px;
    height: 10px;
  }
`;

export const PerfilStyle = styled.div`
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #03e9f4;
  border-radius: 10px;
  padding: 10px;
  font-size: small;
  color: #03e9f4;
  height: 80vh;
`;

export const ProfileImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    background-color: #202124;
    border: #03e9f4 3px solid;
    border-radius: 10px;
    color: #03e9f4;
    padding: 10px;
    margin-top: 30px;
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid #03e9f4;
    object-fit: cover;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  text-align: center;
  gap: 20px;
`;

export const UserInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: small;
  color: #03e9f4;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #03e9f4;
    object-fit: cover;
  }
`;

export const ChallengeBox = styled.div`
  color: #03e9f4;
  font-size: small;
  video {
    width: 90%;
    height: 400px;
  }
`;

export const ButtonChallenge = styled(Link)`
  display: flex;
  align-items: right;
  justify-content: right;
  padding: 10px;
  cursor: pointer;
  bottom: 50px;
  right: 0px;
  position: fixed;

  img {
    width: 30px;
    height: 30px;
  }
`;

export const PopUpCreateChallenge = styled.div`
  display: ${({ create }) => (create ? "flex" : "none")};
  align-items: center;
  height: 100vh;
  color: #03e9f4;
  font-size: small;
  form {
    border: 2px solid #03e9f4;
    border-radius: 10px;
    padding: 10px;
    button {
      background-color: #202124;
      border: #03e9f4 3px solid;
      border-radius: 10px;
      color: #03e9f4;
      padding: 10px;
      &:focus {
        box-shadow: 0 0 10px 0 #03e9f4 inset, 0 0 20px 2px #03e9f4;
      }
    }
    div {
      display: flex;
      justify-content: center;
    }
  }
  input {
    margin: 10px 0;
    color: #03e9f4;
    background-color: #202124 !important;
    outline: none;
    text-transform: uppercase;
    border: #03e9f4 3px solid;
    border-radius: 10px;
    height: 10px;
    width: 90%;
    padding: 6px;
    transition: all 0.15s ease-in-out;
    &:focus {
      box-shadow: 0 0 10px 0 #03e9f4, 0 0 20px 2px #03e9f4;
      background-color: #202124;
    }
    &:active {
      box-shadow: 0 0 10px 0 #03e9f4, 0 0 20px 2px #03e9f4;
      background-color: #202124;
    }
  }
`;

export const ChallengesList = styled.div`
  display: ${({ create }) => (create ? "none" : "block")};
`;

export const Cargando = styled.div`
  margin: auto;
  img {
    width: 20px;
    height: 20px;
  }
`;

export const LogoutBtn = styled.button`
  position: fixed;
  top: 25px;
  right: 25px;
  background-color: #202124;
  border: none;
  img {
    width: 20px;
    height: 20px;
  }
`;
