import React from "react";
import Logout from "../Logout";
import Quizz from "../Quiz";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, user } from "../Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { getDoc } from "firebase/firestore";
import Loader from "../Loader.js";

function Welcome(props) {
  const navigate = useNavigate();
  const [userSession, setUserSesssion] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    let listener = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserSesssion(user);
      } else {
        navigate("/");
      }
    });
    if (!!userSession) {
      //acceder a une réference de la collection
      const colFef = user(userSession.uid);
      getDoc(colFef).then((snapshot) => {
        if (snapshot.exists()) {
          //docData comprend les donnné de la collection
          const docData = snapshot.data();
          //par la suite on mets cela dans userData pour y avoir acces
          setUserData(docData);
        }
      });
    }

    return listener();
  }, [navigate, userSession]);

  return userSession === null ? (
    <>
      <Loader
        loadingMgs={"Authentification ..."}
        styling={{ textAlign: " center", color: "#fff" }}
      />
    </>
  ) : (
    <div className="quizz-bg">
      <div className="container">
        <Logout />
        <Quizz userData={userData} />
      </div>
    </div>
  );
}

export default Welcome;
