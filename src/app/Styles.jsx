import styled, { createGlobalStyle } from "styled-components";
import Minecraft from "./fonts/Minecraft.ttf";
import Roboto from "./fonts/Roboto-Medium.ttf";
import { Link } from "react-router-dom";

export const GlobalStyle = createGlobalStyle`
	@font-face {
		font-family: Minecraft;
		src: url(${Minecraft});
	}
  @font-face {
		font-family: Roboto;
		src: url(${Roboto});
	}
  :root{
    --blue: #03e9f4;
    --red: #f40e03;
    --black: #202124;
  }
	body {
    text-transform: uppercase;
		background-color: #202124;
		letter-spacing: 4px;
    color: white;
		margin: 0;
		padding: 20px;
	}
`;

export const NavBarStyle = styled.nav`
  border-top: 1px solid #03e9f4;
  box-sizing: border-box;
  position: fixed;
  height: 50px;
  width: 100%;
  left: 0;
  bottom: 0;
  background-color: #202124;
  ul {
    margin: 0 30px;
    padding: 0;
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
  font-family: Roboto;
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
  color: ${(props) => props.theme.primaryColor};
  height: 88vh;
`;

export const ProfileImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    background-color: #202124;
    border: #03e9f4 3px solid;
    border-radius: 10px;
    color: ${(props) => props.theme.primaryColor};
    padding: 10px;
    margin-top: 30px;
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid ${(props) => props.theme.primaryColor};
    object-fit: cover;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  text-align: center;
  gap: 20px;
`;

export const UserInfo = styled.div`
  position: relative;
  display: flex;
  gap: 10px;
  align-items: center;
  color: #03e9f4;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid ${(props) => props.theme.primaryColor};
    object-fit: cover;
  }
  p {
    color: ${(props) => props.theme.primaryColor};
  }
`;

export const ChallengeInfo = styled.div`
  font-family: Roboto;
  margin-left: 10px;
  button {
    margin-left: 25%;
    margin-right: 25%;
  }
`;

export const ChallengeBox = styled.div`
  color: white;
  font-size: small;
  border: 2px solid #03e9f4;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 15px;
  video {
    width: 100%;
    border-radius: 10px;
  }
`;

export const ChallengeVideo = styled.div`
  color: #03e9f4;
  font-size: small;
  border: 2px solid #03e9f4;
  padding: 10px;
  border-radius: 10px;
  video {
    width: 100%;
    border-radius: 10px;
  }
`;

export const ButtonChallenge = styled(Link)`
  display: flex;
  justify-content: right;
  padding: 15px 25px;
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
  display: ${({ $create }) => ($create ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  height: 95vh;
  color: #03e9f4;
  font-size: small;
  form {
    width: 300px;
    height: 300px;
    flex-direction: column;
    justify-content: space-between;
    border: 2px solid #03e9f4;
    border-radius: 10px;
    padding: 10px;
    label {
      padding: 15px 10px;
    }
    button {
      font-family: Roboto;
      text-transform: uppercase;
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
      justify-content: space-around;
      align-items: center;
    }
  }
  textarea {
    color: #03e9f4;
    background-color: #202124 !important;
    outline: none;
    text-transform: uppercase;
    border: #03e9f4 3px solid;
    border-radius: 10px;
    height: 100px;
    width: 100%;
    box-sizing: border-box;
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
  input {
    margin: 10px 0;
    color: #03e9f4;
    background-color: #202124 !important;
    outline: none;
    text-transform: uppercase;
    border: #03e9f4 3px solid;
    border-radius: 10px;
    height: 10px;
    width: 20%;
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
  display: ${({ $create }) => ($create ? "none" : "block")};
`;

export const UploadingDiv = styled.div`
  display: block;
  margin: auto;
  img {
    width: 20px;
    height: 20px;
  }
`;

export const LogoutBtn = styled.button`
  position: fixed;
  top: 30px;
  right: 30px;
  background-color: #202124;
  border: none;
  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

export const RankingDiv = styled.div`
  ul {
    padding: 0px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  h1 {
    text-align: center;
  }
`;

export const Li = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .username {
    width: 140px;
  }
  .points {
    width: 50px;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #03e9f4;
    object-fit: cover;
  }
  p {
    padding: 5px;
  }
`;

export const ButtonStyle = styled.button`
  border: 1px solid #f40e03;
  border-radius: 5px;
  background-color: transparent;
  color: #03e9f4;
  text-transform: uppercase;
  font-family: Roboto;
  padding: 7px;
`;

export const InputStyle = styled.input`
  border: 1px solid #03e9f4;
  border-radius: 5px;
  background-color: transparent;
  color: white;
  padding: 7px;
`;

export const UploadVideo = styled.div`
  font-family: Roboto;
  form {
    margin-top: 25px;
  }
  input {
    color: #202124;
  }
  input::file-selector-button {
    display: block;
    border: 1px solid #f40e03;
    background-color: #202124;
    color: #03e9f4;
    border-radius: 10px;
    padding: 10px;
    margin-left: 25%;
    margin-right: 25%;
  }
  button {
    display: block;
    border: 1px solid #f40e03;
    background-color: #202124;
    color: #03e9f4;
    border-radius: 10px;
    padding: 10px;
    margin: auto;
  }
`;

export const CrownStyle = styled.img`
  margin: auto;
  display: block;
  width: 180px;
  height: 50px;
`;

export const FirstPlace = styled.div`
  background-color: #f2d553;
  list-style: none;
  border-radius: 10px;
  border: 1px solid transparent;
`;

export const SecondPlace = styled.div`
  background-color: silver;
  list-style: none;
  border-radius: 10px;
  border: 1px solid transparent;
`;

export const ThirdPlace = styled.div`
  background-color: #d9b191;
  list-style: none;
  border-radius: 10px;
  border: 1px solid transparent;
`;

export const AnotherPlace = styled.div`
  border: 1px solid #03e9f4;
  border-radius: 10px;
`;

export const ButtonDelete = styled.button`
  background-color: red;
  border-radius: 50%;
  color: white;
  border: none;
  position: absolute;
  right: 0;
  width: 30px;
  height: 30px;
  font-size: 16px;
`;
