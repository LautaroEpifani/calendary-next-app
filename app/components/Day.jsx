"use client";
import dayjs from "dayjs";
import CardOnCalendar from "./CardOnCalendar";
import { useCards } from "../context/CardContext";

const Day = ({ day }) => {
  const { cardsOnCalendar, setCardsOnCalendar } = useCards();

  const handleDrop = (e) => {
    e.preventDefault();
    const cardTransfer = e.dataTransfer.getData("card");
    if (cardTransfer) {
      const card = JSON.parse(cardTransfer);
      if (card.isOnCalendar) {
        const cardsUpdated = cardsOnCalendar.map((cardArg) =>
          cardArg.id === card.id ? { ...cardArg, day } : cardArg
        );
        setCardsOnCalendar(cardsUpdated);
      } else {
        card.day = day;
        const updatedCards = [...cardsOnCalendar, card];
        setCardsOnCalendar(updatedCards);
      }

      card.isOnCalendar = true;
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
        <div className="mt-2">
          {cardsOnCalendar
            .filter((card) => card.day === day)
            .map((card) => (
              <CardOnCalendar key={card.id} card={card} />
            ))}
        </div>
      </header>
    </div>
  );
};

export default Day;
