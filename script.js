//Коллекция узлов
let list = document.querySelector(".todo-list");
let items = list.children;
//Высплывающие подсказки
let emptyListMessage = document.querySelector(".empty-tasks");
let existedTask = document.querySelector(".task-exists");
//Элементы формы, для добавления задач
let newItemForm = document.querySelector(".add-form");
let newItemTitle = newItemForm.querySelector(".add-form-input");
//Темплейты
let taskTemplate = document.querySelector("#task-template").content;
let newItemTemplate = taskTemplate.querySelector(".todo-list-item");
let stickersTemplate = document.querySelector("#stickers-template").content;
let newStickersTemplate = stickersTemplate.querySelector(".stickers-section");
let tabTemplate = document.querySelector("#tab-template").content;
let pageTemplate = document.querySelector("#page-template").content;

//Разделы
let activeSection = document.querySelector(".active-tasks");
let activeItems = activeSection.children;
let doneSection = document.querySelector(".finished-tasks");
let doneItems = doneSection.children;
//Элементы
let importantCheckbox = document.querySelector(".important-button");
let dateInput = document.getElementById("airdatepicker");
let datePicker = document.querySelector(".date-picker");
let timerButton = document.querySelector(".timer-button");
let inputValue;
let dateNow = new Date();
const colorIcon = document.querySelector(".color-theme");
const langIcon = document.querySelector(".goblin-theme");

function OnInput() {
  this.style.height = 0;
  this.style.height = this.scrollHeight + "px";
}

const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute(
    "style",
    "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
  );
  tx[i].addEventListener("input", OnInput, false);
}

let getUserDate = function (data) {
  let a = data.split(" ");
  console.log(a);

  let b = a[0].split(".");
  console.log(b);

  let d = b[0];
  let m = b[1];
  let y = b[2];
  console.log(d, m, y);

  let c = a[1].split(":");
  let h = c[0];
  let mm = c[1];
  console.log(h, mm);

  let userDate = new Date();
  userDate.setFullYear(y);
  userDate.setMonth(m - 1);
  userDate.setDate(d);
  userDate.setHours(h);
  userDate.setMinutes(mm);
  console.log("Input value: " + data);
  console.log("User date :  " + userDate);
  return userDate;
};

let onSelectEvent = function () {
  inputValue = dateInput.value;
  dateNow = new Date();
  console.log("Input changed");
  if (inputValue != "") {
    console.log("Not 0");
    if (getUserDate(inputValue) - dateNow > 60000) {
      timerButton.classList.add("timer_active");
      console.log("Second condition: " + (getUserDate(inputValue) - dateNow));
    } else {
      timerButton.classList.remove("timer_active");
    }
  } else {
    timerButton.classList.remove("timer_active");
  }
};

new AirDatepicker("#airdatepicker", {
  inline: true,
  selectedDates: [new Date()],
  isMobile: true,
  autoClose: true,
  timepicker: true,
  buttons: ["today", "clear"],
  keyboardNav: true,
  minDate: new Date(),
  onSelect: onSelectEvent,
});

//Счетчики задач
let setCounter = function (counter, array) {
  counter.textContent = array.length;
};

const activeCounter = document.getElementById("active-counter");
const doneCounter = document.getElementById("done-counter");
setCounter(activeCounter, activeItems);
setCounter(doneCounter, doneItems);

timerButton.onclick = () => {
  datePicker.classList.toggle("hidden");
};

//TODO Таймер
//Получение текущей даты

//Сообщение о выполнении всех задач
let toggleEmptyListMessage = function () {
  if (activeItems.length === 0) {
    emptyListMessage.classList.remove("hidden");
  } else {
    emptyListMessage.classList.add("hidden");
  }
};

// Удаление задачи
const container = document.querySelector("main");
container.addEventListener("click", (e) => {
  const isRemoveButton = e.target.classList.contains("delete-button");
  if (isRemoveButton) {
    e.target.parentNode.parentNode.parentNode.remove();
    setCounter(activeCounter, activeItems);
    setCounter(doneCounter, doneItems);
  }
});

// TODO Manipulating active tasks
activeSection.addEventListener("click", (e) => {
  //! Стикеры
  // Show stickers section
  const isStickerButton = e.target.classList.contains("add-sticker-button");
  if (isStickerButton) {
    if (e.target.parentElement.nextElementSibling.children.length == 0) {
      let stickers = newStickersTemplate.cloneNode(true);
      e.target.parentElement.nextElementSibling.appendChild(stickers);
    }
    e.target.parentNode.nextElementSibling.classList.toggle("hidden");
  }

  // Set sticker to the task
  const isSticker = e.target.classList.contains("sticker_item");
  if (isSticker) {
    const children = e.target.parentElement.children;
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove("sticker_item-active");
    }
    let defaultSticker = e.target.parentElement.parentElement.previousElementSibling;
    let swap = e.target.childNodes[1].getAttribute("xlink:href");
    if (swap == defaultSticker.childNodes[1].childNodes[1].getAttribute("xlink:href")) {
      e.target.classList.remove("sticker_item-active");
      defaultSticker.childNodes[1].childNodes[1].setAttribute(
        "xlink:href",
        "media/stickers/sticker-default.svg#sticker"
      );
    } else {
      defaultSticker.childNodes[1].childNodes[1].setAttribute("xlink:href", swap);
      e.target.classList.add("sticker_item-active");
    }
  }

  // Перенос задачи в выполненное
  const isDoneButton = e.target.classList.contains("done-button");
  const isEditButton = e.target.classList.contains("edit-button");
  if (isDoneButton) {
    console.log(e.target.parentNode.parentNode.parentNode);
    doneSection.appendChild(e.target.parentNode.parentNode.parentNode);
    e.target.parentNode.parentNode.parentNode.classList.remove("active-todo");
    e.target.parentNode.parentNode.parentNode.classList.add("finished-task");
    // e.target.remove();
    setCounter(activeCounter, activeItems);
    setCounter(doneCounter, doneItems);
    toggleEmptyListMessage();
  }

  // Редактирование задачи
  if (isEditButton) {
    const editingField = e.target.parentNode.previousElementSibling.children[0];
    if (e.target.classList.contains("unclicked")) {
      console.log(e.target.parentNode.previousElementSibling.children);
      editingField.removeAttribute("readonly");
      editingField.focus();
      e.target.classList.remove("unclicked");
      e.target.classList.add("clicked");
    } else if (e.target.classList.contains("clicked")) {
      editingField.setAttribute("readonly", "readonly");
      e.target.classList.remove("clicked");
      e.target.classList.add("unclicked");
    }
  }
});

//! Добавление новой задачи
newItemForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let taskText = newItemTitle.value;
  let task = newItemTemplate.cloneNode(true);
  let taskDescription = task.querySelector("textarea");
  taskDescription.value = taskText;

  //Проверка на повторы задач
  let tasksArray = Array.from(list.children).map((child) => child.innerText);
  let arrayCheck = tasksArray.includes(taskText);

  newItemTitle.addEventListener("change", () => {});

  if (arrayCheck == true) {
    existedTask.classList.remove("hidden");
  } else if (newItemTitle.value == "") {
    // убрать когда строка очищена
    existedTask.classList.add("hidden");
  } else {
    existedTask.classList.add("hidden");

    //TODO Таймер
    // const data = document.getElementById("airdatepicker").value;
    const showDate = task.childNodes[3].childNodes[1];

    if (inputValue != "") {
      inputValue = dateInput.value;
      dateNow = new Date();
      const userDate = getUserDate(inputValue);
      if (userDate - dateNow > 60000) {
        // !Расчет разницы и обновление документа
        function updateCountdown() {
          let innitialDate = new Date(userDate);

          let currentDate = new Date();
          let delta = (innitialDate - currentDate) / 1000;
          if (delta < 0) {
            showDate.innerHTML = "Время вышло";
            return;
          }

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
                  showDate.innerHTML = "Время вышло";
                } else {
                  showDate.innerHTML = `${minutes + 1} мин.`;
                }
              } else {
                showDate.innerHTML = `${hours + Math.floor(minutes / 60)} ч. ${
                  minutes + 1
                } мин.`;
              }
            } else {
              showDate.innerHTML = `${days} д. ${
                hours + Math.floor(minutes / 60)
              } ч. ${minutes + 1} мин.`;
            }
          } else {
            showDate.innerHTML = `${months} мес. ${days} д. ${
              hours + Math.floor(minutes / 60)
            } ч. ${minutes + 1} мин.`;
          }
        }

        setInterval(updateCountdown, 1000);
      }
    } else {
      showDate.innerHTML = "";
    }

    //Добавление важной задачи
    if (importantCheckbox.checked === true) {
      task.classList.add("important");

      //Вставка в DOM в начало
      activeSection.insertBefore(task, activeSection.firstChild);
      toggleEmptyListMessage();
      setCounter(activeCounter, activeItems);
      newItemTitle.value = "";
    } else {
      //Вставка в DOM в конец
      activeSection.appendChild(task);
      toggleEmptyListMessage();
      setCounter(activeCounter, activeItems);
      newItemTitle.value = "";
    }
  }
  dateInput.value = new Date();
  timerButton.classList.remove("timer_active");
  datePicker.classList.add("hidden");
  importantCheckbox.checked = false;
});

// TODO onload logic
window.addEventListener("load", () => {});

// TODO themes
colorIcon.onclick = () => {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    colorIcon.childNodes[1].childNodes[1].setAttribute(
      "d",
      "M20 2.08334C20.3315 2.08334 20.6494 2.21504 20.8839 2.44946C21.1183 2.68388 21.25 3.00182 21.25 3.33334V5.00001C21.25 5.33153 21.1183 5.64947 20.8839 5.88389C20.6494 6.11831 20.3315 6.25001 20 6.25001C19.6685 6.25001 19.3505 6.11831 19.1161 5.88389C18.8817 5.64947 18.75 5.33153 18.75 5.00001V3.33334C18.75 3.00182 18.8817 2.68388 19.1161 2.44946C19.3505 2.21504 19.6685 2.08334 20 2.08334ZM7.33165 7.33168C7.56602 7.09759 7.88373 6.96611 8.21498 6.96611C8.54623 6.96611 8.86394 7.09759 9.09831 7.33168L9.75331 7.98501C9.98112 8.22065 10.1073 8.53635 10.1046 8.8641C10.1019 9.19185 9.97057 9.50543 9.73892 9.7373C9.50727 9.96917 9.19381 10.1008 8.86606 10.1038C8.53832 10.1068 8.22251 9.98093 7.98665 9.75334L7.33165 9.09834C7.09756 8.86397 6.96608 8.54626 6.96608 8.21501C6.96608 7.88376 7.09756 7.56605 7.33165 7.33168ZM32.6683 7.33168C32.9024 7.56605 33.0339 7.88376 33.0339 8.21501C33.0339 8.54626 32.9024 8.86397 32.6683 9.09834L32.0133 9.75334C31.7764 9.97414 31.4629 10.0943 31.1391 10.0886C30.8153 10.0829 30.5063 9.95174 30.2773 9.72271C30.0483 9.49369 29.9171 9.18472 29.9114 8.86088C29.9056 8.53705 30.0258 8.22363 30.2466 7.98668L30.9016 7.33168C31.136 7.09759 31.4537 6.96611 31.785 6.96611C32.1162 6.96611 32.4339 7.09759 32.6683 7.33168ZM20 11.25C17.6793 11.25 15.4537 12.1719 13.8128 13.8128C12.1719 15.4538 11.25 17.6794 11.25 20C11.25 22.3207 12.1719 24.5463 13.8128 26.1872C15.4537 27.8281 17.6793 28.75 20 28.75C22.3206 28.75 24.5462 27.8281 26.1872 26.1872C27.8281 24.5463 28.75 22.3207 28.75 20C28.75 17.6794 27.8281 15.4538 26.1872 13.8128C24.5462 12.1719 22.3206 11.25 20 11.25ZM8.74998 20C8.74998 17.0163 9.93524 14.1548 12.045 12.0451C14.1548 9.93527 17.0163 8.75001 20 8.75001C22.9837 8.75001 25.8451 9.93527 27.9549 12.0451C30.0647 14.1548 31.25 17.0163 31.25 20C31.25 22.9837 30.0647 25.8452 27.9549 27.955C25.8451 30.0647 22.9837 31.25 20 31.25C17.0163 31.25 14.1548 30.0647 12.045 27.955C9.93524 25.8452 8.74998 22.9837 8.74998 20ZM2.08331 20C2.08331 19.6685 2.21501 19.3505 2.44943 19.1161C2.68385 18.8817 3.00179 18.75 3.33331 18.75H4.99998C5.3315 18.75 5.64944 18.8817 5.88386 19.1161C6.11828 19.3505 6.24998 19.6685 6.24998 20C6.24998 20.3315 6.11828 20.6495 5.88386 20.8839C5.64944 21.1183 5.3315 21.25 4.99998 21.25H3.33331C3.00179 21.25 2.68385 21.1183 2.44943 20.8839C2.21501 20.6495 2.08331 20.3315 2.08331 20ZM33.75 20C33.75 19.6685 33.8817 19.3505 34.1161 19.1161C34.3505 18.8817 34.6685 18.75 35 18.75H36.6666C36.9982 18.75 37.3161 18.8817 37.5505 19.1161C37.785 19.3505 37.9166 19.6685 37.9166 20C37.9166 20.3315 37.785 20.6495 37.5505 20.8839C37.3161 21.1183 36.9982 21.25 36.6666 21.25H35C34.6685 21.25 34.3505 21.1183 34.1161 20.8839C33.8817 20.6495 33.75 20.3315 33.75 20ZM30.2466 30.2467C30.481 30.0126 30.7987 29.8811 31.13 29.8811C31.4612 29.8811 31.7789 30.0126 32.0133 30.2467L32.6683 30.9017C32.7911 31.0161 32.8896 31.1541 32.9579 31.3074C33.0263 31.4608 33.063 31.6263 33.066 31.7941C33.0689 31.962 33.038 32.1287 32.9752 32.2843C32.9123 32.44 32.8187 32.5814 32.7 32.7001C32.5813 32.8188 32.44 32.9123 32.2843 32.9752C32.1287 33.0381 31.9619 33.069 31.7941 33.066C31.6263 33.063 31.4607 33.0263 31.3074 32.958C31.1541 32.8897 31.0161 32.7912 30.9016 32.6683L30.2466 32.0133C30.0126 31.779 29.8811 31.4613 29.8811 31.13C29.8811 30.7988 30.0126 30.4811 30.2466 30.2467ZM9.75331 30.2467C9.9874 30.4811 10.1189 30.7988 10.1189 31.13C10.1189 31.4613 9.9874 31.779 9.75331 32.0133L9.09831 32.6683C8.98388 32.7912 8.84588 32.8897 8.69254 32.958C8.53921 33.0263 8.37369 33.063 8.20585 33.066C8.03801 33.069 7.8713 33.0381 7.71565 32.9752C7.56 32.9123 7.41861 32.8188 7.29992 32.7001C7.18122 32.5814 7.08764 32.44 7.02477 32.2843C6.96191 32.1287 6.93103 31.962 6.93399 31.7941C6.93695 31.6263 6.97369 31.4608 7.04201 31.3074C7.11033 31.1541 7.20884 31.0161 7.33165 30.9017L7.98498 30.2467C8.10106 30.1305 8.2389 30.0384 8.39061 29.9755C8.54232 29.9126 8.70493 29.8803 8.86915 29.8803C9.03337 29.8803 9.19598 29.9126 9.34769 29.9755C9.49939 30.0384 9.63723 30.1305 9.75331 30.2467ZM20 33.75C20.3315 33.75 20.6494 33.8817 20.8839 34.1161C21.1183 34.3505 21.25 34.6685 21.25 35V36.6667C21.25 36.9982 21.1183 37.3161 20.8839 37.5506C20.6494 37.785 20.3315 37.9167 20 37.9167C19.6685 37.9167 19.3505 37.785 19.1161 37.5506C18.8817 37.3161 18.75 36.9982 18.75 36.6667V35C18.75 34.6685 18.8817 34.3505 19.1161 34.1161C19.3505 33.8817 19.6685 33.75 20 33.75Z"
    );
    colorIcon.classList.add("dark-theme");
  } else {
    colorIcon.childNodes[1].childNodes[1].setAttribute(
      "d",
      "M35.4167 20C35.4167 24.0888 33.7925 28.0101 30.9013 30.9012C28.0101 33.7924 24.0888 35.4167 20 35.4167V37.9167C29.895 37.9167 37.9167 29.895 37.9167 20H35.4167ZM20 35.4167C15.9113 35.4167 11.99 33.7924 9.09881 30.9012C6.20763 28.0101 4.58337 24.0888 4.58337 20H2.08337C2.08337 29.895 10.105 37.9167 20 37.9167V35.4167ZM4.58337 20C4.58337 15.9113 6.20763 11.99 9.09881 9.09878C11.99 6.20759 15.9113 4.58334 20 4.58334V2.08334C10.105 2.08334 2.08337 10.105 2.08337 20H4.58337ZM25.8334 23.75C23.2917 23.75 20.8542 22.7403 19.0569 20.9431C17.2597 19.1459 16.25 16.7083 16.25 14.1667H13.75C13.75 17.3714 15.0231 20.4448 17.2892 22.7109C19.5552 24.9769 22.6287 26.25 25.8334 26.25V23.75ZM34.0417 19.115C33.1894 20.5299 31.9856 21.7002 30.5473 22.5124C29.109 23.3245 27.4851 23.7509 25.8334 23.75V26.25C27.9158 26.2511 29.9631 25.7138 31.7766 24.6903C33.5901 23.6667 35.1081 22.1917 36.1834 20.4083L34.0417 19.115ZM16.25 14.1667C16.2493 12.515 16.6757 10.8911 17.4879 9.45286C18.3 8.01459 19.4703 6.81079 20.885 5.95834L19.5917 3.81834C17.8085 4.89333 16.3335 6.41109 15.31 8.22429C14.2864 10.0375 13.7491 12.0845 13.75 14.1667H16.25ZM20 4.58334C19.831 4.57936 19.6704 4.50866 19.5534 4.38668C19.4818 4.31707 19.434 4.22668 19.4167 4.12834C19.41 4.07668 19.4134 3.92668 19.5917 3.81834L20.885 5.95834C21.7234 5.45168 21.9934 4.52334 21.895 3.79334C21.7917 3.03501 21.195 2.08334 20 2.08334V4.58334ZM36.1834 20.4083C36.0734 20.5867 35.9234 20.59 35.8717 20.5833C35.7734 20.5661 35.683 20.5182 35.6134 20.4467C35.4914 20.3296 35.4207 20.169 35.4167 20H37.9167C37.9167 18.805 36.965 18.2083 36.2067 18.105C35.4767 18.0067 34.5484 18.2767 34.0417 19.115L36.1834 20.4083Z"
    );
    colorIcon.classList.remove("dark-theme");
    colorIcon.childNodes[3].classList.add("hidden");
  }
};

// Hover effects
colorIcon.onmouseover = () => {
  if (colorIcon.classList.contains("dark-theme")) {
    colorIcon.childNodes[3].classList.remove("hidden");
  } else {
    colorIcon.childNodes[1].childNodes[1].setAttribute(
      "d",
      "M20 36.6667C29.205 36.6667 36.6667 29.205 36.6667 20C36.6667 19.2283 35.51 19.1 35.1117 19.7617C34.2621 21.1689 33.1034 22.3644 31.7234 23.2575C30.3434 24.1506 28.7782 24.7179 27.1464 24.9165C25.5147 25.1151 23.8591 24.9398 22.3051 24.4038C20.7512 23.8678 19.3395 22.9852 18.1772 21.8229C17.0148 20.6605 16.1322 19.2489 15.5962 17.6949C15.0603 16.141 14.8849 14.4854 15.0835 12.8536C15.2821 11.2219 15.8495 9.65668 16.7426 8.27665C17.6357 6.89663 18.8311 5.73793 20.2384 4.88834C20.9 4.48834 20.7717 3.33334 20 3.33334C10.795 3.33334 3.33337 10.795 3.33337 20C3.33337 29.205 10.795 36.6667 20 36.6667Z"
    );
  }
};

colorIcon.onmouseout = () => {
  if (colorIcon.classList.contains("dark-theme")) {
    colorIcon.childNodes[3].classList.add("hidden");
  } else {
    colorIcon.childNodes[1].childNodes[1].setAttribute(
      "d",
      "M35.4166 20C35.4166 24.0888 33.7924 28.0101 30.9012 30.9012C28.01 33.7924 24.0887 35.4167 20 35.4167V37.9167C29.895 37.9167 37.9166 29.895 37.9166 20H35.4166ZM20 35.4167C15.9112 35.4167 11.9899 33.7924 9.09875 30.9012C6.20756 28.0101 4.58331 24.0888 4.58331 20H2.08331C2.08331 29.895 10.105 37.9167 20 37.9167V35.4167ZM4.58331 20C4.58331 15.9113 6.20756 11.99 9.09875 9.09878C11.9899 6.20759 15.9112 4.58334 20 4.58334V2.08334C10.105 2.08334 2.08331 10.105 2.08331 20H4.58331ZM25.8333 23.75C23.2917 23.75 20.8541 22.7403 19.0569 20.9431C17.2596 19.1459 16.25 16.7083 16.25 14.1667H13.75C13.75 17.3714 15.023 20.4448 17.2891 22.7109C19.5552 24.9769 22.6286 26.25 25.8333 26.25V23.75ZM34.0416 19.115C33.1893 20.5299 31.9855 21.7002 30.5473 22.5124C29.109 23.3245 27.4851 23.7509 25.8333 23.75V26.25C27.9157 26.2511 29.963 25.7138 31.7765 24.6903C33.59 23.6667 35.1081 22.1917 36.1833 20.4083L34.0416 19.115ZM16.25 14.1667C16.2493 12.515 16.6757 10.8911 17.4878 9.45286C18.3 8.01459 19.4702 6.81079 20.885 5.95834L19.5916 3.81834C17.8085 4.89333 16.3335 6.41109 15.3099 8.22429C14.2864 10.0375 13.749 12.0845 13.75 14.1667H16.25ZM20 4.58334C19.831 4.57936 19.6704 4.50866 19.5533 4.38668C19.4817 4.31707 19.4339 4.22668 19.4166 4.12834C19.41 4.07668 19.4133 3.92668 19.5916 3.81834L20.885 5.95834C21.7233 5.45168 21.9933 4.52334 21.895 3.79334C21.7916 3.03501 21.195 2.08334 20 2.08334V4.58334ZM36.1833 20.4083C36.0733 20.5867 35.9233 20.59 35.8716 20.5833C35.7733 20.5661 35.6829 20.5182 35.6133 20.4467C35.4913 20.3296 35.4206 20.169 35.4166 20H37.9166C37.9166 18.805 36.965 18.2083 36.2066 18.105C35.4766 18.0067 34.5483 18.2767 34.0416 19.115L36.1833 20.4083Z"
    );
  }
};

langIcon.onmouseover = () => {
  document.getElementById("Vector_2-active").classList.remove("hidden");
  document.getElementById("Vector_2").classList.add("hidden");
};

langIcon.onmouseout = () => {
  document.getElementById("Vector_2-active").classList.add("hidden");
  document.getElementById("Vector_2").classList.remove("hidden");
};

const langArr = {
  maintab: {
    ru: "Основной",
    gb: "Херня",
  },

  worktab: {
    ru: "Работа",
    gb: "Хуета",
  },
};

langIcon.onclick = () => {
  if (langIcon.childNodes[3].classList != "hidden") {
    console.log("Toggled");
    for (let key in langArr) {
      let element = document.querySelector(".lang-" + key);
      if (element) {
        element.innerHTML = langArr[key]["gb"];
      }
    }
    langIcon.childNodes[3].classList.add("hidden");
    langIcon.childNodes[1].classList.remove("hidden");
  } else {
    console.log("Toggled");
    for (let key in langArr) {
      let element = document.querySelector(".lang-" + key);
      if (element) {
        element.innerHTML = langArr[key]["ru"];
      }
    }
    langIcon.childNodes[3].classList.remove("hidden");
    langIcon.childNodes[1].classList.add("hidden");
  }
};
