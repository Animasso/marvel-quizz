import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizMarvel } from "../QuizzMarvel";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { Component } from "react";
import QuizzOver from "../QuizzOver";
import { FaChevronRight } from "react-icons/fa";
const initialState = {
  quizLevel: 0,
  maxQuestions: 10,
  storedQuestions: [],
  question: null,
  options: [],
  iDquestion: 0,
  btnDisable: true,
  userAnswer: null,
  score: 0,
  showMgs: false,
  percent: 0,
  quizzEnd: false,
};
const levelNames = ["debutant", "confirme", "expert"];
class Quizz extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.storedDataRef = React.createRef();
  }

  loadQuestions = (quizz) => {
    const fetchArrayQuizz = QuizMarvel[0].quizz[quizz];
    if (fetchArrayQuizz.length >= this.state.maxQuestions) {
      const fetchArrayQuizz = QuizMarvel[0].quizz[quizz];
      this.storedDataRef.current = fetchArrayQuizz;

      const newArray = fetchArrayQuizz.map(({ answer, ...rest }) => rest);
      this.setState({
        storedQuestions: newArray,
      });
    } else {
      console.log("pas assez de question");
    }
  };
  showWelcomeMgs = (pseudo) => {
    if (!this.state.showMgs) {
      this.setState({
        showMgs: true,
      });
      toast.warn(`Welcome ${pseudo} et bonne chance !`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        quizzEnd: false,
      });
    }
  };
  componentDidMount() {
    this.loadQuestions(levelNames[this.state.quizLevel]);
  }

  componentDidUpdate(prevProps, prevState) {
    const { maxQuestions, storedQuestions, score, iDquestion, quizzEnd } =
      this.state;
    if (
      storedQuestions !== prevState.storedQuestions &&
      storedQuestions.length
    ) {
      this.setState({
        question: storedQuestions[iDquestion].question,
        options: storedQuestions[iDquestion].options,
      });
    }
    if (iDquestion !== prevState.iDquestion && storedQuestions.length) {
      this.setState({
        question: storedQuestions[iDquestion].question,
        options: storedQuestions[iDquestion].options,
        userAnswer: null,
        btnDisable: true,
      });
    }
    if (quizzEnd !== prevState.quizzEnd) {
      const gradePercent = this.getPercentage(maxQuestions, score);
      this.gameOver(gradePercent);
    }

    if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
      this.showWelcomeMgs(this.props.userData.pseudo);
    }
  }
  submitAnswer = (selectAnswer) => {
    this.setState({
      userAnswer: selectAnswer,
      btnDisable: false,
    });
  };
  nextQuestion = () => {
    if (this.state.iDquestion === this.state.maxQuestions - 1) {
      // this.gameOver();
      this.setState({ quizzEnd: true });
    } else {
      this.setState((prevState) => ({
        iDquestion: prevState.iDquestion + 1,
      }));
    }
    const goodAnswer = this.storedDataRef.current[this.state.iDquestion].answer;
    if (this.state.userAnswer === goodAnswer) {
      this.setState((prevState) => ({
        score: prevState.score + 1,
      }));
      toast.success(`Bravo +1  !`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error(`Mauvaise réponse  +0 !`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  getPercentage = (maxQuestion, ourScrore) => {
    return (ourScrore / maxQuestion) * 100;
  };
  gameOver = (percent) => {
    if (percent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent,
      });
    } else {
      this.setState({
        percent,
      });
    }
  };
  loadLevelQuestions = (param) => {
    this.setState({ ...initialState, quizLevel: param });
    this.loadQuestions(levelNames[param]);
  };
  render() {
    const {
      quizLevel,
      maxQuestions,
      question,
      options,
      iDquestion,
      btnDisable,
      userAnswer,
      score,
      percent,
      quizzEnd,
    } = this.state;

    const displayOptions = options.map((option, index) => {
      return (
        <p
          className={`answerOptions ${
            userAnswer === option ? "selected" : null
          }`}
          onClick={() => this.submitAnswer(option)}
          key={index}
        >
          <FaChevronRight /> {option}{" "}
        </p>
      );
    });
    return quizzEnd ? (
      <QuizzOver
        ref={this.storedDataRef}
        levelNames={levelNames}
        score={score}
        maxQuestions={maxQuestions}
        quizLevel={quizLevel}
        percent={percent}
        loadLevelQuestions={this.loadLevelQuestions}
      />
    ) : (
      <>
        <ToastContainer />
        <Levels levelsArray={levelNames} quizLevel={quizLevel} />
        <ProgressBar iDquestion={iDquestion} maxQuestions={maxQuestions} />
        <h2>{question}</h2>
        {displayOptions}

        <button
          disabled={btnDisable}
          onClick={this.nextQuestion}
          className="btnSubmit"
        >
          {iDquestion < maxQuestions - 1 ? "Suivant" : "Terminer"}
        </button>
      </>
    );
  }
}

// function Quizz({ userData }) {
//   const [levelNames, setLevelNames] = useState([
//     "debutant",
//     "confirme",
//     "expert",
//   ]);
//   const [quizLevel, setQuizLevel] = useState(0);
//   const [maxQuestions, setMaxQuestions] = useState(10);
//   const [storeQuestions, setStoreQuestions] = useState({});
//   console.log("StoreQuestions:", storeQuestions[0]);
//   const [questions, setQuestions] = useState({});
//   //   const [options, setOptions] = useState([]);
//   const loadQuestions = (level) => {
//     const fecthedArray = QuizMarvel[0].quizz[level];

//     if (fecthedArray.length >= maxQuestions) {
//       const newArray = fecthedArray.map(({ answer, ...keepRest }) => keepRest);
//       setStoreQuestions(newArray);
//     } else {
//       console.log("Pas assez de question");
//     }
//   };

//   useEffect(() => {
//     loadQuestions(levelNames[quizLevel]);
//     if (storeQuestions !== setStoreQuestions) {
//       setQuestions(storeQuestions[0]);
//       // setQuestions()
//     }
//   }, [levelNames]);
//   //   QuizMarvel.map((quizz) => {
//   //     return quizz.debutant;
//   //   });

//   return (

//   );
// }

export default Quizz;
