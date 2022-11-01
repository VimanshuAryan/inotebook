
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default function App() {

  const [alert, setAlert] = useState({msg:"", type:""});

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert({msg:"", type:""});
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert = {showAlert}/>} />
              <Route path="about/*" element={<About/>} />
              <Route path="login/*" element={<Login showAlert = {showAlert}/>} />
              <Route path="signup/*" element={<Signup showAlert = {showAlert}/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>

  );
}
