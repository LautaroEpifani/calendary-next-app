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
import { useUsers } from "./context/UserContext";

export default function Home() {
  const { setUserLogged } = useAuth();
  const { showCardButtons } = useCards();
  const { theme } = useUsers();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const storedToken = localStorage.getItem("jwtToken");
        if (storedToken) {
          const { token } = JSON.parse(storedToken);
          const response = await fetch(
            "http://ec2-18-201-224-116.eu-west-1.compute.amazonaws.com:3001/auth/userLogged",
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
              setIsLoggedIn(false);
              setUserLogged({});
            }
          } else {
            const userAuth = await response.json();
            setIsLoggedIn(true);
            setUserLogged(userAuth);
          }
        }
      } catch (error) {
        console.error("Error checking user logged in:", error);
      }
      setLoading(false);
    };
    checkLoggedIn();
  }, [isLoggedIn]);

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
    setUserLogged({});
  };

  return (
    <main className={`h-screen px-20 bg-background ${theme} `}>
      {isLoggedIn ? (
        <>
          <div className="">
            <CalendarHeader logout={logout} />
          </div>
          <div className="flex h-[80%]">
            <div className="w-1/5  border-y border-l border-border ">
            {/* border-gray-200 */}
              <Squad />
              <div className="mt-8">
                <h1 className="w-full text-center py-2 mb-4 border-y border-border uppercase font-bold text-gray-500">
                  {/* border-gray-200 */}
                  Cards
                </h1>
                <div className="flex flex-col justify-start items-center gap-y-4">
                  <Cards />
                  <CreateButton />
                 
                    <div className="w-11/12 flex flex-col gap-y-2">
                      <CardProperties showCardButtons={showCardButtons} />
                      {showCardButtons && <DeleteCard />}
                    </div>
                
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
        <div className="pt-16">
        <LoginForm
          setIsLoggedIn={setIsLoggedIn}
          isLoading={isLoading}
          setLoading={setLoading}
        />
        </div>
      )}
    </main>
  );
}
