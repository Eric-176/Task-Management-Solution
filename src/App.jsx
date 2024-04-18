import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./login/Login";
import "./navStyles.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default App;
