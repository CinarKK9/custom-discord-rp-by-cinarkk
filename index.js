import { localTime } from "./features.js";
import { Client } from "discord-rpc";
import * as config from "./config.json";
const rpc = new Client({ transport: "ipc" });

const clientID = "1046835322899664998"; //you should create an app from https://discord.com/developers/applications
rpc.login({ clientId: clientID });
// THE NAME OF YOUR APPLICATION WILL SHOW AS 'Playing APP_NAME' under your name when this app is working
// THIS APP DOESN'T WORK WITHOUT CLIENT ID

rpc.on("ready", () => {
  try {
    // this doesnt effect discord just writes name to console.
    console.log(`
        /$$$$$$  /$$$$$$ / $$   /$$  /$$$$$$  /$$$$$$$ 
        /$$__  $$|_  $$_/| $$$ | $$ /$$__  $$| $$__  $$
      | $$  \\__/  | $$  | $$$$| $$| $$  \\ $$| $$  \\ $$
      | $$         | $$  | $$ $$ $$| $$$$$$$$| $$$$$$$/
      | $$         | $$  | $$  $$$$| $$__  $$| $$__  $$
      | $$    $$   | $$  | $$\\ $$$| $$  | $$| $$  \\ $$
      |  $$$$$$/ /$$$$$$| $$ \\  $$| $$  | $$| $$  | $$
        \\______/ |______/|__/ \\__/|__/  |__/|__/  |__/ 
      `);
    rpc.setActivity({
      state: config.state, // will show on the first line of custom activity
      details: config.details, // will show on the second line of custom activity
      startTimestamp: localTime(), // WRITE 'localTime()' instead of 'new Date()' to display your local time. use this if you want to make 00:00 elapsed
      // endTimestamp: "TIMESTAMP_HERE",
      /* uncomment the line above if you want to make 00:00 left (this should be unix time) convert here https://www.unixtimestamp.com
       * YOU CANT USE START TIMESTAMP AND END TIMESTAMP AT THE SAME TIME SO COMMENT OUT THE ONE YOU DONT USE
       */
      largeImageKey: config.largeImageKey,
      largeImageText: config.largeImageText,
      // smallImageKey: config.smallImageKey, // this is a little circle image located at the bottom right of large image
      // smallImageText: "TEXT_WHEN_YOU_HOVER_OVER_SMALL_IMAGE", //COMMENT OUT smallImageKey and smallImageText if you dont wanna use
      instance: config.instance, // this is a weird feature so you can make it true or false
      buttons: [
        {
          label: config.buttons[0].label,
          url: config.buttons[0].url,
        },
        {
          label: config.buttons[1].label,
          url: config.buttons[1].url,
        }, // YOU CAN COMMENT OUT BUTTONS IF YOU DONT WANT TO USE. OR YOU CAN USE ONE BUTTON ONLY TOO
      ],
    });
  } catch (error) {
    console.error("Error Making Custom Status", error);
  }
});
