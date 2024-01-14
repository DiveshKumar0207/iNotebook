import { Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import ErrorPage from "./components/Error";
import NoteState from "./context/notes/NoteStates";
import LoginSignupForm from "./components/LoginSignUp";
import AuthStates from "./context/auth/AuthStates";
import AlertStates from "./context/alert/AlertStates";
import AlertBar from "./components/AlertBar";

function App() {
  return (
    <>
      <AlertStates>
        <AuthStates>
          <NoteState>
            <div className=" h-[100vh] w-screen overflow-auto">
              <Navbar />
              <div className="h-8 pt-2">
                <AlertBar />
              </div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/auth" element={<LoginSignupForm />} />
                <Route index path="*" element={<ErrorPage />} />
              </Routes>
            </div>
          </NoteState>
        </AuthStates>
      </AlertStates>
    </>
  );
}

export default App;
