"use client";
import React, { useEffect, useRef, useState } from "react";
import { cardSection } from "../utils/constants";
import { TbNewSection } from "react-icons/tb";

const SectionFilterDropdown = ({ section, setSection }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleInputClick = () => {
    setShowDropdown(true);
  };

  const handleSectionSelect = (section) => {
    setShowDropdown(false);
    setSection(section);
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
    <div className="flex items-center gap-4 text-gray-400">
      <TbNewSection />
      <div className="relative w-full">
      <input
        type="text"
        onClick={handleInputClick}
        placeholder="Select section"
        value={section}
        readOnly
        className="w-full border-b-2  border-gray-200  h-10 focus:border-blue-500 focus:outline-none focus:ring-0 capitalize"
      />
      {showDropdown && (
        <ul ref={dropdownRef} className="absolute top-10 z-10 bg-white border border-gray-300 rounded-md w-full">
          {cardSection.map((section, index) => (
            <li
              key={index}
              onClick={() => handleSectionSelect(section)}
              className="cursor-pointer p-2 hover:bg-gray-100"
            >
              {section}
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
};

export default SectionFilterDropdown;
