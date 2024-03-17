"use client"
import React, { useState } from 'react'
import { cardFilters, labelsClasses } from "../utils/constants";
import { AiOutlineCheck } from "react-icons/ai";
import { MdTitle } from "react-icons/md";
import { MdOutlineSubtitles } from "react-icons/md";
import { HiColorSwatch } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { CardService }from '../api/cards.service';
import { useCards } from '../context/CardContext';
import { useAuth } from '../context/AuthContext';
import AssignCardDropdown from './AssignCardDropdown';
import SectionFilterDropdown from './SectionFilterDropdown';

const CardModal = ({ setShowEventModal }) => {

  const { cards, setCards } = useCards();
  const { userLogged } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [section, setSection] = useState("");
  const [label, setLabel] = useState(labelsClasses)
  const isOnCalendar = false;

  const [assignedUsersId, setAssignedUsersId] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCard = {title, description, section, label, isOnCalendar, createdBy: userLogged.id, assignedUsers: assignedUsersId}
    try {
      const responseCard = await CardService.createCard(newCard);
      setCards([...cards, responseCard])
      setShowEventModal(false);
  } catch (error) {
    console.error('Error creating card:', error);
  }
  }
  
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-2xl w-1/4">
      <header className="bg-gray-100 px-3 py-2 flex justify-between items-center rounded-lg ">
        <div className="flex items-center gap-x-2 text-gray-400">
        <FaUser className='' />  <p>Created by: <span className='font-semibold text-blue-500'>{userLogged.username}</span></p>
        </div>
        <div>
          <button
            className="text-gray-400"
            onClick={() => setShowEventModal(false)}
          >
            <GrClose />
          </button>
        </div>
      </header>
      <div className="p-3">
        <div className="grid grid-cols-1/5 items-end gap-y-7">
          <div className="flex items-center gap-4 text-gray-400">
            <MdTitle />
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 text-gray-600 text-xl  pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <MdOutlineSubtitles />
            <input
              type="text"
              name="description"
              placeholder="Add description"
              value={description}
              required
              className="pt-3 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <SectionFilterDropdown section={section}  setSection={setSection}/>
          <div className="flex items-center gap-6 text-gray-400">
            <HiColorSwatch />
            <div className="flex gap-x-2 bg-white">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer text-white opacity-70`}
                >
                  {label === lblClass && <AiOutlineCheck />}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer className="flex justify-between gap-x-4 items-end border-t p-3 mt-5">
        <AssignCardDropdown assignedUsersId={assignedUsersId} setAssignedUsersId={setAssignedUsersId} />
        <button
          type="submit"
          className="bg-blue-500 h-10 hover:bg-blue-600 px-6 py-2 rounded text-white"
        >
          Save
        </button>
      </footer>
    </form>
  </div>
  )
}

export default CardModal