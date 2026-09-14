import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (date: string) => {
<<<<<<< HEAD
  return dayjs.utc(date).tz("Asia/Tokyo").format("YYYY.MM.DD");
=======
  return dayjs.utc(date).tz("Asia/Tokyo").format("YYYY/MM/dd");
>>>>>>> 40c3be1403b976f1fb3415aeb900f6c88a98bf4a
};
