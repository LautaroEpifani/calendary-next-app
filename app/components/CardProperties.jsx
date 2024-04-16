"use client";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { MdOutlineReadMore, MdOutlineSubtitles, MdTitle } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

const CardProperties = ({ showCardButtons }) => {
  const [cardProperties, setCardProperties] = useState({});
  const [openPropertiesModal, setOpenPropertiesModal] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    const cardTransfer = e.dataTransfer.getData("card");
    const card = JSON.parse(cardTransfer);
    setCardProperties(card);
    setOpenPropertiesModal(true);
  };

  return (
    <>
      {showCardButtons && (
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="flex gap-x-2 justify-center items-center border border-blue-800 text-blue-800 shadow-md uppercase font-semibold rounded px-2 py-1"
        >
          {" "}
          <span>Card Properties</span>
          <MdOutlineReadMore className="w-5 h-5" />
        </div>
      )}

      {openPropertiesModal && (
        <div className="h-screen w-full fixed z-20 left-0 top-0 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-2xl w-1/4">
            <header className="bg-gray-100 px-3 py-2 flex justify-between items-center rounded-t-lg">
              <div className="flex items-center gap-x-4 text-gray-500">
                <FaUser className="" />{" "}
                <p>
                  Created by:{" "}
                  <span className="font-semibold text-blue-500">
                    {cardProperties.createdByUsername}
                  </span>
                </p>
              </div>
              <div>
                <button
                  className="text-gray-400"
                  onClick={() => setOpenPropertiesModal(false)}
                >
                  <GrClose />
                </button>
              </div>
            </header>
            <div className="p-3">
              <div className="grid grid-cols-1/5 items-end gap-y-7">
                <div className="flex items-center gap-4 text-gray-500">
                  <MdTitle className="" />
                  <p className="">
                    Title:{" "}
                    <span className="font-semibold text-green-700">
                      {cardProperties.title}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-4 text-gray-500">
                  <MdOutlineSubtitles className="" />
                  <p>
                    Description:{" "}
                    <span className="font-semibold text-green-700 text-sm">
                      {cardProperties.description}
                    </span>
                  </p>
                </div>
                <div className="flex gap-x-2 items-center text-gray-500">
                  <div className="flex items-center gap-x-4">
                    <FaUsers className="" />
                    Assigned to:{" "}
                  </div>
                  {cardProperties.assignedUsersName ? (
                    cardProperties.assignedUsersName.map((card, index) => (
                      <h1 key={index} className="text-green-700 font-semibold">
                        {card}
                      </h1>
                    ))
                  ) : (
                    <h1></h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardProperties;
