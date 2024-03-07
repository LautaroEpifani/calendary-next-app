"use client"

const CardOriginal = () => {
  const card = { id: "1", title: "Tarea", day: " ", isOnCalendar: false};

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("card", JSON.stringify(card));
  };

  return (
    <div
      draggable="true"
      onDragStart={(e) => handleDragStart(e, card)}
      className="w-full mx-auto cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing text-center"
    >
      <p className="text-sm text-neutral-100">Tarea</p>
    </div>
  );
};

export default CardOriginal;
