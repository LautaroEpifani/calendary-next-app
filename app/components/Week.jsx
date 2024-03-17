"use client";
import React, { useState } from "react";
import { week } from "../utils/dayjs";

const Week = () => {

  return (
    <div className="h-[4%] grid grid-rows-1 grid-cols-7 w-full border border-border">
      {/* border-gray-200 */}
      {week.map((dia, index) => {
        return (
          <div key={index} className="border-x rounded-md border-border">
             {/* border-gray-200 */}
            <p className="text-gray-500 text-center ">{dia}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Week;
