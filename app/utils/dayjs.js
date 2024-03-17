import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day(); // Corregir para obtener el primer día del mes
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
}

export function getCurrentDayClass(day) {
  return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
    ? "bg-blue-600 text-white rounded-full w-7"
    : "";
}

export const week = ["Sunday", "Monday", "Tuesday ", "Wednesday", "Thursday", "Friday", "Saturday "]