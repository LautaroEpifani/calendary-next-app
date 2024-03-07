"use client";
import React, { useState } from "react";
import CardModal from "./CardModal";

const CreateButton = () => {
  const [showEventModal, setShowEventModal] = useState(false);

  return (
    <>
      <button
        className="border border-gray-500 rounded-lg px-2 py-1"
        onClick={() => setShowEventModal(true)}
      >
        Create Card
      </button>
      {showEventModal && <CardModal setShowEventModal={setShowEventModal} />}
    </>
  );
};

export default CreateButton;
