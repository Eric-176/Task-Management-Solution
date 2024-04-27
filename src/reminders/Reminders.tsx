import React, { useEffect, useState } from "react";
import "./Reminders.css";

type reminder = {
  title: string;
  date: date;
  time: time;
};

type date = {
  day: string;
  month: string;
  year: string;
};

type time = {
  hour: string;
  minute: string;
};

const REMINDERS_KEY = "Planexe.reminders";

function Reminders() {
  const [reminders, setReminders] = useState([] as reminder[]);

  useEffect(() => {
    if (localStorage.getItem(REMINDERS_KEY)) {
      const storedReminders = JSON.parse(localStorage.getItem(REMINDERS_KEY)!);
      if (storedReminders?.length) {
        setReminders(storedReminders);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
  }, [reminders]);

  function handleSubmit(e: any) {
    e.preventDefault();
    const text = document.querySelector(".textInput") as HTMLInputElement;
    const date = document.querySelector(".dateInput") as HTMLInputElement;
    const time = document.querySelector(".timeInput") as HTMLInputElement;
    if (!date.value || !time.value || !text.value) {
      alert("One of input fields is empty. Please fill in all fields.");
    } else if (reminders.length > 15) {
      alert("Too many reminders created. Please delete a reminder first");
    } else {
      let reminderExists = false;
      for (let i = 0; i < reminders.length; i++) {
        if (reminders[i].title === text.value) {
          alert("Reminder already exists");
          reminderExists = true;
        }
      }

      if (!reminderExists) {
        const newDate = {
          day: date.value.substring(8, 10),
          month: date.value.substring(5, 7),
          year: date.value.substring(0, 4),
        } as date;
        const newTime = {
          hour: time.value.substring(0, 2),
          minute: time.value.substring(3, 5),
        } as time;
        const newReminder = {
          title: text.value,
          date: newDate,
          time: newTime,
        } as reminder;

        setReminders((previousReminders: reminder[]) => {
          console.log([...previousReminders]);
          return [...previousReminders, newReminder];
        });
      }
    }
    e.target.reset();
  }

  function handleDelete(e: any) {
    const newReminders = reminders.filter((reminder: reminder) => {
      if (reminder.title !== e.target.id) {
        return true;
      }
    });
    setReminders(newReminders);
  }

  return (
    <div className="remindersApp">
      <h1 className="reminderAppTitle">Reminders</h1>
      <div className="reminders">
        {reminders.map((reminder) => {
          return (
            <div className="reminderAndButton" key={reminder.title}>
              <div className="reminder">
                <h1 className="reminderTitle">
                  {reminder?.title || "No reminders"}
                </h1>
                <span className="date">
                  Date:{" "}
                  {String(reminder.date.day) +
                    "/" +
                    String(reminder.date.month) +
                    "/" +
                    String(reminder.date.year) +
                    " "}
                </span>
                <span className="time">
                  Time:{" "}
                  {String(reminder.time.hour) +
                    ":" +
                    String(reminder.time.minute)}
                </span>
              </div>
              <button className="cancelButton" onClick={handleDelete}>
                <div className="cancelCross" id={reminder.title}></div>
              </button>
            </div>
          );
        })}
      </div>
      <div className="userInput">
        <button
          className="btn create"
          onClick={handleSubmit}
          aria-label={`create new reminder`}
        >
          +
        </button>
        <form action="" id="form" onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength={22}
            className={`textInput`}
            placeholder={`Enter text...`}
            aria-label={`Enter reminder text`}
          />
        </form>
        <input className="dateInput" type="date" onSubmit={handleSubmit} />
        <input className="timeInput" type="time" onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default Reminders;
