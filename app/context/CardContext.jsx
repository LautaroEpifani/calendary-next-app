"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { CardService } from "../api/cards.service";

const CardsContext = createContext();

export const CardsProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [cardsOnCalendar, setCardsOnCalendar] = useState([]);
  const [filterCardsOnCalendar, setFilterCardsOnCalendar] = useState(null);
  const [showCardButtons, setShowCardButtons] = useState(false);

  useEffect(() => {
    CardService.getCards()
      .then((data) => {
        const filteredCards = data.filter((card) => !card.isOnCalendar);
        setCards(filteredCards);
        const cardsWithCalendar = data.filter((card) => card.isOnCalendar);
        setCardsOnCalendar(cardsWithCalendar);
      })
      .catch((error) => {
        console.error("Error when obtaining cards:", error);
      });
  }, []);

  return (
    <CardsContext.Provider
      value={{
        cards,
        setCards,
        cardsOnCalendar,
        setCardsOnCalendar,
        showCardButtons,
        setShowCardButtons,
        filterCardsOnCalendar,
        setFilterCardsOnCalendar,
      }}
    >
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
