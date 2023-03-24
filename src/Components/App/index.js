import "../../App.css";
// import { Routes, Route } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header/index";
import Landing from "../Landing";
import Login from "../Login";
import Signup from "../Signup";
import Welcome from "../Welcome";
import ErrorPage from "../ErrorPage";
import ForgetPassword from "../ForgetPassword";
// import QuizzOver from "../QuizzOver";
import { IconContext } from "react-icons";
function App() {
  return (
    <BrowserRouter>
      <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          {/* <Route path="/recapQuizz" element={<QuizzOver />} /> */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </IconContext.Provider>
    </BrowserRouter>
  );
}

export default App;
