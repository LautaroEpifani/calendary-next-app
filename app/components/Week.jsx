"use client";
import React, { useState } from "react";
import { week } from "../utils/dayjs";

const Week = () => {
  const [active, setActive] = useState("bg-pink-400");
  const [activeCalendarIndex, setActiveCalendarIndex] = useState(1);

  return (
    <div className="grid grid-rows-1 grid-cols-7 w-full border border-gray-200">
      {week.map((dia, index) => {
        return (
          <div key={index} className="border-x">
            <p className="text-gray-500 text-center ">{dia}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Week;
