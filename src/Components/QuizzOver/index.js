import React from "react";
import { useEffect, useState } from "react";
import { GiTrophyCup } from "react-icons/gi";
import Loader from "../Loader.js";
import Modal from "../Modal/Modal";
import axios from "axios";

const QuizzOver = React.forwardRef((props, ref) => {
  const {
    levelNames,
    score,
    maxQuestions,
    quizLevel,
    percent,
    loadLevelQuestions,
  } = props;
  const [asked, setAsked] = useState([]);
  const [modalopen, setModalOpen] = useState(false);
  const [heroDescription, setHeroDescription] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
  const hash = "7c6d41889e10fac2a561acee27ccad3f";

  useEffect(() => {
    setAsked(ref.current);
    const date = localStorage.getItem("marvelStorageDate");
    const checkDataAge = (date) => {
      const today = Date.now();
      const timeDif = today - date;
      const dayDif = timeDif / (1000 * 1000 * 24);
      if (dayDif >= 15) {
        localStorage.clear();
        localStorage.setItem("marvelStorageDate", Date.now());
      }
    };
    if (date) {
      checkDataAge(date);
    }
  }, [ref]);
  const capitalFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  const showModal = (heroId) => {
    setModalOpen(!modalopen);

    if (localStorage.getItem(heroId)) {
      setHeroDescription(JSON.parse(localStorage.getItem(heroId)));
      setLoading(false);
    } else {
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters/${heroId}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`
        )
        .then((response) => {
          console.log("response:", response);
          setHeroDescription(response.data);
          setLoading(false);
          localStorage.setItem(heroId, JSON.stringify(response.data));
          if (!localStorage.getItem("marvelStorageDate")) {
            localStorage.setItem("marvelStorageDate", Date.now());
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const hideModal = () => {
    setModalOpen(!modalopen);
    setLoading(true);
  };
  const averageGrades = maxQuestions / 2;
  if (score < averageGrades) {
    setTimeout(() => {
      loadLevelQuestions(quizLevel);
    }, 3000);
  }
  const decision =
    score >= averageGrades ? (
      <>
        <div className="stepsBtnContainer">
          {quizLevel < levelNames.length ? (
            <>
              <p className="successMsg">Bravo passez au niveau suivant</p>
              <button
                className="btnResult success "
                onClick={() => loadLevelQuestions(quizLevel)}
              >
                Niveau suivant
              </button>
            </>
          ) : (
            <>
              <p className="successMsg">
                <GiTrophyCup size="50px" /> Bravo vous etez un expert
              </p>
              <button
                className="btnResult gameOver"
                onClick={() => loadLevelQuestions(0)}
              >
                Accueil
              </button>
            </>
          )}
        </div>
        <div className="percentage">
          <div className="progressPercent"> Réussite: {percent} %</div>
          <div className="progressPercent">
            {" "}
            Note: {score}/{maxQuestions}
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="stepsBtnContainer">
          <p className="failureMsg">Vous avez échoué</p>
        </div>
        <div className="percentage">
          <div className="progressPercent"> Réussite: {percent} %</div>
          <div className="progressPercent">
            {" "}
            Note: {score}/{maxQuestions}
          </div>
        </div>
      </>
    );
  const tableAswerQuestion =
    score >= averageGrades ? (
      asked.map((question) => {
        return (
          <tr key={question.id}>
            <td>{question.question}</td>
            <td>{question.answer} </td>
            <td>
              {" "}
              <button
                className="btnInfo"
                onClick={() => showModal(question.heroId)}
              >
                Info
              </button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan={3}>
          <Loader
            loadingMgs={"Repasser le Test "}
            styling={{ textAlign: " center", color: "red" }}
          />
        </td>
      </tr>
    );
  const resultModal = !loading ? (
    <>
      <div className="modalHeader">
        <h2>{heroDescription.data.results[0].name}</h2>
      </div>
      <div className="modalBody">
        <div className="comicImage">
          <img
            src={
              heroDescription.data.results[0].thumbnail.path +
              "." +
              heroDescription.data.results[0].thumbnail.extension
            }
            alt={heroDescription.data.results[0].name}
          />
          {heroDescription.attributionText}
        </div>
        <div className="comicDetails">
          {" "}
          <h3>Description</h3>
          {heroDescription.data.results[0].description ? (
            <p>{heroDescription.data.results[0].description}</p>
          ) : (
            <p>Description indisponible</p>
          )}
          <h3>Plus d'infos</h3>
          {heroDescription.data.results[0].urls &&
            heroDescription.data.results[0].urls.map((url, i) => {
              return (
                <a
                  key={i}
                  href={url.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {capitalFirstLetter(url.type)}{" "}
                </a>
              );
            })}
        </div>
      </div>
      <div className="modalFooter">
        <button className="modalBtn" onClick={() => setModalOpen(!modalopen)}>
          Fermer
        </button>
      </div>
    </>
  ) : (
    <>
      <div className="modalHeader">
        <h2>Attente de la réponse</h2>
      </div>
      <div className="modalBody">
        <Loader />
      </div>
    </>
  );
  return (
    <>
      {decision}

      <hr />
      <p>Les réponses aux questions posées:</p>
      <div className="answercontainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponses</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>{tableAswerQuestion}</tbody>
        </table>
      </div>
      <Modal showModal={modalopen} hideModal={hideModal}>
        {resultModal}
      </Modal>
    </>
  );
});

export default React.memo(QuizzOver);
