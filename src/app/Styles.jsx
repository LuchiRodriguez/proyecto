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
		background-color: var(--black);
		letter-spacing: 4px;
    color: white;
		margin: 0;
		padding: 20px;
	}
`;

export const NavBarStyle = styled.nav`
  border-top: 1px solid var(--blue);
  box-sizing: border-box;
  position: fixed;
  height: 50px;
  width: 100%;
  left: 0;
  bottom: 0;
  background-color: var(--black);
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
    color: var(--blue);
  }
`;

export const Form = styled.form`
  font-family: Roboto;
  color: var(--blue);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: auto;
  input {
    color: var(--blue);
    background-color: var(--black) !important;
    outline: none;
    text-transform: uppercase;
    margin-top: 60px;
    border: var(--blue) 3px solid;
    border-radius: 10px;
    height: 30px;
    width: 300px;
    padding: 6px;
    transition: all 0.15s ease-in-out;
    &:focus {
      box-shadow: 0 0 10px 0 var(--blue), 0 0 20px 2px var(--blue);
      background-color: var(--black);
    }
    &:active {
      box-shadow: 0 0 10px 0 var(--blue), 0 0 20px 2px var(--blue);
      background-color: var(--black);
    }
  }

  p {
    text-align: center;
  }
  span {
    cursor: pointer;
  }
  button {
    background-color: var(--black);
    border: var(--blue) 3px solid;
    border-radius: 10px;
    color: var(--blue);
    padding: 10px;
    margin-top: 30px;
  }
  button:focus {
    box-shadow: 0 0 10px 0 var(--blue) inset, 0 0 20px 2px var(--blue);
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
  border: 2px solid var(--blue);
  border-radius: 10px;
  padding: 10px;
  color: ${(props) => props.theme.primaryColor};
  height: 88vh;
  background-size: cover;
  background-position: center;
`;

export const ProfileImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    background-color: var(--black);
    border: var(--blue) 3px solid;
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
  color: var(--blue);
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
  border: 2px solid var(--blue);
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 15px;
  video {
    width: 100%;
    border-radius: 10px;
  }
`;

export const Interaction = styled.div`
  display: flex;
  border-top: 2px solid var(--blue);
  margin-top: 10px;
  padding: 10px;
  button {
    background-color: var(--black);
    border: none;
    padding: 0;
  }
  img {
    background-color: var(--black);
    width: 20px;
    height: 20px;
  }
`;

export const ChallengeVideo = styled.div`
  color: var(--blue);
  font-size: small;
  border: 2px solid var(--blue);
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
  background-color: rgba(32, 33, 36, 0.9);
  position: absolute;
  align-items: center;
  justify-content: center;
  height: 95vh;
  color: var(--blue);
  font-size: small;
  top: 0;
  bottom: 0;
  right: 20px;
  left: 20px;
  form {
    display: flex;
    width: 100%;
    height: 300px;
    background-color: var(--black);
    flex-direction: column;
    justify-content: space-between;
    border: 2px solid var(--blue);
    border-radius: 10px;
    padding: 10px;
    label {
      padding: 15px 10px;
    }
    button {
      font-family: Roboto;
      text-transform: uppercase;
      background-color: var(--black);
      border: var(--blue) 3px solid;
      border-radius: 10px;
      color: var(--blue);
      padding: 10px;
      &:focus {
        box-shadow: 0 0 10px 0 var(--blue) inset, 0 0 20px 2px var(--blue);
      }
    }
    div {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
  textarea {
    color: var(--blue);
    background-color: var(--black) !important;
    outline: none;
    text-transform: uppercase;
    border: var(--blue) 3px solid;
    border-radius: 10px;
    height: 100px;
    width: 100%;
    box-sizing: border-box;
    padding: 6px;
    transition: all 0.15s ease-in-out;
    &:focus {
      box-shadow: 0 0 10px 0 var(--blue), 0 0 20px 2px var(--blue);
      background-color: var(--black);
    }
    &:active {
      box-shadow: 0 0 10px 0 var(--blue), 0 0 20px 2px var(--blue);
      background-color: var(--black);
    }
  }
  input {
    margin: 10px 0;
    color: var(--blue);
    background-color: var(--black) !important;
    outline: none;
    text-transform: uppercase;
    border: var(--blue) 3px solid;
    border-radius: 10px;
    height: 10px;
    width: 20%;
    padding: 6px;
    transition: all 0.15s ease-in-out;
    &:focus {
      box-shadow: 0 0 10px 0 var(--blue), 0 0 20px 2px var(--blue);
      background-color: var(--black);
    }
    &:active {
      box-shadow: 0 0 10px 0 var(--blue), 0 0 20px 2px var(--blue);
      background-color: var(--black);
    }
  }
  .closeButton {
    position: absolute;
    top: 250px;
    right: 15px;
    background-color: var(--black);
    color: var(--blue);
    border-radius: 10px;
    border: none;
    font-size: medium;
  }
`;

export const ChallengesList = styled.div`
  display: block;
`;

export const UploadingDiv = styled.div`
  display: block;
  margin: auto;
  img {
    width: 60px;
    height: 60px;
  }
`;

export const LogoutBtn = styled.button`
  position: fixed;
  top: 30px;
  right: 30px;
  background-color: var(--black);
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
    border: 2px solid var(--blue);
    object-fit: cover;
  }
  p {
    padding: 5px;
  }
`;

export const ButtonStyle = styled.button`
  border: 1px solid var(--red);
  border-radius: 5px;
  background-color: transparent;
  color: var(--blue);
  text-transform: uppercase;
  font-family: Roboto;
  padding: 7px;
`;

export const InputStyle = styled.input`
  border: 1px solid var(--blue);
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
    color: var(--black);
  }
  input::file-selector-button {
    display: block;
    border: 1px solid var(--red);
    background-color: var(--black);
    color: var(--blue);
    border-radius: 10px;
    padding: 10px;
    margin-left: 25%;
    margin-right: 25%;
  }
  button {
    display: block;
    border: 1px solid var(--red);
    background-color: var(--black);
    color: var(--blue);
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
  border: 1px solid var(--blue);
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

export const ChangeProfileButton = styled.button`
position: fixed;
border: none;
top: 30px;
left: 30px;
background: none;
  img {
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: relative;
  margin-top: 20px;
  width: 100px;
  height: 40px;
  background-color: var(--black);
  border-radius: 17px;
  input {
    width: 100px;
  }
`;

export const SwitchSlider = styled.div`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.4s;
  border-radius: 17px;
  background-color: ${({ $ischecked, theme }) =>
    $ischecked ? theme.toggleActive : theme.toggleInactive};
`;

export const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
  z-index: -1;

  &:checked + ${SwitchSlider} {
    transform: translateX(calc(100% - 100px));
  }
`;

export const SwitchText = styled.span`
  font-weight: bolder;
  position: absolute;
  font-size: 12px;
  line-height: 1;
  color: var(--black);
  transition: 0.3s;
  transform: ${({ $ischecked }) =>
    $ischecked ? "translateX(18px)" : "translateX(10px)"};
`;
