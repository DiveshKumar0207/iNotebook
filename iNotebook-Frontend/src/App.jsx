import { Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import ErrorPage from "./components/Error";
import NoteState from "./context/notes/NoteStates";
// import Layout from "./components/Layout";

function App() {
  return (
    <>
      <NoteState>
        <div className=" h-[100vh] w-screen overflow-auto">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route index path="*" element={<ErrorPage />} />

            {/* <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route path="*" element={<ErrorPage />} /> */}
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
