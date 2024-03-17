"use client";
import dayjs from "dayjs";
import CardOnCalendar from "./CardOnCalendar";
import { useCards } from "../context/CardContext";
import { CardService } from "../api/cards.service";
import { useEffect, useState } from "react";
import { getCurrentDayClass } from "../utils/dayjs";

const Day = ({ day }) => {
  const {
    cardsOnCalendar,
    setCardsOnCalendar,
    filterCardsOnCalendar,
  } = useCards();

  const [filteredCards, setFilteredCards] = useState([]);

  const handleDrop = async (e) => {
    e.preventDefault();
    const cardTransfer = e.dataTransfer.getData("card");

    if (cardTransfer) {
      const card = JSON.parse(cardTransfer);
      if (card.isOnCalendar) {
        const dayjsToISOString = day.toISOString();
        const updatedCard = await CardService.updateCard(card._id, {
          day: dayjsToISOString,
        });
        const cardsUpdated = cardsOnCalendar.map((cardToUpdate) =>
          cardToUpdate._id === card._id ? updatedCard : cardToUpdate
        );
        setCardsOnCalendar(cardsUpdated);
      } else {
        const dayjsToISOString = day.toISOString();
        const { _id, ...newCardWithoutId } = card;
        const newCard = {
          ...newCardWithoutId,
          day: dayjsToISOString,
          isOnCalendar: true,
        };
        const cardResponse = await CardService.createCard(newCard);
        const updatedCards = [...cardsOnCalendar, cardResponse];
        setCardsOnCalendar(updatedCards);
      }
    }
  };

  useEffect(() => {
    if (filterCardsOnCalendar) {
      setFilteredCards(
        cardsOnCalendar.filter((card) => card.section === filterCardsOnCalendar)
      );
    } else {
      setFilteredCards(cardsOnCalendar);
    }
  }, [cardsOnCalendar, filterCardsOnCalendar]);


  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border border-border rounded-xl"
      
    >
      {/* border-gray-200  */}
      <header className="flex flex-col items-center">
        <p className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass(day)}`}>
          {day.format("DD")}
        </p>
        <div className="w-full px-2">
          {filteredCards
            .filter((card) => dayjs(card.day).isSame(day))
            .map((card) => (
              <CardOnCalendar key={card._id} card={card} />
            ))}
        </div>
      </header>
    </div>
  );
};

export default Day;
