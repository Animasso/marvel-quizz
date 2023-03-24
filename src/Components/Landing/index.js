import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
function Landing(props) {
  const refwolverine = useRef(null);

  const [btn, setBtn] = useState(false);

  useEffect(() => {
    refwolverine.current.classList.add("startingImg");
    setTimeout(() => {
      refwolverine.current.classList.remove("startingImg");
      setBtn(true);
    }, 1000);
  }, []);

  const setLeftImg = () => {
    refwolverine.current.classList.add("leftImg");
  };
  const setRightImg = () => {
    refwolverine.current.classList.add("rightImg");
  };
  const deleteImg = () => {
    if (refwolverine.current.classList.contains("leftImg")) {
      refwolverine.current.classList.remove("leftImg");
    } else if (refwolverine.current.classList.contains("rightImg")) {
      refwolverine.current.classList.remove("rightImg");
    }
  };

  const displayBtn = btn && (
    <>
      <div className="leftBox" onMouseOver={setLeftImg} onMouseOut={deleteImg}>
        <Link to="/Signup" className="btn-welcome">
          Inscription
        </Link>
      </div>
      <div
        className="rightBox"
        onMouseOver={setRightImg}
        onMouseOut={deleteImg}
      >
        <Link to="/Login" className="btn-welcome">
          Connexion
        </Link>
      </div>
    </>
  );

  return (
    <main ref={refwolverine} className="welcomePage">
      {displayBtn}
    </main>
  );
}

export default Landing;
