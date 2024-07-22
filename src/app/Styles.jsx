import styled, { createGlobalStyle, keyframes } from "styled-components";
import Minecraft from "./fonts/Minecraft.ttf";
import Roboto from "./fonts/Roboto-Medium.ttf";
import { Link } from "react-router-dom";

const fadeInUp = keyframes`
0% {
  opacity: 0; 
  transform: translateY(20px);
}

100%{
  opacity: 1; 
  transform: translateY(0);
}
`
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
    --green: #18f807;
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
  z-index: 2;
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
    color: ${(props) => props.theme.primaryColor};
  }
`;

export const Form = styled.form`
  animation: neon 2s ease infinite;
  font-family: Roboto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  input {
    animation: neon 2s ease infinite;
    background-color: var(--black);
    outline: none;
    text-transform: uppercase;
    margin-top: 60px;
    border: ${(props) => props.theme.primaryColor} 3px solid;
    border-radius: 25px;
    height: 30px;
    width: 300px;
    padding: 10px;
    box-shadow: 0 0 5px 0, 0 0 10px 2px;
  }

  p {
    margin-top: 40px;
    text-align: center;
  }
  span {
    cursor: pointer;
  }
  button {
    animation: neon 2s ease infinite;
    color: var(--blue);
    background-color: var(--black);
    border: ${(props) => props.theme.primaryColor} 3px solid;
    border-radius: 25px;
    padding: 10px;
    margin-top: 10px;
  }
  @keyframes neon {
    0% {
      color: var(--blue);
      border-color: var(--blue);
    }
    50% {
      color: var(--green);
      border-color: var(--green);
    }
    100% {
      color: var(--blue);
      border-color: var(--blue);
    }
  }
`;

export const PlayerProfile = styled.div``;
export const WatcherProfile = styled.div``;

export const PerfilStyle = styled.div`
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid ${(props) => props.theme.primaryColor};
  border-radius: 10px;
  padding: 10px;
  color: ${(props) => props.theme.primaryColor};
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  min-height: 660px;
  box-shadow: 0 0 5px 0 ${(props) => props.theme.shadowColor},
    0 0 10px 2px ${(props) => props.theme.shadowColor};
`;

export const ProfileImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 2px solid ${(props) => props.theme.primaryColor};
  width: 85vw;
  padding-bottom: 30px;
  padding-top: 15px;

  button {
    background-color: var(--black);
    border: ${(props) => props.theme.primaryColor} 3px solid;
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
  p {
    padding: 5px;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  text-align: center;
  gap: 5px;

  p {
    padding: 20px;
  }
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

  a {
    text-decoration: none;
    p {
      color: ${(props) => props.theme.primaryColor};
    }
  }
`;

export const ChallengeInfo = styled.div`
  font-family: Roboto;
  margin-left: 3px;
  button {
    display: block;
    margin: auto;
  }
  p:first-child {
    cursor: pointer;
  }

  .player {
    a {
      text-decoration: none;
    }

    span {
      margin-left: 4px;
      color: ${(props) => props.theme.primaryColor};
    }
  }
`;

export const ChallengeBox = styled.div`
  color: white;
  font-size: small;
  border: 2px solid ${(props) => props.theme.primaryColor};
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 0 5px 0 ${(props) => props.theme.shadowColor},
    0 0 10px 2px ${(props) => props.theme.shadowColor};
    opacity: 0;
    animation: ${fadeInUp} 0.5s ease-out forwards; 

  video {
    width: 100%;
    border-radius: 10px;
  }
`;

export const Interaction = styled.div`
  display: flex;
  align-items: center;
  border-top: 2px solid ${(props) => props.theme.primaryColor};
  margin-top: 10px;
  padding: 10px;
  gap: 10px;
  div:first-child {
    display: flex;
    align-items: center;
    gap: 10px;
  }
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

export const ShareList = styled.div`
  display: ${({ $share }) => ($share ? "block" : "none")};
  width: 100%;
  height: 100%;
  background-color: rgba(32, 33, 36, 0.9);
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  ul {
    background-color: var(--black);
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-content: flex-start;
    position: absolute;
    top: 40vh;
    left: 20px;
    right: 20px;
    border: 2px solid ${(props) => props.theme.primaryColor};
    border-radius: 10px;
    padding: 10px;
    color: white;
    button {
      display: flex;
      gap: 10px;
      border-bottom: 2px solid ${(props) => props.theme.primaryColor};
      align-items: center;
      p {
        font-family: Roboto;
      }
    }
  }
`;

export const ChallengeVideo = styled.div`
  font-size: small;
  border: 2px solid ${(props) => props.theme.primaryColor};
  box-shadow: 0 0 5px 0 ${(props) => props.theme.primaryColor},
    0 0 10px 2px ${(props) => props.theme.primaryColor};
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 40px;
  opacity: 0;
    animation: ${fadeInUp} 0.5s ease-out forwards; 
    transform: translateY(20px);

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
  color: ${(props) => props.theme.primaryColor};
  font-size: small;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  form {
    display: flex;
    margin: 0 20px;
    width: 100%;
    height: 300px;
    background-color: var(--black);
    flex-direction: column;
    justify-content: space-between;
    border: 2px solid ${(props) => props.theme.primaryColor};
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 0 5px 0 ${(props) => props.theme.shadowColor},
      0 0 10px 2px ${(props) => props.theme.shadowColor};
    label {
      padding: 5px;
      padding-left: 8px;
    }
    button {
      font-family: Roboto;
      text-transform: uppercase;
      background-color: var(--black);
      border: ${(props) => props.theme.primaryColor} 3px solid;
      border-radius: 10px;
      color: ${(props) => props.theme.primaryColor};
      padding: 10px;
      &:focus {
        box-shadow: 0 0 5px 0 ${(props) => props.theme.primaryColor} inset,
          0 0 10px 2px ${(props) => props.theme.primaryColor};
      }
    }
    div {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
  textarea {
    color: ${(props) => props.theme.primaryColor};
    background-color: var(--black) !important;
    outline: none;
    text-transform: uppercase;
    border: ${(props) => props.theme.primaryColor} 3px solid;
    border-radius: 10px;
    height: 100px;
    width: 100%;
    box-sizing: border-box;
    padding: 6px;
    transition: all 0.15s ease-in-out;
    &:focus {
      box-shadow: 0 0 5px 0 ${(props) => props.theme.primaryColor},
        0 0 10px 2px ${(props) => props.theme.primaryColor};
      background-color: var(--black);
    }
    &:active {
      box-shadow: 0 0 5px 0 ${(props) => props.theme.primaryColor},
        0 0 10px 2px ${(props) => props.theme.primaryColor};
      background-color: var(--black);
    }
  }
  input {
    margin: 10px 0;
    color: ${(props) => props.theme.primaryColor};
    background-color: var(--black) !important;
    outline: none;
    text-transform: uppercase;
    border: ${(props) => props.theme.primaryColor} 3px solid;
    border-radius: 10px;
    height: 10px;
    width: 20%;
    padding: 6px;
    transition: all 0.15s ease-in-out;
    &:focus {
      box-shadow: 0 0 5px 0 ${(props) => props.theme.primaryColor},
        0 0 10px 2px ${(props) => props.theme.primaryColor};
      background-color: var(--black);
    }
    &:active {
      box-shadow: 0 0 5px 0 ${(props) => props.theme.primaryColor},
        0 0 10px 2px ${(props) => props.theme.primaryColor};
      background-color: var(--black);
    }
  }
  .closeButton {
    position: fixed;
    top: 30vh;
    right: 32px;
    background-color: var(--black);
    color: ${(props) => props.theme.primaryColor};
    border-radius: 10px;
    border: none;
    font-size: large;
  }
`;

export const PopUpComments = styled.div`
  display: ${({ $showComments }) => ($showComments ? "flex" : "none")};
  flex-direction: column;
  color: ${(props) => props.theme.primaryColor};
  background-color: rgba(32, 33, 36, 1);
  position: sticky;
  align-items: center;
  justify-content: center;
  font-size: small;
  top: 20px;
  right: 20px;
  left: 20px;
  z-index: 1;

  input {
    background-color: transparent;
    width: 90%;
    border: none;
    border-bottom: 2px solid ${(props) => props.theme.primaryColor};
    outline: none;
    padding-bottom: 10px;
    color: ${(props) => props.theme.primaryColor};
  }

  .close {
    color: ${(props) => props.theme.primaryColor};
    background-color: transparent;
    border: none;
    position: absolute;
    right: 0;
    top: 10px;

    img {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
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
    padding: 5px;
    display: block;
    margin: auto;
  }

  h3 {
    text-align: center;
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
    border: 2px solid ${(props) => props.theme.primaryColor};
    object-fit: cover;
  }
  p {
    padding: 5px;
  }
`;

export const ButtonStyle = styled.button`
  border: 1px solid ${(props) => props.theme.primaryColor};
  border-radius: 5px;
  background-color: transparent;
  color: ${(props) => props.theme.primaryColor};
  text-transform: uppercase;
  font-family: Roboto;
  padding: 10px;

  button {
    display: block;
    margin: auto;
  }
`;

export const InputStyle = styled.input`
  border: 1px solid ${(props) => props.theme.primaryColor};
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
    display: block;
    margin: auto;
  }
  input::file-selector-button {
    border: 1px solid ${(props) => props.theme.primaryColor};
    background-color: var(--black);
    color: white;
    border-radius: 5px;
    padding: 10px;
    display: block;
    margin: auto;
  }
  button {
    display: block;
    border: 1px solid ${(props) => props.theme.primaryColor};
    background-color: var(--black);
    color: white;
    border-radius: 5px;
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
  border: 1px solid ${(props) => props.theme.primaryColor};
  border-radius: 10px;
`;

export const ButtonDelete = styled.button`
  background-color: ${(props) => props.theme.primaryColor};
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
    top: 10px;
    left: 15px;
  }
`;

export const VideosContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
  width: 100%;
  margin-bottom: 30px;
`;

export const VideoItem = styled.div`
  position: relative;
  padding-bottom: 100%;
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;

  video {
    position: absolute;
    top: 0;
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
`;
export const PopUpContainer = styled.div`
  width: 100%;
  max-width: 95%;
  height: 95%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(32, 33, 36, 0.9);
  padding: 10px;
  overflow-y: auto;
  border-radius: 10px; 
  display: flex; 
  align-items: center; 
  justify-content: center;
  opacity: 0;
    animation: ${fadeInUp} 0.5s ease-out forwards; 
    top: 0; 
    left: 0; 

`;

export const VideosBox = styled.div`
width: 100%; 
  height: 90%;
  border: 1px solid ${(props) => props.theme.primaryColor};
  position: relative; 
  padding: 20px; 
  max-width: 90%;
  max-height: 90vh;
  align-items: center;
  justify-content: center;
  display: flex; 
  box-sizing: border-box;

`;

export const BtnPopUp = styled.button`
  position: absolute;
  top: -3px; 
  left: -3px; 
  background: none; 
  border: none; 
  cursor: pointer; 
  z-index: 2;
  padding: 10px; 
  
  img {
    width: 20px;
    height: 20px;
  }
`;

export const VideoEdit = styled.div`
position: relative; 
width: 100%; 
height: 100%; 
display: flex; 
align-items: center; 
justify-content: center;
overflow: hidden;

video {
  width: 100%; 
  height: auto; 
  max-width: 100%;
  max-height: 100%; 
  border-radius: 10px;
  padding: 10px; 
}
`;

export const Comments = styled.div`
  border: 2px solid ${(props) => props.theme.primaryColor};
  width: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 10px;
  .user {
    display: flex;
    align-items: center;
    border: none;
    gap: 10px;
    img {
      border-radius: 50%;
      width: 30px;
      height: 30px;
      object-fit: cover;
    }
  }
  .text {
    color: white;
  }
`;

export const NuevoComment = styled.div`
  border: 2px solid ${(props) => props.theme.primaryColor};
  width: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  color: white;
  text-align: center;
  input {
    color: white;
  }
  img {
    position: absolute;
    right: 25px;
    top: 40px;
    width: 30px;
  }
`;

export const FirstComment = styled.div`
  border: 2px solid ${(props) => props.theme.primaryColor};
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  color: white;
  text-align: center;
  input {
    color: white;
  }

  img {
    position: absolute;
    right: 25px;
    bottom: 30px;
    width: 30px;
  }
`;

export const SwitchButtonContainer = styled.div`
  display: block;
  position: absolute;
  width: 500px;
  height: 350px;
  margin: auto;
  top: 20vh;

  input[type="checkbox"] {
    position: absolute;
    visibility: hidden;
    box-shadow: 0 0 5px 0, 0 0 10px 2px;
  }

  input#toggle[type="checkbox"] {
    display: none;
  }

  label {
    position: absolute;
    height: 40px;
    width: 120px;
    display: block;
    top: 0px;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 9999;
    cursor: pointer;
    margin: 0 auto;
  }

  .switch {
    display: block;
    position: relative;
    border: 2px solid var(--green);
    border-radius: 25px;
    height: 40px;
    width: 100px;
    margin: auto;
  }

  .switch .button {
    display: block;
    position: absolute;
    border-radius: 100%;
    background: var(--green);
    height: 30px;
    width: 30px;
    top: 5px;
    left: 5px;
  }

  .day-night-cont {
    display: block;
    position: absolute;
    width: 180px;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 40px;
    top: 0px;
  }

  .day-night-cont .the-sun {
    display: block;
    position: absolute;
    left: 0px;
    top: 5px;
  }

  .day-night-cont .the-moon {
    display: block;
    position: absolute;
    right: 35px;
    top: 5px;
    img {
      width: 32px;
      height: 32px;
    }
  }

  .day-night-cont .the-moon .moon-inside {
    display: block;
    position: absolute;
    left: 8px;
    height: 20px;
    width: 20px;
    border-radius: 100%;
  }

  .switch .button {
    transition: left 0.25s ease-in-out;
    -webkit-transition: left 0.25s ease-in-out;
  }

  input[type="checkbox"]:checked ~ .switch {
    border: 2px solid var(--blue);
  }
  input[type="checkbox"]:checked ~ .switch .button {
    position: absolute;
    left: 64px;
    background: var(--blue);
  }
`;

export const ErrorPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
  color: var(--black);
  text-align: center;

  h1 {
    font-size: 5rem;
    margin: 0;
  }

  p {
    font-size: 1.5rem;
  }

  a {
    font-size: 1.2rem;
    color: ${(props) => props.theme.primaryColor};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;
