"use client";
import React, { useEffect, useRef, useState } from "react";
import { useUsers } from "../context/UserContext";

const AssignCardDropdown = ({ assignedUsersId, setAssignedUsersId }) => {

  const { users } = useUsers();

  const [showDropdown, setShowDropdown] = useState(false);
  const [assignedUsersName, setAssignedUsersName] = useState([]);
  const dropdownRef = useRef(null);

  const handleInputClick = () => {
    setShowDropdown(true);
  };

  const handleUserSelect = (user) => {
    if (!assignedUsersId.includes(user._id)) {
      setAssignedUsersId([...assignedUsersId, user._id]);
      setAssignedUsersName([...assignedUsersName, user.username]);
    }
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div >
        <div className="flex gap-x-2 mb-1 ">
          <h1 className="text-gray-500">Assigned to:</h1>
          <div className="flex flex-wrap items-center gap-1 text-xs ">
            {assignedUsersName.map((username, index) => (
              <div key={index}  className="bg-neutral-300 rounded p-1">
                <h1 className="text-black">{username}</h1>
              </div>
            ))}
          </div>
        </div>
        <div  className="relative ">
        <input
          type="text"
          onClick={handleInputClick}
          placeholder="@"
          className="border border-gray-300 p-2 rounded-md h-10 focus:border-blue-500 focus:outline-none focus:ring-0"
        />
        {showDropdown && (
          <ul ref={dropdownRef} className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full">
            {users.map((user) => (
              <li
                key={user._id}
                onClick={() => handleUserSelect(user)}
                className="cursor-pointer p-2 hover:bg-gray-100"
              >
                {user.username}
              </li>
            ))}
          </ul>
        )}
        </div>
    </div>
  );
};

export default AssignCardDropdown;
