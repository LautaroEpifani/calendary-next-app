import Month from "./components/Month";
import CalendarHeader from "./components/CalendarHeader";
import Cards from "./components/Cards";
import Week from "./components/Week";
import CreateButton from "./components/CreateButton";

export default function Home() {
  return (
    <main className="h-screen px-20">
      <div className="h-[10%]">
        <CalendarHeader />
      </div>
      <div className="flex h-[80%]">
        <div className="w-1/6 flex flex-col justify-start items-center gap-y-10 pt-10  border border-gray-200">
          <h1 className="border-b border-gray-200 w-full text-center">Cards</h1>
          <Cards />
          <CreateButton />
        </div>
        <div className="w-full h-full">
          <Week />
          <Month />
        </div>
      </div>
    </main>
  );
}
