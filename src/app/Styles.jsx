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
  border-top: 1px solid ${(props) => props.theme.primaryColor};
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

export const PlayerProfile = styled.div``;
export const WatcherProfile = styled.div``;

export const PerfilStyle = styled.div`
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid;
  border-radius: 10px ${(props) => props.theme.primaryColor};
  padding: 10px;
  color: ${(props) => props.theme.primaryColor};
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
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
  color: ${(props) => props.theme.primaryColor};
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
  border: 2px solid /*var(--blue);*/ ${(props) => props.theme.primaryColor};
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
  border-top: 2px solid ${(props) => props.theme.primaryColor};
  margin-top: 10px;
  padding: 10px;
  button {
    background-color: var(--black);
    border: none;
    padding: 0;
    margin-right: 10px;
  }
  img {
    background-color: var(--black);
    width: 20px;
    height: 20px;
  }
`;

export const ChallengeVideo = styled.div`
  color: /*var(--blue)*/ ${(props) => props.theme.primaryColor};
  font-size: small;
  border: 2px solid /*var(--blue);*/ ${(props) => props.theme.primaryColor};
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;

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

export const PopUpComments = styled.div`
  display: ${({ $showComments }) => ($showComments ? "flex" : "none")};
  flex-direction: column;
  color: ${(props) => props.theme.primaryColor};
  background-color: rgba(32, 33, 36, 0.9);
  position: fixed;
  align-items: center;
  justify-content: center;
  font-size: small;
  top: 0;
  bottom: 0;
  right: 20px;
  left: 20px;
  img {
    width: 20px;
    height: 20px;
    align-self: flex-end;
    position: absolute;
    top: 445px;
    right: 25px;
    cursor: pointer;
  }
  input {
    background-color: transparent;
    width: 90%;
    border: none;
    border-bottom: 2px solid ${(props) => props.theme.primaryColor};
    outline: none;
    padding-bottom: 10px;
    color: ${(props) => props.theme.primaryColor};
  }
  div {
    border: 2px solid ${(props) => props.theme.primaryColor};
    width: 100%;
    border-radius: 10px;
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
  /* position: fixed; */

  background-color: var(--black);
  border: none;
  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 15px;
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
    border: 2px solid /*var(--blue)*/ ${(props) => props.theme.primaryColor};
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
  color: var(--red);
  text-transform: uppercase;
  font-family: Roboto;
  padding: 10px;
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
    color: white;
    border-radius: 5px;
    padding: 10px;
    margin-left: 33%;
  }
  button {
    display: block;
    border: 1px solid var(--red);
    background-color: var(--black);
    color: white;
    border-radius: 5px;
    padding: 10px;
    margin-left: 31%;
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
  border: 1px solid var(--red);
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
  /* position: fixed; */
  border: none;
  background: none;
  img {
    position: absolute;
    width: 20px;
    height: 20px;
<<<<<<< HEAD
    margin-right: 280px;
    margin-top: -207px;
=======
    top: 10px;
    left: 15px; 
>>>>>>> 346404e25ed68ae1c38b64da4006ff18349e6249
  }
`;

export const SwitchContainer = styled.label`
  display: flex;
  align-items: center;
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

export const VideosContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 20px;
  width: 100%;
  border: 2xp solid var(--red);
  margin-bottom: 30px;
`;

export const VideoItem = styled.div`
  position: relative;
  padding-bottom: 100%;
  overflow: hidden;
  border-radius: 8px;
  width: 100%;

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
  }
`;
export const PopUpContainer = styled.div`
  width: 100%;
  max-width: 90%;
  height: 95%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(32, 33, 36, 0.9);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(32, 33, 36, 0.9);
  padding: 20px;
  overflow-y: auto;
  padding: 10px;

  video {
    width: 300px;
    border-radius: 10px;
    margin: auto;
    position: relative;
    top: 150px;
    left: 18px;
  }
`;

export const VideosBox = styled.div`
<<<<<<< HEAD
  height: 600px;
  border: 1px solid var(--red);
=======
height: 100%; 
border: 1px solid var(--red); 
>>>>>>> 346404e25ed68ae1c38b64da4006ff18349e6249

  button {
    position: relative;
    bottom: 300px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1;
  }
`;

export const BtnPopUp = styled.button`
  position: fixed;

  img {
    width: 20px;
    height: 20px;
    padding: 10px;
  }
`;

export const VideoEdit = styled.div``;
