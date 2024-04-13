import "./navStyles.css";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import NoteApplication from "./notes/NoteApplication.jsx";
import Settings from "./settings/Settings.tsx";
import TodoApp from "./todo/TodoApp.tsx";
import { useState, useEffect } from "react";

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
  const [settings, setSettings] = useState([
    { id: "todoSetting", checked: true },
    { id: "remindersSetting", checked: true },
    { id: "notesSetting", checked: true },
    { id: "calendarSetting", checked: true },
    { id: "timerSetting", checked: true },
  ]);
  useEffect(() => {
    for (let i = 0; i < settings.length; i++) {
      const link = document.getElementById(settings[i].id);
      if (!settings[i].checked) {
        console.log(settings[i].id);
        link.style.display = "none";
      }
      if (settings[i].checked) {
        console.log(settings[i].id);
        link.style.display = "block";
      }
    }
  }, [settings]);

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
          <li id="todoSetting">
            <Link to="/todo">Todo</Link>
          </li>
          <li id="remindersSetting">
            <Link to="/reminders">Reminders</Link>
          </li>
          <li id="notesSetting">
            <Link to="/notes">Notes</Link>
          </li>
          <li id="calendarSetting">
            <Link to="/calendar">Calendar</Link>
          </li>
          <li id="timerSetting">
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
        <Route path="/todo" element={<TodoApp />}></Route>
        <Route path="/reminders" element={<h1>reminders</h1>}></Route>
        <Route path="/notes/*" element={<NoteApplication />}></Route>
        <Route path="/calendar" element={<h1>calendar</h1>}></Route>
        <Route path="/timer" element={<h1>timer</h1>}></Route>
        <Route
          path="/settings"
          element={<Settings settings={settings} setSettings={setSettings} />}
        ></Route>
        <Route path="/help" element={<h1>help</h1>}></Route>
        <Route path="*" element={<Navigate to={"/"} />}></Route>
      </Routes>
    </>
  );
}

export default App;
