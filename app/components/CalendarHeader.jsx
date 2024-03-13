"use client";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";

export default function CalendarHeader() {

  const [monthIndex, setMonthIndex] = useState(dayjs().month());

  return (
    <header className="h-full pr-4 flex">
      <div className="w-1/5">

      </div>
      <div className="w-full flex justify-between h-full ">
        <div className="flex items-center ">
          <Image
            src={"/icon.png"}
            width={40}
            height={40}
            quality={1}
            alt="icon"
          />

          <h1 className="mr-6 ml-2 text-xl text-gray-500 fond-bold">
            Schedule
          </h1>
          <h2 className="text-xl text-gray-500 font-bold capitalize">
            {dayjs(new Date(dayjs().locale("en").year(), monthIndex)).format(
              "MMMM YYYY"
            )}
          </h2>
        </div>
        <div className=" flex items-end">
          <ul className="flex text-xl text-white font-bold">
            <li className="bg-pink-400 rounded-t  py-1 px-4 cursor-pointer">
              Calendar
            </li>
            <li className="bg-yellow-300 rounded-t py-1 px-4 cursor-pointer">
              Cleaning
            </li>
            <li className="bg-green-400 rounded-t py-1 px-4 cursor-pointer">
              Activities
            </li>
            <li className="bg-red-400 rounded-t py-1 px-4 cursor-pointer">
              List
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
