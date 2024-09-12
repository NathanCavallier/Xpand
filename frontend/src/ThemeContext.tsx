import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserSettingsContext = createContext({});

export const UserSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    notifications_enabled: true,
    email_notifications: true,
    push_notifications: true,
    dark_mode: 'light',
    language: 'en',
  });

  const showNotification = (message) => {
    if (settings.notifications_enabled) {
      toast(message);
    }
  };

  return (
    <UserSettingsContext.Provider value={{ settings, setSettings, showNotification }}>
      {children}
    </UserSettingsContext.Provider>
  );
};

export const useUserSettings = () => useContext(UserSettingsContext);