import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import ErrorPage from "./components/Error";
import NoteState from "./context/notes/NoteStates";
import LoginSignupForm from "./components/LoginSignUp";
import AuthStates from "./context/auth/AuthStates";
import { ToastContainer } from "./utils/ToastHandler";

function App() {
  return (
    <>
      <ToastContainer />

      <AuthStates>
        <NoteState>
          <div className=" h-[100vh] w-screen overflow-auto">
            <Navbar />
            <div className="h-8 pt-2"></div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<LoginSignupForm />} />
              <Route index path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </NoteState>
      </AuthStates>
    </>
  );
}

export default App;
