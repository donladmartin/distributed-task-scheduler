import { DateTime } from "luxon";

export const formatDate = (dateString: string): string => {
  const date = DateTime.fromISO(dateString, { zone: "utc" });
  const localDate = date.toLocal();
  return localDate.toLocaleString(DateTime.DATETIME_MED);
};
