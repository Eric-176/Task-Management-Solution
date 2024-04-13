import React, { useEffect, useState } from "react";
import "./Settings.css";

const LOCAL_STORAGE_KEY = "Settings.settings";

type settings = setting[];

type setting = {
  id: string;
  checked: boolean;
};

type SettingsProps = {
  settings: settings;
  setSettings: (e: any) => void;
};

function Settings({ settings, setSettings }: SettingsProps) {
  function toggleChecked(e: any) {
    const newSettings = settings.map((setting: setting) => {
      if (setting.id == e.target.id) {
        if (setting.checked === true) {
          return { ...setting, checked: false };
        } else {
          return { ...setting, checked: true };
        }
      } else {
        return setting;
      }
    });
    setSettings(newSettings);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSettings));
  }

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
      const storedSettings = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY)!
      );
      if (storedSettings?.length) {
        setSettings(storedSettings);
      }
    }
  }, []);

  return (
    <div className="settings">
      <h1>Settings</h1>
      <div className="settingContainer">
        <label className="switch">
          <input
            id="todoSetting"
            type="checkbox"
            checked={settings[0].checked}
            onChange={toggleChecked}
          />
          <div className="slider"></div>
        </label>
        <h3 className="settingTitle">Todo</h3>
      </div>
      <div className="settingContainer">
        <label className="switch">
          <input
            id="remindersSetting"
            type="checkbox"
            checked={settings[1].checked}
            onChange={toggleChecked}
          />
          <div className="slider"></div>
        </label>
        <h3 className="settingTitle">Reminders</h3>
      </div>
      <div className="settingContainer">
        <label className="switch">
          <input
            id="notesSetting"
            type="checkbox"
            checked={settings[2].checked}
            onChange={toggleChecked}
          />
          <div className="slider"></div>
        </label>
        <h3 className="settingTitle">Notes</h3>
      </div>
      <div className="settingContainer">
        <label className="switch">
          <input
            id="calendarSetting"
            type="checkbox"
            checked={settings[3].checked}
            onChange={toggleChecked}
          />
          <div className="slider"></div>
        </label>
        <h3 className="settingTitle">Calendar</h3>
      </div>
      <div className="settingContainer">
        <label className="switch">
          <input
            id="timerSetting"
            type="checkbox"
            checked={settings[4].checked}
            onChange={toggleChecked}
          />
          <div className="slider"></div>
        </label>
        <h3 className="settingTitle">Timer</h3>
      </div>
    </div>
  );
}

export default Settings;
