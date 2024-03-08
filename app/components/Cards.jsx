"use client"
import { useCards } from "../context/CardContext";

const Cards = () => {
  
  const { cards } = useCards();

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("card", JSON.stringify(card));
  };

  return (
    <div className="w-11/12">
      {cards.map((card, index) => (
        <div
          key={card._id}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, card)}
          className={`cursor-grab rounded bg-${card.label}-500 p-3 active:cursor-grabbing text-center mb-2 opacity-85`}
        >
          <p className="text-sm uppercase font-bold text-neutral-100">{card.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Cards;