"use client";
import React, { useState } from "react";
import CardModal from "./CardModal";
import { IoCreateOutline } from "react-icons/io5";

const CreateButton = () => {
  const [showEventModal, setShowEventModal] = useState(false);

  return (
    <>
      <button
        className="flex gap-x-2 items-center border border-gray-400 text-gray-500 uppercase font-semibold rounded-lg px-2 py-1"
        onClick={() => setShowEventModal(true)}
      >
        <span>Create card</span>
        <IoCreateOutline className="text-gray-600 w-5 h-5" />
      </button>
      {showEventModal && <CardModal setShowEventModal={setShowEventModal} />}
    </>
  );
};

export default CreateButton;
