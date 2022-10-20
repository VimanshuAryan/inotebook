
import React from "react";
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


export default function App() {

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert message = "eat your greens"/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="about/*" element={<About />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>

  );
}
