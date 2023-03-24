import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
function ForgetPassword(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setError(null);
        setSuccess(
          `Consulter votre boite mail ${email} pour changer le mots de passe `
        );
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        setSuccess(null);
        setEmail("");
        setError(error);

        // ..
      });
  };
  const btnEmail =
    email !== "" ? (
      <button>Récupérer</button>
    ) : (
      <button disabled>Récupérer</button>
    );
  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget"></div>
        <div className="formBoxRight">
          <div className="formContent">
            <form onSubmit={handleSubmit}>
              {success && (
                <span
                  style={{
                    color: "#ffff",
                    border: "1px solid green",
                    background: "green",
                  }}
                >
                  {success}{" "}
                </span>
              )}
              {error && (
                <span
                  style={{
                    color: "#ffff",
                    border: "1px solid white",
                    background: "red",
                  }}
                >
                  {error.message}
                </span>
              )}
              <h2>Mot de passe oublié ?</h2>

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
              {btnEmail}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                {" "}
                Pas de compte ? Inscrivez-vous
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
