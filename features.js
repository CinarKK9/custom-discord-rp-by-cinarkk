import { startOfDay, differenceInSeconds, getUnixTime } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

function localTime() {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date();
  
    const uloc = zonedTimeToUtc(now, timeZone);
  
    const dayTime = startOfDay(uloc);
  
    const midnUnix = differenceInSeconds(uloc, dayTime);
  
    const curUnix = getUnixTime(now);
  
    const res = curUnix - midnUnix;
  
    return res;
  }
export {localTime}