import resizeInput from "./resizeInput.js";
import getUserDate from "./getUserDate.js";
import setCounter from "./setCounter.js";
import toggleEmptyListMessage from "./toggleEmptyListMessage.js";
import updateCountdown from "./updateCountdown.js";

const addTask = () => { 
  const newItemForm = document.querySelector(".task-form");

  newItemForm.addEventListener("submit", function (e) {
    e.preventDefault();
  const importantCheckbox = document.querySelector(
    ".task-form__important-button"
  );
  const newItemTitle = newItemForm.querySelector(".task-form__input");
    const taskTemplate = document
      .querySelector("#task-template")
      .content.querySelector(".__list-item");

    const taskText = newItemTitle.value;
    const task = taskTemplate.cloneNode(true);
    const taskDescription = task.querySelector("textarea");
    taskDescription.value = taskText;
    //Проверка на повторы задач
    const list = document.querySelector(".__todo-list");
    const tasksArray = Array.from(list.children).map(
      (child) => child.children[0].children[3].children[0].value
    );
    const arrayCheck = tasksArray.includes(taskText);

    newItemTitle.addEventListener("change", () => {});
    const existedTask = document.querySelector(".__notifs__task-exists");
    if (arrayCheck == true) {
      existedTask.classList.remove("_hidden");
    } else if (newItemTitle.value == "") {
      // убрать когда строка очищена
      existedTask.classList.add("_hidden");
    } else {
      existedTask.classList.add("_hidden");

      // Таймер
      const dateInput = document.getElementById("airdatepicker");
      let inputValue = dateInput.value;
      let dateNow = new Date();
      const showDate = task.querySelector(".__notifs_countdown");
      const showDateText = showDate.children[1];
      const showDateSticker = showDate.children[0];

      if (inputValue != "") {
        const userDate = getUserDate(inputValue);
        if (userDate - dateNow > 60000 && inputValue != userDate) {  

          let interval = setInterval(updateCountdown, 1000, userDate, task, showDate, showDateText, showDateSticker); 

          console.log("interval set")
          task.querySelector(".active-section__settings-button").style.color =
            "transparent";
        } else {
          task.querySelector(".__notifs_countdown").classList.add("_hidden");
        }
      } else {
        task.querySelector(".__notifs_countdown").classList.add("_hidden");
      }
      //Добавление важной задачи

      let insertPlace;
      const activeList = () => {
        const activeSection = document.querySelector(".active-section");
        const arr = activeSection.children[1].children;
        for (let i = 0; i < arr.length; i++) {
          if (
            !arr[i].classList.contains("_hidden") &&
            arr[i].classList.contains("_active-tasks")
          ) {
            insertPlace = arr[i];
          }
        }
      };
      activeList();

      if (importantCheckbox.checked === true) {
        task.classList.add("important");
        //Вставка в DOM в начало
        insertPlace.insertBefore(task, insertPlace.firstChild);
        //Замена стикера на важное
        const sticker = task.querySelector(".active-section__sticker-button");
        sticker.insertAdjacentHTML(
          "beforebegin",
          `<div class="task-form__important-button __button_inactive">
          <svg class="__icon">
            <use xlink:href="media/sprite.svg#important"></use>
          </svg>
          </div>`
        );
        sticker.remove();
      } else {
        //Вставка в DOM в конец
        insertPlace.appendChild(task);
      }
      const newNotif = insertPlace.querySelector(".__notifs__new-list");
      if (newNotif) {
        newNotif.remove();
      }
      const activeSection = document.querySelector(".active-section");
  const activeCounter = document.getElementById("active-counter");
      setCounter(activeCounter, activeSection);
      toggleEmptyListMessage();
      newItemTitle.value = "";
    }
    AirDatepicker.selectedDates = [new Date()];
    const dateInput = document.getElementById("airdatepicker");
    dateInput.value = "";
    const timerButton = document.querySelector(".task-form__timer-button");
    const timerIcon = timerButton.children[0].children[0];
    timerIcon.setAttribute("xlink:href", "media/sprite.svg#timer-inactive");
    timerButton.classList.remove("timer_active");
    const datePicker = document.querySelector(".date-picker");
    datePicker.classList.add("_hidden");
    importantCheckbox.checked = false;
    resizeInput(taskDescription);
  });
};

export default addTask;