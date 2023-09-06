import getUserDate from "./getUserDate.js";

const onSelectTimer = () => {
    const timerButton = document.querySelector(".task-form__timer-button");
    console.log("timer button")
    const dateInput = document.getElementById("airdatepicker");
    const timerIcon = timerButton.children[0].children[0];
    let inputValue = dateInput.value;
    let dateNow = new Date();
    if (inputValue != "") {
      if (getUserDate(inputValue) - dateNow > 60000) {
        timerIcon.setAttribute("xlink:href", "media/sprite.svg#timer-active");
      } else {
        timerIcon.setAttribute("xlink:href", "media/sprite.svg#timer-inactive");
      }
    } else {
      timerIcon.setAttribute("xlink:href", "media/sprite.svg#timer-inactive");
    }
  };
  

  export default onSelectTimer