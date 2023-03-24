import React from "react";
import batman from "../../images/batman.png";
const centerH2 = {
  textAlign: "center",
  marginTop: "50px",
};
const centerImg = {
  display: "block",
  margin: "40px auto",
};
function ErrorPage(props) {
  return (
    <div className="quizz-bg">
      <div className="container">
        <h2 style={centerH2}>Oups, cette page n'existe pas !!</h2>
        <img src={batman} style={centerImg} alt="error page" srcset="" />
      </div>
    </div>
  );
}

export default ErrorPage;
