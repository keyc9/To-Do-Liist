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
}

export function stopInterval() {
  clearInterval(interval);
}
