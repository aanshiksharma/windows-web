import { BrowserRouter, Routes, Route } from "react-router";

import "./App.css";
import Desktop from "./components/layout/Desktop";
import Login from "./components/auth/Login";
import Welcome from "./components/auth/Welcome";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Desktop />}></Route>
          <Route path="/auth/login" element={<Login />}></Route>
          <Route path="/auth/welcome" element={<Welcome />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
