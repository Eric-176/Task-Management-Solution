import "./navStyles.css";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import NoteApplication from "./notes/NoteApplication.jsx";
import Settings from "./settings/Settings.tsx";
import TodoApp from "./todo/TodoApp.tsx";
import Timer from "./timer/Timer.tsx";
import Hub from "./hub/Hub.tsx";
import { useState, useEffect } from "react";
import { LOGIN_LOCAL_STORAGE } from "./App.jsx";
import Calendar from "./calendar/Calendar.tsx";
import Reminders from "./reminders/Reminders.tsx";
import Help from "./help/Help.tsx";

const USER_DATA = "Planexe.userData";

function Home({ googleId }) {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [userData, setUserData] = useState([]);
  const [settings, setSettings] = useState([
    { id: "todoSetting", checked: true },
    { id: "remindersSetting", checked: true },
    { id: "notesSetting", checked: true },
    { id: "calendarSetting", checked: true },
    { id: "timerSetting", checked: true },
  ]);

  useEffect(() => {
    const storedUserData = localStorage.getItem(USER_DATA);
    if (storedUserData) {
      if (JSON.parse(storedUserData) != userList) {
        setUserList(JSON.parse(storedUserData));
        if (googleId) {
          let userExists = false;
          for (let i = 0; i < JSON.parse(storedUserData).length; i++) {
            console.log(JSON.parse(storedUserData)[i]);
            if (JSON.parse(storedUserData)[i].id == googleId) {
              console.log("user exists");
              userExists = true;
              setUserData(JSON.parse(storedUserData)[i].data);
            }
          }
          if (!userExists) {
            setUserList((previousUserList) => {
              return [...previousUserList, { id: googleId, data: [] }];
            });
          }
          console.log(userExists);
        }
      }
    } else if (googleId) {
      setUserList([{ id: googleId, data: [] }]);
    }
  }, [googleId]);

  useEffect(() => {
    if (userList.length) {
      localStorage.setItem(USER_DATA, JSON.stringify(userList));
    }
  }, [userList]);

  useEffect(() => {
    for (let i = 0; i < settings.length; i++) {
      const link = document.getElementById(settings[i].id);
      if (!settings[i].checked) {
        link.style.display = "none";
      }
      if (settings[i].checked) {
        link.style.display = "block";
      }
    }
  }, [settings]);

  function handleLogout() {
    localStorage.setItem(LOGIN_LOCAL_STORAGE, "");
    navigate("/login");
  }

  const navSlide = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");

    //toggle nav
    nav?.classList.toggle("nav-active");

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

  return (
    <>
      <nav>
        <div className="burger" onClick={() => navSlide()}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
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

        <div className="logo">
          <h4>Plan.exe</h4>
        </div>
        <div className="navBarStuff">
          <div className="logout">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Hub googleId={googleId} />}></Route>
        <Route path="/todo" element={<TodoApp />}></Route>
        <Route path="/reminders" element={<Reminders />}></Route>
        <Route path="/notes/*" element={<NoteApplication />}></Route>
        <Route path="/calendar" element={<Calendar />}></Route>
        <Route path="/timer" element={<Timer />}></Route>
        <Route
          path="/settings"
          element={<Settings settings={settings} setSettings={setSettings} />}
        ></Route>
        <Route path="/help" element={<Help />}></Route>
        <Route path="*" element={<Navigate to={"/"} />}></Route>
      </Routes>
    </>
  );
}

export default Home;
