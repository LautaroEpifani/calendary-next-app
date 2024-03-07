import Month from "./components/Month";
import CalendarHeader from "./components/CalendarHeader";
import CardOriginal from "./components/CardOriginal";
import Week from "./components/Week";
import CreateButton from "./components/CreateButton";

export default function Home() {
  return (
    
    <main className="flex h-screen px-20">
      <div className="w-1/6 flex flex-col justify-start items-center gap-y-10 pt-20 px-4">
        <h1>Cards</h1>
        <CreateButton />
        <CardOriginal />
      </div>
      <div className="w-full">
        <div className="h-[10%]">
        <CalendarHeader />
        </div>
        <div className="h-[86%]">
          <Week />
          <Month />
        </div>
      </div>
    </main>
  );
}
