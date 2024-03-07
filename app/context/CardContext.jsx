"use client"
import React, { createContext, useContext, useState } from "react";

const CardsContext = createContext();

export const CardsProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [cardsOnCalendar, setCardsOnCalendar] = useState([]);

  return (
    <CardsContext.Provider value={{ cards, setCards, cardsOnCalendar, setCardsOnCalendar }}>
      {children}
    </CardsContext.Provider>
  );
};

export const useCards = () => {
  const context = useContext(CardsContext);
  if (!context) {
    throw new Error("useCards must be used within a CardsProvider");
  }
  return context;
};