  import resizeInput from "./resizeInput.js";
  import getUserDate from "./getUserDate.js";
  import setCounter from "./setCounter.js";
  
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
  const activeSection = document.querySelector(".active-section");
  const activeCounter = document.getElementById("active-counter");
  const doneSection = document.querySelector(".done-tasks_section");
  const doneCounter = document.getElementById("done-counter");
  setCounter(activeCounter, activeSection);
  setCounter(doneCounter, doneSection);

  const datePicker = document.querySelector(".date-picker");
  const timerButton = document.querySelector(".task-form__timer-button");
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

