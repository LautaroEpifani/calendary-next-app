"use client"
import React from "react";
import { getMonth } from "../utils/dayjs";
import Day from "./Day";

const Month = () => {
  const month = getMonth();

  return (
      <div className="h-[96%] flex-grow grid grid-cols-7 grid-rows-5 border-x border-b border-gray-200">
        {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, index) => (
              <Day key={index} day={day} rowIdx={i} />
            ))}
          </React.Fragment>
        ))}
      </div>
  );
};

export default Month;
