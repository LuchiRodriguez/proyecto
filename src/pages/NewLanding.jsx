import "../app/Landing.css";

const NewLanding = () => {
  return (
    <>
      <div className="text">
        <h1>PRESS START</h1>
      </div>
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
              className="white-circle"
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
      </div>
    </>
  );
};

export default NewLanding;
