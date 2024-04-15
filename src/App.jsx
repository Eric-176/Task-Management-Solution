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

{
  /* <>
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
        <Route path="/timer" element={<Timer />}></Route>
        <Route
          path="/settings"
          element={<Settings settings={settings} setSettings={setSettings} />}
        ></Route>
        <Route path="/help" element={<h1>help</h1>}></Route>
        <Route path="*" element={<Navigate to={"/"} />}></Route>
      </Routes>
    </> */
}
