import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../Firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState(false);
  const [errorForm, setErrorForm] = useState("");
  useEffect(() => {
    if (password.length > 5 && email !== "") {
      setBtn(true);
    } else if (btn === true) {
      setBtn(false);
    }
  }, [password, email, btn]);
  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setEmail("");
        setPassword("");
        navigate("/welcome", { replace: true });
      })
      .catch((error) => {
        setErrorForm(error);
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin"></div>
        <div className="formBoxRight">
          <div className="formContent">
            <form onSubmit={handleSubmit}>
              {errorForm !== "" && <span>{errorForm.message} </span>}
              <h2>Connexion</h2>

              <div className="inputBox">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  autoComplete="off"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  autoComplete="off"
                  required
                />
                <label htmlFor="password">Mot de passe</label>
              </div>
              {<button disabled={btn ? false : true}>Connexion</button>}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/signup">
                {" "}
                Pas de compte ? Inscrivez-vous
              </Link>
              <br />
              <Link className="simpleLink" to="/forgetPassword">
                {" "}
                Mot de passe oublié ?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
