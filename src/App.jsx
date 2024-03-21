import "./navStyles.css";
import { Link, Route, Routes } from "react-router-dom";

const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  //toggle nav
  nav.classList.toggle("nav-active");

  //animate links
  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.3s ease forwards ${
        index / 8 + 0.45
      }s`;
    }
  });

  //animate burger
  burger.classList.toggle("toggle");
};

function App() {
  return (
    <>
      <nav>
        <div className="logo">
          <h4>The Nav</h4>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/todo">Todo</Link>
          </li>
          <li>
            <Link to="/reminders">Reminders</Link>
          </li>
          <li>
            <Link to="/notes">Notes</Link>
          </li>
          <li>
            <Link to="/calendar">Calendar</Link>
          </li>
          <li>
            <Link to="/timer">Timer</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/help">Help</Link>
          </li>
        </ul>
        <div className="burger" onClick={() => navSlide()}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Hub</h1>}></Route>
        <Route path="/todo" element={<h1>todo</h1>}></Route>
        <Route path="/reminders" element={<h1>reminders</h1>}></Route>
        <Route path="/notes" element={<h1>notes</h1>}></Route>
        <Route path="/calendar" element={<h1>calendar</h1>}></Route>
        <Route path="/timer" element={<h1>timer</h1>}></Route>
        <Route path="/settings" element={<h1>settings</h1>}></Route>
        <Route path="/help" element={<h1>help</h1>}></Route>
      </Routes>
    </>
  );
}

export default App;
