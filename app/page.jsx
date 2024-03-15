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
import { useAuth } from "./context/AuthContext";
import CardProperties from "./components/CardProperties";
import { useCards } from "./context/CardContext";

export default function Home() {
  const { setUserLogged } = useAuth();
  const { showCardButtons } = useCards();

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const storedToken = localStorage.getItem("jwtToken");
        if (storedToken) {
          const { token } = JSON.parse(storedToken);
          const response = await fetch(
            "http://localhost:3001/auth/userLogged",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            if (response.status === 401) {
              localStorage.removeItem("jwtToken");
              setLoggedIn(false);
              setUserLogged({});
            }
          } else {
            const userAuth = await response.json();
            setLoggedIn(true);
            setUserLogged(userAuth);
          }
        }
      } catch (error) {
        console.error("Error checking user logged in:", error);
      }
      setLoading(false);
    };
    checkLoggedIn();
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
                  {showCardButtons && (
                    <div className="w-11/12 flex flex-col gap-y-2">
                      <CardProperties />
                      <DeleteCard />
                    </div>
                  )}
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
        <LoginForm
          setLoggedIn={setLoggedIn}
          isLoading={isLoading}
          setLoading={setLoading}
        />
      )}
    </main>
  );
}
