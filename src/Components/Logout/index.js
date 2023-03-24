import React, { useState, useEffect } from "react";
import { auth } from "../Firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
function Logout(props) {
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  console.log("check:", check);
  useEffect(() => {
    if (check) {
      signOut(auth)
        .then(() => {
          console.log("vous etez deconnecté");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        })
        .catch((error) => {
          console.log("error");
        });
    }
  }, [check, navigate]);

  const handleChange = (e) => {
    setCheck(e.target.checked);
  };
  return (
    <div className="logoutContainer">
      <label className="switch">
        <input type="checkbox" checked={check} onChange={handleChange} />
        <Tooltip
          anchorId="my-anchor-element"
          content="Déconnection"
          place="left"
        />
        <span className="slider round" id="my-anchor-element"></span>
      </label>
    </div>
  );
}

export default Logout;
