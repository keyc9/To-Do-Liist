import updateCountdown from "./updateCountdown.js";

export function interval(
  userDate,
  task,
  showDate,
  showDateText,
  showDateSticker
) {
  setInterval(
    updateCountdown,
    1000,
    userDate,
    task,
    showDate,
    showDateText,
    showDateSticker
  );
  console.log("interval in innerfunc")
}

export function stopInterval() {
    console.log("stopinterval")
  clearInterval(interval);
}
