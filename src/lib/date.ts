import { ru } from "date-fns/locale";
import { formatInTimeZone } from "date-fns-tz";

export const formatDateTime = (date: string | Date | number) => {
  return {
    dateAndTime: formatInTimeZone(date, "Europe/Moscow", "HH:mm dd.MM.yy", {
      locale: ru,
    }),
    time: formatInTimeZone(date, "Europe/Moscow", "HH:mm", {
      locale: ru,
    }),
    date: formatInTimeZone(date, "Europe/Moscow", "dd.MM.yy", {
      locale: ru,
    }),
  };
};
