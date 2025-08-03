import { BrowserRouter, Routes, Route } from "react-router";

import "./App.css";
import Desktop from "./screens/Desktop";
import Login from "./screens/Login";
import Welcome from "./screens/Welcome";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Desktop />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/welcome" element={<Welcome />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
