"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { UsersService } from "../api/users.service";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    UsersService.getUsers().then((data) => {
      setUsers(data);
    })
    .catch(error => {
      console.error("Error getting users:", error);
    });
  }, []);

  return (
    <UsersContext.Provider value={{ users, setUsers, theme, setTheme }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};