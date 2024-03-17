"use client";
import React, { useState } from "react";
import CardModal from "./CardModal";
import { IoCreateOutline } from "react-icons/io5";

const CreateButton = () => {
  const [showEventModal, setShowEventModal] = useState(false);

  return (
    <>
      <button
        className="w-11/12 flex gap-x-2 justify-center items-center border border-gray-400 text-gray-500 shadow-lg uppercase font-semibold rounded px-2 py-1"
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
