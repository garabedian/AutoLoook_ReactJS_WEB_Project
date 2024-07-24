import React, { createContext, useState } from 'react';
import Backendless from '../backendless';
import { clearStorageAndReload } from '../utils/storage-utils.js';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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