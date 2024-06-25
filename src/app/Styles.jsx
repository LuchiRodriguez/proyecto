import styled, { createGlobalStyle } from 'styled-components';
import Brose from '../app/fonts/Brose.ttf'

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
		padding: 0;
	}
`;

export const LandingPage = styled.div`
	text-align: center;
	margin-top: 200px;
	h1{
		color: #03e9f4;
		text-transform: uppercase;
		font-size: x-large;
		margin-bottom: 30px;
	}
	div{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	a{
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
	a:hover{
		background: #03e9f4;
		color: #050801;
		box-shadow: 0 0 5px #03e9f4,
                0 0 25px #03e9f4,
                0 0 50px #03e9f4,
                0 0 50px #03e9f4;
    	-webkit-box-reflect:below 1px linear-gradient(transparent, #0005);
	}
	a:nth-child(1){
		filter: hue-rotate(270deg);
	}
	a:nth-child(2){
		filter: hue-rotate(110deg);
	}
	a span{
		position: absolute;
		display: block;
	}
	a span:nth-child(1){
		top: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg,transparent,#03e9f4);
		animation: animate1 1s linear infinite;
	}
	@keyframes animate1{
		0%{
			left: -100%;
		}
		50%,100%{
			left: 100%;
		}
	}
	a span:nth-child(2){
		top: -100%;
		right: 0;
		width: 2px;
		height: 100%;
		background: linear-gradient(180deg,transparent,#03e9f4);
		animation: animate2 1s linear infinite;
		animation-delay: 0.25s;
	}
	@keyframes animate2{
		0%{
			top: -100%;
		}
		50%,100%{
			top: 100%;
		}
	}
	a span:nth-child(3){
		bottom: 0;
		right: 0;
		width: 100%;
		height: 2px;
		background: linear-gradient(270deg,transparent,#03e9f4);
		animation: animate3 1s linear infinite;
		animation-delay: 0.50s;
	}
	@keyframes animate3{
		0%{
			right: -100%;
		}
		50%,100%{
			right: 100%;
		}
	}


	a span:nth-child(4){
		bottom: -100%;
		left: 0;
		width: 2px;
		height: 100%;
		background: linear-gradient(360deg,transparent,#03e9f4);
		animation: animate4 1s linear infinite;
		animation-delay: 0.75s;
	}
	@keyframes animate4{
		0%{
			bottom: -100%;
		}
		50%,100%{
			bottom: 100%;
		}
	}
`


export const NavBarStyle = styled.nav`
.navbar {
    background: #BCBAB6;
    height: 50px; 
	position: absolute; 
	bottom: 0; 
	width: 100%; 
display: flex; 
align-items	: center;
justify-content: center;
}

.navbarlist {
	list-style: none;
	display: flex; 
	justify-content: space-between;
	padding: 5px;
	width: 100%; 
}
`