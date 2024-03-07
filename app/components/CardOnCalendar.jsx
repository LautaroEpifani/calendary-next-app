"use client";

import { motion } from "framer-motion";

const CardOnCalendar = ({ card }) => {
  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("card", JSON.stringify(card));
  };

  return (
    <motion.div
      layout
      layoutId={card.id}
      draggable="true"
      onDragStart={(e) => handleDragStart(e, card)}
      className="w-20 cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
    >
      <p className="text-sm text-neutral-100">{card.title}</p>
    </motion.div>
  );
};

export default CardOnCalendar;
