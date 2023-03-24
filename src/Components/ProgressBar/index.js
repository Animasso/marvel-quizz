import React from "react";

function ProgressBar({ maxQuestions, iDquestion }) {
  const getPercent = (totalQuestions, questionId) => {
    return (100 / totalQuestions) * questionId;
  };
  const actualQuestion = iDquestion + 1;
  const progressPercent = getPercent(maxQuestions, actualQuestion);
  return (
    <>
      <div className="percentage">
        <div className="progressPercent">{`Question : ${actualQuestion} / ${maxQuestions}`}</div>
        <div className="progressPercent">
          {`Progression :${progressPercent} %`}{" "}
        </div>
      </div>
      <div className="progressBar">
        <div
          className="progressBarChange"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </>
  );
}

export default React.memo(ProgressBar);
