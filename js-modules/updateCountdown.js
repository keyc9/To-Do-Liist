import getUserDate from "./getUserDate.js";

const updateCountdown = (userDate, task, showDate, showDateText, showDateSticker) => {
  const innitialDate = new Date(userDate);

    const currentDate = new Date();
    let delta = (innitialDate - currentDate) / 1000;


    if (delta < 0) {
      const timerEndMessage = "Время выполнения задачи вышло, закончи её скорее!";

      showDateText.innerHTML = timerEndMessage;
      showDateSticker.children[0].setAttribute(
        "xlink:href",
        "media/stickers-sprite.svg#deadline"
      );
      showDate.classList.replace("__notifs_time", "__notifs_failure");
      showDateText.remove();
    } else {
      let days = Math.floor(delta / 86400);
      delta -= days * 86400;

      let months = Math.floor(days / 31);
      days -= months * 31;

      let hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;

      let minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;

      let seconds = Math.round(delta % 60);

      if (months <= 0) {
        if (days <= 0) {
          if (hours <= 0) {
            if (seconds <= 0 && minutes <= 0) {
              showDateText.innerHTML = timerEndMessage;
              const settingsButton = task.querySelector(
                ".active-section__settings-button"
              );
              const deleteBtnTemplate = `<button class="active-section__delete-button">
<svg class="__icon ">
   <use xlink:href="media/sprite.svg#delete"></use>
</svg>
</button>`;
              settingsButton.insertAdjacentHTML(
                "beforebegin",
                deleteBtnTemplate
              );
              settingsButton.remove();
            } else {
              showDateText.innerHTML = `${minutes + 1} мин.`;
            }
          } else {
            showDateText.innerHTML = `${
              hours + Math.floor(minutes / 60)
            } ч. ${minutes + 1} мин.`;
          }
        } else {
          showDateText.innerHTML = `${days} д. ${
            hours + Math.floor(minutes / 60)
          } ч. ${minutes + 1} мин.`;
        }
      } else {
        showDateText.innerHTML = `${months} мес. ${days} д. ${
          hours + Math.floor(minutes / 60)
        } ч. ${minutes + 1} мин.`;
      }
    }
  };

export default updateCountdown;