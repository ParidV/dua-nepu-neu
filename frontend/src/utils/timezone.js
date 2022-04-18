import { formatInTimeZone } from "date-fns-tz";

export const currentDateTime = () => {
  return formatInTimeZone(new Date(), "Europe/Rome", "yyyy-MM-dd HH:mm:ss");
};
