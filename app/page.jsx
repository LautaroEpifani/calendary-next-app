"use client";
import Month from "./components/Month";
import CalendarHeader from "./components/CalendarHeader";
import Cards from "./components/Cards";
import Week from "./components/Week";
import CreateButton from "./components/CreateButton";
import Squad from "./components/Squad";
import DeleteCard from "./components/DeleteCard";
import LoginForm from "./components/LoginForm";
import { useEffect, useState } from "react";

export default function Home() {

  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <main className="h-screen px-20">
      {isLoggedIn ? ( 
      <>
      <div className="h-[10%]">
        <CalendarHeader />
      </div>
      <div className="flex h-[80%]">
        <div className="w-1/5  border border-gray-200">
          <Squad />
          <div className="mt-8">
            <h1 className="w-full text-center py-2 mb-4 border-y border-gray-200 uppercase font-bold text-gray-500">
              Cards
            </h1>
            <div className="flex flex-col justify-start items-center gap-y-4">
              <Cards />
              <CreateButton />
              <DeleteCard />
            </div>
          </div>
        </div>
        <div className="w-full h-full">
          <Week />
          <Month />
        </div>
      </div> 
      </>
      ) : (
        <LoginForm setLoggedIn={setLoggedIn} />
      )}
    </main>
  );
}
