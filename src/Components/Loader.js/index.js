import React from "react";

function Loader({ loadingMgs, styling }) {
  return (
    <>
      <div className="loader"></div> <p style={styling}>{loadingMgs}</p>
    </>
  );
}

export default Loader;
