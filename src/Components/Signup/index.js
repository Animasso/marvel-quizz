// import React, { useContext } from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, user } from "../Firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { setDoc } from "firebase/firestore";

function Signup(props) {
  const data = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState("");
  //to send all the data from the form
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };
  //destructuring
  const { pseudo, email, password, confirmPassword } = loginData;
  //button form activation
  const btnAccess =
    pseudo === "" ||
    email === "" ||
    password === "" ||
    password !== confirmPassword ? (
      <button disabled>Inscription</button>
    ) : (
      <button>Inscription</button>
    );
  //submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    createUserWithEmailAndPassword(auth, email, password, pseudo)
      .then((authUser) => {
        return setDoc(user(authUser.user.uid), { pseudo, email });
      })
      .then((user) => {
        setLoginData({ ...data });
        navigate("/welcome");
      })
      .catch((error) => {
        setError(error);
        setLoginData({ ...data });
      });
  };
  const errorMgs = error !== "" && <span>{error.message}</span>;

  return (
    <div className="signupLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {errorMgs}
            <form onSubmit={handleSubmit}>
              <h2>Inscription</h2>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={pseudo}
                  type="text"
                  id="pseudo"
                  required
                />
                <label htmlFor="pseudo">Pseudo</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={email}
                  type="email"
                  id="email"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={password}
                  type="password"
                  id="password"
                  required
                />
                <label htmlFor="password">Mot de passe</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={confirmPassword}
                  type="password"
                  id="confirmPassword"
                  required
                />
                <label htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </label>
              </div>
              {btnAccess}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                {" "}
                Déja inscris?Connectez-vous
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
