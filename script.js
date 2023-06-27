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
let newTabTemplate = document.querySelector("tab")
let pageTemplate = document.querySelector("#page-template").content;
let newPageTemplate = document.querySelector("todo-list")


//Разделы
let activeSection = document.querySelector(".active-tasks_section");
let activeItems = activeSection.children;
let doneSection = document.querySelector(".done-tasks_section");
let doneItems = doneSection.children;
let tabSection = document.querySelector(".tabs-container");
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
  tx[i].addEventListener("load", onload, false);
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
  let arr = array.children[1].children[0].children;
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if ( arr[i].classList.contains("active-todo") &&
      !arr[i].classList.contains("hidden") 
    ) {
      count ++;
    } else if (arr[i].classList.contains("finished-task") &&
    !arr[i].classList.contains("hidden")) {
      count ++;
    }
  }
  counter.textContent = count;
};

const activeCounter = document.getElementById("active-counter");
const doneCounter = document.getElementById("done-counter");
setCounter(activeCounter, activeSection);
setCounter(doneCounter, doneSection);

timerButton.onclick = () => {
  datePicker.classList.toggle("hidden");
};

// TODO: Tabs
tabSection.addEventListener("click", (e) => {
  const isTab = e.target.classList.contains("tab");
  if (isTab) {
    let tabs = e.target.parentElement.children;
    for (i = 0; i < tabs.length; i++) {
      if (tabs[i].classList.contains("active-tab"))
      e.target.parentElement.children[i].classList.remove("active-tab");
    }
    e.target.classList.add("active-tab");
    let classArray = e.target.classList.value;
    console.log(classArray);
    let key = classArray.match(/list-\w{4,}/);
    let lists = document.querySelectorAll(".todo-list")
    console.log(lists);
    for (let i = 0; i < lists.length; i++) {
    if (lists[i].classList.contains(key)) {
          lists[i].classList.remove("hidden")
          console.log(lists[i].classList)
    } else {
          lists[i].classList.add("hidden")
          console.log(lists[i].classList)
    }
  }

  }


});


//!Таймер =================================================================
//Получение текущей даты

//Сообщение о выполнении всех задач
let toggleEmptyListMessage = function () {
  if (activeCounter.textContent === "0") {
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
    setCounter(activeCounter, activeSection);
    setCounter(doneCounter, doneSection);
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
    let defaultSticker =
      e.target.parentElement.parentElement.previousElementSibling;
    let swap = e.target.childNodes[1].getAttribute("xlink:href");
    if (
      swap ==
      defaultSticker.childNodes[1].childNodes[1].getAttribute("xlink:href")
    ) {
      e.target.classList.remove("sticker_item-active");
      defaultSticker.childNodes[1].childNodes[1].setAttribute(
        "xlink:href",
        "media/stickers/sticker-default.svg#sticker"
      );
    } else {
      defaultSticker.childNodes[1].childNodes[1].setAttribute(
        "xlink:href",
        swap
      );
      e.target.classList.add("sticker_item-active");
    }
  }

  // Перенос задачи в выполненное
  const isDoneButton = e.target.classList.contains("done-button");
  const isEditButton = e.target.classList.contains("edit-button");
  if (isDoneButton) {
    doneSection.children[1].children[0].appendChild(e.target.parentNode.parentNode.parentNode);
    e.target.parentNode.parentNode.parentNode.classList.remove("active-todo");
    e.target.parentNode.parentNode.parentNode.classList.add("finished-task");
    // e.target.remove();
    setCounter(activeCounter, activeSection);
    setCounter(doneCounter, doneSection);
    toggleEmptyListMessage();
  }

  // Редактирование задачи
  if (isEditButton) {
    const editingField = e.target.parentNode.previousElementSibling.children[0];
    if (e.target.classList.contains("unclicked")) {
      editingField.removeAttribute("readonly");
      editingField.focus();
      e.target.classList.remove("unclicked");
      e.target.classList.add("clicked");
      e.target.children[0].setAttribute(
        "xlink:href",
        "media/main-sprite.svg#edit-button_active"
      );
    } else if (e.target.classList.contains("clicked")) {
      editingField.setAttribute("readonly", "readonly");
      e.target.classList.remove("clicked");
      e.target.classList.add("unclicked");
      e.target.children[0].setAttribute(
        "xlink:href",
        "media/main-sprite.svg#edit"
      );
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
  let tasksArray = Array.from(list.children).map(
    (child) => child.children[0].children[3].children[0].value
  );
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
    let insertPlace = activeSection.children[1].children[0]
    if (importantCheckbox.checked === true) {
      task.classList.add("important");
      //Вставка в DOM в начало
      insertPlace.insertBefore(task, insertPlace.firstChild);
      toggleEmptyListMessage();
      setCounter(activeCounter, activeSection);
      newItemTitle.value = "";
    } else {
      //Вставка в DOM в конец
      insertPlace.appendChild(task);
      toggleEmptyListMessage();
      setCounter(activeCounter, activeSection);
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

let iconRef = colorIcon.children[0].children[0];
colorIcon.onclick = () => {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    console.log(iconRef);
    iconRef.setAttribute(
      "xlink:href",
      "media/main-sprite.svg#to_light-theme_inactive"
    );
    colorIcon.classList.add("dark-theme");
  } else {
    console.log(iconRef);
    iconRef.setAttribute(
      "xlink:href",
      "media/main-sprite.svg#to-dark-theme_inactive"
    );
    colorIcon.classList.remove("dark-theme");
  }
};

// Hover effects
colorIcon.onmouseover = () => {
  if (colorIcon.classList.contains("dark-theme")) {
    iconRef.setAttribute(
      "xlink:href",
      "media/main-sprite.svg#to_light-theme_active"
    );
  } else {
    iconRef.setAttribute("xlink:href", "media/main-sprite.svg#to_dark_theme");
  }
};

colorIcon.onmouseout = () => {
  if (colorIcon.classList.contains("dark-theme")) {
    iconRef.setAttribute(
      "xlink:href",
      "media/main-sprite.svg#to_light-theme_inactive"
    );
  } else {
    iconRef.setAttribute(
      "xlink:href",
      "media/main-sprite.svg#to-dark-theme_inactive"
    );
  }
};

let goblinRef = langIcon.children[1].children[0];
langIcon.onmouseover = () => {
  goblinRef.setAttribute("xlink:href", "media/main-sprite.svg#goblin-active");
};

langIcon.onmouseout = () => {
  goblinRef.setAttribute("xlink:href", "media/main-sprite.svg#goblin-inactive");
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
  if (langIcon.children[0].classList == "hidden") {
    console.log("Toggled");
    for (let key in langArr) {
      let element = document.querySelector(".lang-" + key);
      if (element) {
        element.innerHTML = langArr[key]["gb"];
      }
    }
    langIcon.children[1].classList.add("hidden");
    langIcon.children[0].classList.remove("hidden");
  } else {
    console.log("Toggled2");
    for (let key in langArr) {
      let element = document.querySelector(".lang-" + key);
      if (element) {
        element.innerHTML = langArr[key]["ru"];
      }
    }
    langIcon.children[1].classList.remove("hidden");
    langIcon.children[0].classList.add("hidden");
  }
};
