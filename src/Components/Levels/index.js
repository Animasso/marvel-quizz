import React, { useEffect, useState } from "react";
import Stepper from "react-stepper-horizontal";

function Levels({ levelsArray, quizLevel }) {
  const [levels, setLevels] = useState([]);
  useEffect(() => {
    const singlevel = levelsArray.map((level) => ({
      title: level.toUpperCase(),
    }));
    setLevels(singlevel);
  }, [levelsArray]);

  return (
    <>
      <div className="levelsContainer">
        <Stepper
          steps={levels}
          activeStep={quizLevel}
          size={45}
          circleFontSize={20}
          circleTop={0}
          activeTitleColor={"#d31017"}
          activeColor={"#d31017"}
          // circleFontColor={"#FFFFFF"}
          completeTitleColor={"#E0E0E0"}
          completeColor={"#E0E0E0"}
          defaultTitleColor={"#E0E0E0"}
          completeBarColor={"#E0E0E0"}
          barStyle={"dashed"}
        />
      </div>
    </>
  );
}

export default React.memo(Levels);
