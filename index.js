import { startOfDay, differenceInSeconds, getUnixTime } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

const discord = require("discord-rpc");
const rpc = new discord.Client({ transport: "ipc" });

const clientID = "CLIENT_ID_HERE"; //you should create an app from https://discord.com/developers/applications
rpc.login({ clientId: clientID });
// THE NAME OF YOUR APPLICATION WILL SHOW AS 'Playing APP_NAME' under your name when this app is working
// THIS APP DOESN'T WORK WITHOUT CLIENT ID

//this gets your local time
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

rpc.on("ready", () => {
  try {
    // this doesnt effect discord just writes name to console.
    console.log(`
        /$$$$$$  /$$$$$$ /$$   /$$  /$$$$$$  /$$$$$$$ 
        /$$__  $$|_  $$_/| $$$ | $$ /$$__  $$| $$__  $$
      | $$  \\__/  | $$  | $$$$| $$| $$  \\ $$| $$  \\ $$
      | $$        | $$  | $$ $$ $$| $$$$$$$$| $$$$$$$/
      | $$        | $$  | $$  $$$$| $$__  $$| $$__  $$
      | $$    $$  | $$  | $$\\  $$$| $$  | $$| $$  \\ $$
      |  $$$$$$/ /$$$$$$| $$ \\  $$| $$  | $$| $$  | $$
        \\______/ |______/|__/  \\__/|__/  |__/|__/  |__/ 
      `); 
    rpc.setActivity({
      state: "STATE_HERE", // will show on the first line of custom activity
      details: "DETAILS_HERE", // will show on the second line of custom activity
      startTimestamp: new Date(), // WRITE 'localTime()' instead of 'new Date()' to display your local time. use this if you want to make 00:00 elapsed
      // endTimestamp: "TIMESTAMP_HERE",
      /* uncomment the line above if you want to make 00:00 left (this should be unix time) convert here https://www.unixtimestamp.com
       * YOU CANT USE START TIMESTAMP AND END TIMESTAMP AT THE SAME TIME SO COMMENT OUT THE ONE YOU DONT USE
       */
      largeImageKey: "IMAGE_OR_GIF_LINK_HERE",
      largeImageText: "TEXT_WHEN_YOU_HOVER_OVER_LARGE_IMAGE",
      smallImageKey: "IMAGE_LINK_HERE", // this is a little circle image located at the bottom right of large image
      smallImageText: "TEXT_WHEN_YOU_HOVER_OVER_SMALL_IMAGE",
      instance: true, // this is a weird feature so you can make it true or false
      buttons: [
        {
          label: "BUTTON_TEXT_HERE",
          url: "https://LINK_HERE",
        },
        {
          label: "BUTTON_TEXT_HERE",
          url: "https://LINK_HERE",
        }, // YOU CAN COMMENT OUT BUTTONS IF YOU DONT WANT TO USE. OR YOU CAN USE ONE BUTTON ONLY TOO
      ],
    });
  } catch (error) {
    console.error("Error Making Custom Status", error);
  }
});
