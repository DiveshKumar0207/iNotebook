import { Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import ErrorPage from "./components/Error";
// import Layout from "./components/Layout";

function App() {
  return (
    <>
      <div className=" max-h-[100vh] overflow-auto">
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
    </>
  );
}

export default App;
