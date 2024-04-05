"use client";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";
import { useCards } from "../context/CardContext";
import { useUsers } from "../context/UserContext";

export default function CalendarHeader({ logout }) {
  const { setFilterCardsOnCalendar } = useCards();
  const { setTheme, theme } = useUsers();

  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [activeFilter, setActiveFilter] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const setFilter = (filter) => {
    setActiveFilter(filter);
    setFilterCardsOnCalendar(filter);
  };

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <header className="">
    <div className="pt-4 flex">
      <div className="w-1/5"></div>
      <div className="w-full flex justify-between h-full ">
        <div className="flex items-center ">
          <div className="relative">
            <Image
              src={"/icon.svg"}
              width={70}
              height={70}
              quality={1}
              alt="icon"
            />
            <h1 className="absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 text-gray-500 font-bold rounded-full">
              {dayjs().date()}
            </h1>
          </div>
          <h1 className="mr-6 ml-2 text-xl text-gray-500 fond-bold">
            Schedule
          </h1>
          <h2 className="text-xl text-gray-500 font-bold capitalize">
            {dayjs(new Date(dayjs().locale("en").year(), monthIndex)).format(
              "MMMM YYYY"
            )}
          </h2>
        </div>
        <div className="flex flex-col justify-between items-end">
          <div className="flex items-center gap-x-4 mt-2">
            <div className="flex items-center gap-x-2 py-1 px-2 border border-gray-400 rounded">
              <h1 className="capitalize text-text">{theme}</h1>
              <input
                type="checkbox"
                className="toggle text-gray-300 border-gray-500"
                checked={isChecked}
                onChange={toggleSwitch}
              />
            </div>
            <button
              onClick={() => {
                logout();
                setTheme("light");
              }}
              className="text-red-500 py-1 px-6 border border-gray-400 rounded"
            >
              Logout
            </button>
          </div>
         
        </div>
      </div>
      
    </div>
     <div className="flex justify-end pr-10 ">
     <ul className="flex text-xl text-white font-bold">
       <li
         onClick={() => setFilter(null)}
         className={` bg-section1 rounded-t py-1 px-4 cursor-pointer ${
           activeFilter === null ? "scale-110 mb-0.5" : ""
         }`}
       >
         Calendar
       </li>
       <li
         onClick={() => setFilter("cleaning")}
         className={` bg-section2 rounded-t py-1 px-4 cursor-pointer ${
           activeFilter === "cleaning" ? "scale-110 mb-0.5" : ""
         }`}
       >
         Cleaning
       </li>
       <li
         onClick={() => setFilter("activities")}
         className={` bg-section3 rounded-t py-1 px-4 cursor-pointer ${
           activeFilter === "activities" ? "scale-110 mb-0.5" : ""
         }`}
       >
         Activities
       </li>
       <li
         onClick={() => setFilter("list")}
         className={` bg-section4  rounded-t py-1 px-4 cursor-pointer ${
           activeFilter === "list" ? "scale-110 mb-0.5" : ""
         }`}
       >
         List
       </li>
     </ul>
   </div>
   </header>
  );
}
