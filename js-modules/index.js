import getUserDate from "./getUserDate.js";
import addTask from "./addTask.js";
import changeLang from "./changeLang.js";
import manageTabs from "./manageTabs.js";
import manageTasks from "./manageTasks.js";
import resizeText from "./resizeText.js";
import onSelectTimer from "./onSelectTimer.js";

resizeText();
changeLang();
manageTabs();

new AirDatepicker("#airdatepicker", {
    inline: true,
    selectedDates: [new Date()],
    isMobile: true,
    autoClose: true,
    timepicker: true,
    buttons: ["today", "clear"],
    keyboardNav: true,
    minDate: new Date(),
    onSelect: onSelectTimer,
  });
  
  getUserDate();
  manageTasks();
  addTask();
