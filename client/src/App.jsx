import { BrowserRouter, Routes, Route } from "react-router";

import "./App.css";
import Desktop from "./components/layout/Desktop";
import Login from "./components/auth/LoginScreen";
import LockScreen from "./components/auth/LockScreen";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LockScreen settings={{ wallpaper: "" }} />}
          />
          <Route path="/auth/login" element={<Login authType={"login"} />} />
          <Route path="/auth/signup" element={<Login authType={"signup"} />} />
          <Route path="/desktop" element={<Desktop />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
