  import resizeInput from "js-modules/resizeInput.js";
  import getUserDate from "js-modules/getUserDate.js";
  import setCounter from "js-modules/./setCounter";
  
  //Input resize
  const tx = document.getElementsByTagName("textarea");
  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute(
      "style",
      "height:" + tx[i].scrollHeight + "px;overflow-y:_hidden;"
    );
    resizeInput(tx[i]);
  }

  //Tasks counter initialization
  const activeCounter = document.getElementById("active-counter");
  const doneCounter = document.getElementById("done-counter");
  setCounter(activeCounter, activeSection);
  setCounter(doneCounter, doneSection);

  //Timer button logic
  //TODO
  const onSelectEvent = function () {
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
  
  const timerButton = document.querySelector(".task-form__timer-button");
  const datePicker = document.querySelector(".date-picker");
  timerButton.onclick = () => {
    datePicker.classList.toggle("_hidden");
  };
  
// Themes
const colorIcon = document.querySelector(".theme-buttons__color-theme");
const langIcon = document.querySelector(".theme-buttons__goblin-theme");
const iconRef = colorIcon.children[0].children[0];
colorIcon.onclick = () => {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    iconRef.setAttribute(
      "xlink:href",
      "media/sprite.svg#to_light-theme_inactive"
    );
    colorIcon.classList.add("dark-theme");
  } else {
    iconRef.setAttribute(
      "xlink:href",
      "media/sprite.svg#to-dark-theme_inactive"
    );
    colorIcon.classList.remove("dark-theme");
  }
};

// Hover effects
colorIcon.onmouseover = () => {
  if (colorIcon.classList.contains("dark-theme")) {
    iconRef.setAttribute(
      "xlink:href",
      "media/sprite.svg#to_light-theme_active"
    );
  } else {
    iconRef.setAttribute("xlink:href", "media/sprite.svg#to_dark_theme");
  }
};

colorIcon.onmouseout = () => {
  if (colorIcon.classList.contains("dark-theme")) {
    iconRef.setAttribute(
      "xlink:href",
      "media/sprite.svg#to_light-theme_inactive"
    );
  } else {
    iconRef.setAttribute(
      "xlink:href",
      "media/sprite.svg#to-dark-theme_inactive"
    );
  }
};

const goblinRef = langIcon.children[1].children[0];
langIcon.onmouseover = () => {
  goblinRef.setAttribute("xlink:href", "media/sprite.svg#goblin-active");
};

langIcon.onmouseout = () => {
  goblinRef.setAttribute("xlink:href", "media/sprite.svg#goblin-inactive");
};

