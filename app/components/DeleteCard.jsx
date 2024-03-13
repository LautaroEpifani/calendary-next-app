"use client";
import React, { useState } from "react";
import { FaFire } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { useCards } from "../context/CardContext";
import { CardService } from "../api/cards.service";

const DeleteCard = () => {
  const { setCards, setCardsOnCalendar } = useCards();

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    const cardTransfer = e.dataTransfer.getData("card");
    const card = JSON.parse(cardTransfer);
    await CardService.deleteCard(card._id);
    if (!card.isOnCalendar) {
      setCards((pv) => pv.filter((cardSearch) => cardSearch._id !== card._id));
    } else {
      setCardsOnCalendar((pv) =>
        pv.filter((cardSearch) => cardSearch._id !== card._id)
      );
    }
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="w-11/12 flex gap-x-2 justify-center items-center border border-red-400 text-red-500 uppercase font-semibold rounded px-2 py-1"
    >
      {" "}
      <span>Drop card</span>
      <FiTrash className="w-5 h-5" />
    </div>
  );
};

export default DeleteCard;
