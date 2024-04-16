"use client";
import dayjs from "dayjs";
import CardOnCalendar from "./CardOnCalendar";
import { useCards } from "../context/CardContext";
import { CardService } from "../api/cards.service";
import { useEffect, useState } from "react";
import { getCurrentDayClass } from "../utils/dayjs";
import { IoCloseCircleOutline } from "react-icons/io5";

const Day = ({ day }) => {
  const { cardsOnCalendar, setCardsOnCalendar, filterCardsOnCalendar } =
    useCards();

  const [filteredCards, setFilteredCards] = useState([]);
  const [openAllDayCards, setOpenAllDayCards] = useState(false);

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
      className="h-[140px] 3xl:h-[150px] relative border border-border rounded-xl"
    >
      {/* border-gray-200  */}
      <header className="flex flex-col items-center">
        <p
          className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass(day)}`}
        >
          {day.format("DD")}
        </p>
        <div className="w-full px-2">
          {filteredCards
            .filter((card) => dayjs(card.day).isSame(day))
            .slice(0, 3)
            .map((card) => (
              <CardOnCalendar key={card._id} card={card} />
            ))}
        </div>
        {filteredCards.filter((card) => dayjs(card.day).isSame(day)).length >
          3 && (
          <button
            onClick={() => setOpenAllDayCards(true)}
            className="underline text-xs uppercase font-semibold text-gray-600"
          >
            show more +
            {filteredCards.filter((card) => dayjs(card.day).isSame(day))
              .length - 3}
          </button>
        )}
      </header>
      {openAllDayCards && (
        <div className="absolute top-8 w-full bg-white z-10 py-2 pb-2 px-2 rounded-xl border border-black">
          <IoCloseCircleOutline className="ml-auto w-5 mb-2 cursor-pointer" onClick={() => setOpenAllDayCards(false)} />
          {filteredCards
            .filter((card) => dayjs(card.day).isSame(day))
            .map((card) => (
              <CardOnCalendar key={card._id} card={card} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Day;
