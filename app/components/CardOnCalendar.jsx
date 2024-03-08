"use client";

import { motion } from "framer-motion";

const CardOnCalendar = ({ card }) => {
  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("card", JSON.stringify(card));
  };

  return (
    <motion.div
      layout
      layoutId={card._id}
      draggable="true"
      onDragStart={(e) => handleDragStart(e, card)}
      className={`w-full mx-auto cursor-grab rounded bg-${card.label}-500 py-1 active:cursor-grabbing text-center mb-1 opacity-90 uppercase font-semibold`}
    >
      <p className="text-sm text-neutral-100">{card.title}</p>
    </motion.div>
  );
};

export default CardOnCalendar;