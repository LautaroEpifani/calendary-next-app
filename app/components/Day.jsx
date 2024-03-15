"use client";
import dayjs from "dayjs";
import CardOnCalendar from "./CardOnCalendar";
import { useCards } from "../context/CardContext";
import { CardService } from "../api/cards.service";

const Day = ({ day }) => {
  const { cardsOnCalendar, setCardsOnCalendar } = useCards();

  const handleDrop = async (e) => {
    e.preventDefault();
    const cardTransfer = e.dataTransfer.getData("card");
    if (cardTransfer) {
      const card = JSON.parse(cardTransfer);
      if (card.isOnCalendar) {
        const dayjsToISOString = day.toISOString();
        const updatedCard = await CardService.updateCard(card._id, { day: dayjsToISOString });
        const cardsUpdated = cardsOnCalendar.map((cardToUpdate) =>
          cardToUpdate._id === card._id ? updatedCard : cardToUpdate
        );
        setCardsOnCalendar(cardsUpdated);
      } else {
        const dayjsToISOString = day.toISOString();
        const { _id, ...newCardWithoutId } = card;
        const newCard = { ...newCardWithoutId, day: dayjsToISOString , isOnCalendar: true};
        const cardResponse = await CardService.createCard(newCard);
        const updatedCards = [...cardsOnCalendar, cardResponse];
        setCardsOnCalendar(updatedCards);
      }
    }
  };

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border border-gray-200 rounded-xl"
    >
      <header className="flex flex-col items-center">
        <p className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
        <div className="w-full px-2">
          {cardsOnCalendar
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
