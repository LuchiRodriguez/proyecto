import "../app/Landing.css";
import { Link } from "react-router-dom";
import logo from "../app/img/watcherNavBar/logoAim.png";

const NewLanding = () => {
  const numberOfEls = 50;

  /*
   * Dash Array function
   */
  function createDashArray() {
    const dashPattern = document.querySelectorAll(".dash-pattern");

    function createDashes(i, element) {
      let dash = document.createElement("div");
      const positionY = (100 / numberOfEls) * i;
      dash.classList.add("dash");
      dash.style.left = positionY + "%";
      dash.style.animationDelay = -1 + (1 / numberOfEls) * i + "s";
      element.appendChild(dash);
    }

    dashPattern.forEach(function (element) {
      for (let i = 0; i < numberOfEls; i++) createDashes(i, element);
    });

    return;
  }

  /*
   * Helix function
   */
  function createHelix() {
    function createStrand(i) {
      let strand = document.createElement("div");
      const rotate = (540 / numberOfEls) * i; //
      const opacity = (1 / numberOfEls) * i;
      const translateY = (100 / numberOfEls) * i - 50;
      strand.classList.add("strand");
      strand.style.opacity = opacity;
      strand.style.transform = "rotate(" + rotate + "deg)";
      strand.style.top = translateY + "%";
    }

    for (let i = 0; i < numberOfEls; i++) createStrand(i);

    return;
  }

  //speedUpCircles();

  // Create Helix animation
  createHelix();
  // Create Dash array animations
  createDashArray();

  /* 
 End the boot cycle
*/

  function pauseBoot() {
    var newTimerId = window.setInterval("function(){}");
    for (var i = 0; i <= newTimerId; i++) {
      window.clearInterval(i);
    }
  }

  return (
    <>
      <div className="app-container">
        <div className="overlay">
          <div className="scanlines"></div>
        </div>
        <div className="overlayRed">
          <div className="scanlines"></div>
        </div>
        <div className="helix"></div>
        <div className="dash-pattern top"></div>
        <div className="dash-pattern bottom"></div>
      </div>
      <div className="boot-screen">
        <div className="boot-sequence">
          <img src={logo} alt="boot-sequence-image" />
          <Link to="/login">
            <button
              className="btn"
              id="js-fast-boot"
              onClick={() => pauseBoot()}
            >
              START
            </button>
          </Link>
          <div className="outter-circle">
            <svg
              className="white-circle"
              viewBox="0 0 708 702"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M354 701c194.957 0 353-158.043 353-353S548.957-5 354-5 1 153.043 1 348s158.043 353 353 353z"
                strokeWidth="2"
                fill="none"
                strokeDasharray="80 160"
              />
            </svg>
          </div>
          <div className="inner-circle">
            <svg
              className="red-circle"
              viewBox="0 0 708 702"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M354 701c194.957 0 353-158.043 353-353S548.957-5 354-5 1 153.043 1 348s158.043 353 353 353z"
                strokeWidth="4"
                fill="none"
                strokeDasharray="80 160"
              />
            </svg>
            <svg
              className="green-circle"
              viewBox="0 0 708 702"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M354 701c194.957 0 353-158.043 353-353S548.957-5 354-5 1 153.043 1 348s158.043 353 353 353z"
                strokeWidth="3"
                fill="none"
                strokeDasharray="20 60 10"
              />
            </svg>
          </div>
        </div>
        <div id="console" className="console"></div>
      </div>
    </>
  );
};

export default NewLanding;
