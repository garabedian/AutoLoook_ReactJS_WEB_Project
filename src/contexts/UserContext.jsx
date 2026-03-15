import React, { createContext, useEffect, useState } from 'react';
import Backendless from '../backendless';
import { clearStorageAndReload } from '../utils/storage-utils.js';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const currentUser = await Backendless.UserService.getCurrentUser();
        if (currentUser) setUser(currentUser);
      } catch {
        // no active session
      }
    };
    restoreSession();
  }, []);

  const logout = async () => {
    try {
      await Backendless.UserService.logout();
      setUser(null);
      clearStorageAndReload();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};