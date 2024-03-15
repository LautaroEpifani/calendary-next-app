"use client";
import React, { useEffect, useState } from "react";

const SectionFilterDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputClick = () => {
    setShowDropdown(true);
  };

  const handleUserSelect = (user) => {
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center gap-4 text-gray-400">
      <MdOutlineSubtitles />
      <input
        type="text"
        onClick={handleInputClick}
        placeholder="Select section"
        className="border border-gray-300 p-2 rounded-md h-10 focus:border-gray-500 focus:outline-none focus:ring-0"
      />
      {showDropdown && (
        <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full">
          {cardFilters.map((filter, index) => (
            <li
              key={index}
              onClick={() => handleFilterSelect(filter)}
              className="cursor-pointer p-2 hover:bg-gray-100"
            >
              {filter}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SectionFilterDropdown;
