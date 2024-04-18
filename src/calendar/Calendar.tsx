import React from "react";
import "./Calendar.css";

function Calendar() {
  return (
    <div className="calendarApp">
      <div className="month">
        <div className="arrow-left"></div>
        <h1 className="month-title">January</h1>
        <div className="arrow-right"></div>
      </div>
      <ul className="calendar">
        <li className="day-title">Sunday</li>
        <li className="day-title">Monday</li>
        <li className="day-title">Tuesday</li>
        <li className="day-title">Wednesday</li>
        <li className="day-title">Thursday</li>
        <li className="day-title">Friday</li>
        <li className="day-title">Saturday</li>
        <li className="day">1</li>
        <li className="day">2</li>
        <li className="day">3</li>
        <li className="day">4</li>
        <li className="day">5</li>
        <li className="day">6</li>
        <li className="day">7</li>
        <li className="day">8</li>
        <li className="day">9</li>
        <li className="day">10</li>
        <li className="day">11</li>
        <li className="day">12</li>
        <li className="day">13</li>
        <li className="day">14</li>
        <li className="day">15</li>
        <li className="day">16</li>
        <li className="day">17</li>
        <li className="day">18</li>
        <li className="day">19</li>
        <li className="day">20</li>
        <li className="day">21</li>
        <li className="day">22</li>
        <li className="day">23</li>
        <li className="day">24</li>
        <li className="day">25</li>
        <li className="day">26</li>
        <li className="day">27</li>
        <li className="day">28</li>
        <li className="day">29</li>
        <li className="day">30</li>
        <li className="day">31</li>
      </ul>
    </div>
  );
}

export default Calendar;
