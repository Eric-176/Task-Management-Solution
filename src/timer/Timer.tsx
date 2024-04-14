import React, { useEffect, useRef, useState } from "react";
import "./Timer.css";

function Timer() {
  const [time, setTime] = useState("00:00:00");
  const [inputTime, setInputTime] = useState("00:00:00");
  const timeRemaining = useRef(0);
  const timerId: any = useRef();

  function handleHours(e: any) {
    if (!e.target.value) {
      const newTime = "00" + time.substring(2, 8);
      setTime(newTime);
    } else if (e.target.value >= 0 && e.target.value <= 24) {
      if (e.target.value <= 9) {
        const newTime = "0" + e.target.value + time.substring(2, 8);
        setTime(newTime);
      } else {
        const newTime = e.target.value + time.substring(2, 8);
        setTime(newTime);
      }
    }
  }

  function handleMinutes(e: any) {
    if (!e.target.value) {
      const newTime = time.substring(0, 3) + "00" + time.substring(5, 8);
      setTime(newTime);
    } else if (e.target.value >= 0 && e.target.value <= 60) {
      if (e.target.value <= 9) {
        const newTime =
          time.substring(0, 3) + "0" + e.target.value + time.substring(5, 8);
        setTime(newTime);
      } else {
        const newTime =
          time.substring(0, 3) + e.target.value + time.substring(5, 8);
        setTime(newTime);
      }
    }
  }

  function handleSeconds(e: any) {
    if (!e.target.value) {
      const newTime = time.substring(0, 6) + "00";
      setTime(newTime);
    } else if (e.target.value >= 0 && e.target.value <= 60) {
      if (e.target.value <= 9) {
        const newTime = time.substring(0, 6) + "0" + e.target.value;
        setTime(newTime);
      } else {
        const newTime = time.substring(0, 6) + e.target.value;
        setTime(newTime);
      }
    }
  }

  function handleStart() {
    setInputTime(time);
    timeRemaining.current =
      Number(time.substring(0, 2)) * 60 * 60 +
      Number(time.substring(3, 5)) * 60 +
      Number(time.substring(6, 8));
    timerId.current = setInterval(() => {
      let hours = String(Math.floor(timeRemaining.current / 60 / 60));
      let minutes = String(Math.floor((timeRemaining.current % 60) / 60));
      let seconds = String(Math.floor(timeRemaining.current % 60));
      if (hours.length < 2) {
        hours = "0" + hours;
      }
      if (minutes.length < 2) {
        minutes = "0" + minutes;
      }
      if (seconds.length < 2) {
        seconds = "0" + seconds;
      }
      const newTime =
        String(hours) + ":" + String(minutes) + ":" + String(seconds);
      console.log(newTime);
      setTime(newTime);
      if (timeRemaining.current !== 0) {
        timeRemaining.current--;
      } else {
        clearInterval(timerId.current);
      }
    }, 1000);
  }

  function handlePause() {
    clearInterval(timerId.current);
  }

  function handleRestart() {
    setTime(inputTime);
  }

  return (
    <div className="TimerApp">
      <div className="timer">
        <h1 className="display">{time}</h1>
      </div>
      <div className="timerInput">
        <input id="hours" type="number" onChange={handleHours} />
        <label htmlFor="">Hours</label>
        <input id="minutes" type="number" onChange={handleMinutes} />
        <label htmlFor="minutes">Minutes</label>
        <input type="number" onChange={handleSeconds} />
        <label htmlFor="">Seconds</label>
      </div>
      <div className="timerButtons">
        <button
          className="timerButton startButton"
          id="startButton"
          onClick={handleStart}
        >
          Start
        </button>
        <button className="timerButton stopButton" onClick={handlePause}>
          Pause
        </button>
        <button className="timerButton restartButton" onClick={handleRestart}>
          Restart
        </button>
      </div>
    </div>
  );
}

export default Timer;
