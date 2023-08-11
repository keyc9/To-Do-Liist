//Коллекция узлов
const list = document.querySelector(".__todo-list");
let items = list.children;
//Высплывающие подсказки
const emptyListMessage = document.querySelector(".__notifs__empty-tasks-tasks");
const existedTask = document.querySelector(".__notifs__task-exists");
//Элементы формы, для добавления задач
const newItemForm = document.querySelector(".task-form");
const newItemTitle = newItemForm.querySelector(".task-form__input");
//Темплейты
const taskTemplate = document
  .querySelector("#task-template")
  .content.querySelector(".__list-item");
const stickersTemplate = document
  .querySelector("#stickers-template")
  .content.querySelector(".active-section__stickers-section");
const tabTemplate = document
  .querySelector("#tab-template")
  .content.querySelector(".tabs-container__tab");
const activeTemplate = document
  .querySelector("#active-template")
  .content.querySelector(".__todo-list");
const doneTemplate = document
  .querySelector("#done-template")
  .content.querySelector(".__todo-list");
const deleteBtnTemplate = `<button class="active-section__delete-button">
<svg class="__icon ">
   <use xlink:href="media/sprite.svg#delete"></use>
</svg>
</button>`;
const timerEndMessage = "Время выполнения задачи вышло, закончи её скорее!";

//Разделы
const activeSection = document.querySelector(".active-section");
let activeItems = activeSection.children;
const doneSection = document.querySelector(".done-tasks_section");
let doneItems = doneSection.children;
const tabSection = document.querySelector(".tabs-container");
//Элементы
const importantCheckbox = document.querySelector(
  ".task-form__important-button"
);
const dateInput = document.getElementById("airdatepicker");
const datePicker = document.querySelector(".date-picker");
const timerButton = document.querySelector(".task-form__timer-button");
const timerIcon = timerButton.children[0].children[0];
let inputValue;
let dateNow = new Date();
const colorIcon = document.querySelector(".theme-buttons__color-theme");
const langIcon = document.querySelector(".theme-buttons__goblin-theme");

function resizeInput(e) {
  e.style.height = 0;
  e.style.height = e.scrollHeight + "px";
}

const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute(
    "style",
    "height:" + tx[i].scrollHeight + "px;overflow-y:_hidden;"
  );
  resizeInput(tx[i]);
}

const getUserDate = function (data) {
  const a = data.split(" ");

  const b = a[0].split(".");

  const d = b[0];
  const m = b[1];
  const y = b[2];

  const c = a[1].split(":");
  const h = c[0];
  const mm = c[1];

  let userDate = new Date();
  userDate.setFullYear(y);
  userDate.setMonth(m - 1);
  userDate.setDate(d);
  userDate.setHours(h);
  userDate.setMinutes(mm);
  return userDate;
};

const onSelectEvent = function () {
  inputValue = dateInput.value;
  dateNow = new Date();
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
const setCounter = function (counter, array) {
  const arr = array.children[1].children;
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (
      arr[i].classList.contains("_active-tasks") &&
      !arr[i].classList.contains("_hidden")
    ) {
      if (arr[i].children.length != 0 && arr[i].children[0].nodeName == "P") {
        count = 0;
      } else {
        count = arr[i].children.length;
      }
    } else if (
      arr[i].classList.contains("_finished-tasks") &&
      !arr[i].classList.contains("_hidden")
    ) {
      count = arr[i].children.length;
    }
  }
  counter.textContent = count;
};

const activeCounter = document.getElementById("active-counter");
const doneCounter = document.getElementById("done-counter");
setCounter(activeCounter, activeSection);
setCounter(doneCounter, doneSection);

//Сообщение о выполнении всех задач
const toggleEmptyListMessage = function () {
  if (activeCounter.textContent == "0") {
    const newNotif = document.querySelector(".__notifs__new-list");
    if (!newNotif) {
      emptyListMessage.classList.remove("_hidden");
    } else {
      emptyListMessage.classList.add("_hidden");
    }
  } else {
    emptyListMessage.classList.add("_hidden");
  }
};

timerButton.onclick = () => {
  datePicker.classList.toggle("_hidden");
};

// !Tabs =============================================================================================================================================================================================
function resizeTab(x) {
  let numberOfCharacters = x.value.length;
  if (numberOfCharacters >= 10) {
    let length = numberOfCharacters + "ch";
    x.style.width = length;
  }
}

let tabChosen = document.querySelector("._active-tab");
let tabClicked;
const menu = document.getElementById("context-menu");

// Set the position for menu
const setTabMenuPosition = function (e) {
  const rect = tabSection.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  menu.style.top = `${y}px`;
  menu.style.left = `${x}px`;
  menu.classList.toggle("_hidden");
};

tabSection.addEventListener("click", (e) => {
  //Changing between Tabs
  const isTab = e.target.classList.contains("tabs-container__tab");
  if (isTab) {
    tabChosen = e.target;
    const tabs = e.target.parentElement.children;
    for (i = 0; i < tabs.length; i++) {
      if (tabs[i].classList.contains("_active-tab"))
        tabs[i].classList.remove("_active-tab");
    }
    e.target.classList.add("_active-tab");
    const classArray = e.target.classList.value;
    const key = classArray.match(/_list-\w{4,}/);
    const lists = document.querySelectorAll(".__todo-list");
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].classList.contains(key)) {
        lists[i].classList.remove("_hidden");
      } else {
        lists[i].classList.add("_hidden");
      }
    }
  }
  const isTabSettings = e.target.classList.contains(
    "tabs-container__tab-settings"
  );
  if (isTabSettings) {
    tabClicked = e.target.parentNode.parentNode;
    setTabMenuPosition(e);
  }
  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute(
      "style",
      "height:" + tx[i].scrollHeight + "px;overflow-y:_hidden;"
    );
    resizeInput(tx[i]);
  }
  setCounter(activeCounter, activeSection);
  setCounter(doneCounter, doneSection);
  toggleEmptyListMessage();
});

//TODO: Tab menu
tabSection.addEventListener("contextmenu", (e) => {
  tabClicked = e.target;
  const isTab = e.target.classList.contains("tabs-container__tab");
  const mainTab = e.target.classList.contains("_list-main");
  if (isTab && !mainTab) {
    e.preventDefault();
    setTabMenuPosition(e);
    // Hide the menu
    const documentOuterClickHandler = function (e) {
      const isClickedOutside = !menu.contains(e.target);
      if (isClickedOutside) {
        menu.classList.add("_hidden");
        document.removeEventListener("click", documentOuterClickHandler);
      }
    };
    document.addEventListener("click", documentOuterClickHandler);
  }

  e.target.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      tabClicked.children[0].children[0].setAttribute("readonly", "readonly");
      tabClicked.id = "";
      tabChosen.children[0].children[0].setAttribute("readonly", "readonly");
      tabChosen.id = "";
    }
  });
});

menu.addEventListener("click", (e) => {
  const button = e.target.innerText;
  if (button == "Редактировать") {
    tabClicked.children[0].children[0].removeAttribute("readonly");
    tabClicked.children[0].children[0].focus();
    tabClicked.id = "__tab_isEditting";
    menu.classList.add("_hidden");
  } else if (button == "Удалить") {
    tabClicked.remove();
    menu.classList.add("_hidden");
  }
});

const addTab = document.querySelector(".tabs-container__add-tab");
// Add new Tabs
addTab.addEventListener("click", (e) => {
  const tab = tabTemplate.cloneNode(true);
  const activeList = activeTemplate.cloneNode(true);
  const doneList = doneTemplate.cloneNode(true);

  const index = tabSection.children.length - 1;
  const className = `_list-new${index}`;

  tabSection.insertBefore(tab, addTab);
  tab.classList.add(className);
  tab.querySelector(".tabs-container__tab-name").value = "Новый";
  activeSection.children[1].appendChild(activeList);
  activeList.classList.add(`${className}`, "_hidden");
  doneSection.children[1].appendChild(doneList);
  doneList.classList.add(`${className}`, "_hidden");
});

// Удаление задачи
const container = document.querySelector("main");
container.addEventListener("click", (e) => {
  const isRemoveButton = e.target.classList.contains(
    "active-section__delete-button"
  );
  if (isRemoveButton) {
    const deletePlace = e.target.parentNode;
    if (deletePlace.classList.contains("active-section__settings-field")) {
      e.target.parentNode.parentNode.parentNode.remove();
    } else {
      e.target.parentNode.parentNode.remove();
    }
    setCounter(activeCounter, activeSection);
    setCounter(doneCounter, doneSection);
    toggleEmptyListMessage();
  }
});

//!Manipulating active tasks
activeSection.addEventListener("click", (e) => {
  // Стикеры
  // Show stickers section
  const isStickerButton = e.target.classList.contains(
    "active-section__sticker-button"
  );
  if (isStickerButton) {
    const stickersContainer = e.target.nextElementSibling;
    if (stickersContainer.children.length == 0) {
      const stickers = stickersTemplate.cloneNode(true);
      stickersContainer.appendChild(stickers);
    }
    e.target.nextElementSibling.classList.toggle("_hidden");
  }

  // Set sticker to the task
  const isSticker = e.target.classList.contains(
    "stickers-container__sticker_item"
  );
  if (isSticker) {
    const children = e.target.parentElement.children;
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove("stickers-container__sticker_item_active");
    }
    const defaultSticker =
      e.target.parentElement.parentElement.previousElementSibling;
    const swap = e.target.childNodes[1].getAttribute("xlink:href");
    if (
      swap ==
      defaultSticker.childNodes[1].childNodes[1].getAttribute("xlink:href")
    ) {
      e.target.classList.remove("stickers-container__sticker_item_active");
      defaultSticker.childNodes[1].childNodes[1].setAttribute(
        "xlink:href",
        "media/sprite.svg#sticker-default"
      );
    } else {
      defaultSticker.childNodes[1].childNodes[1].setAttribute(
        "xlink:href",
        swap
      );
      e.target.classList.add("stickers-container__sticker_item_active");
    }
  }

  // Перенос задачи в выполненное
  const isDoneButton = e.target.classList.contains(
    "active-section__done-button"
  );
  if (isDoneButton) {
    let insertPlace;
    const activeList = () => {
      const a = doneSection.children[1].children;
      for (let i = 0; i < a.length; i++) {
        if (!a[i].classList.contains("_hidden")) {
          insertPlace = a[i];
        }
      }
    };
    activeList();
    const targetTask = e.target.parentNode.parentNode;
    insertPlace.appendChild(targetTask);
    targetTask.classList.replace("__list-item_active-todo", "finished-task");
    //Show the message for timers
    const notif = targetTask.children[1];
    const beforeEndMessage = "А ты умничка, сделал всё в срок!";
    const afterEndMessage =
      "Ты выполнил задачу после дедлайна, но молодец, что вообще выполнил.";
    const beforeEndSticker = "media/stickers-sprite.svg#sucessful-timer";
    const afterEndSticker = "media/stickers-sprite.svg#timer-after-deadline";

    console.log(notif.children[1].innerHTML)

    if (notif != null && notif.innerHTML == timerEndMessage) {
      clearInterval(interval)
      notif.children[1].innerHTML = afterEndMessage;
      notif.children[0].children[0].setAttribute("xlink:href", afterEndSticker);
    } else if (notif != null && notif.innerHTML != timerEndMessage) {
      clearInterval(interval)
      notif.children[1].innerHTML = beforeEndMessage;
      notif.children[0].children[0].setAttribute("xlink:href", beforeEndSticker);
    }

    //Show delete btn only
    const settingsButton = e.target.parentNode.children[4];
    settingsButton.insertAdjacentHTML("beforebegin", deleteBtnTemplate);
    settingsButton.remove();

    //Hide sticker if default
    const sticker = e.target.parentNode.children[0].children[0];
    if (
      sticker.children[0].getAttribute("xlink:href") ==
      "media/sprite.svg#sticker-default"
    ) {
      sticker.style.color = "transparent";
    }

    setCounter(activeCounter, activeSection);
    setCounter(doneCounter, doneSection);
    toggleEmptyListMessage();
  }

  // Редактирование задачи
  const isSettingsButton = e.target.classList.contains(
    "active-section__settings-button"
  );
  if (isSettingsButton) {
    e.target.nextElementSibling.classList.toggle("_hidden");
  }

  const isEditButton = e.target.classList.contains(
    "active-section__edit-button"
  );
  if (isEditButton) {
    let editingField;
    if (e.target.innerText == "Редактировать") {
      e.target.parentNode.classList.add("_hidden");
      editingField =
        e.target.parentNode.previousElementSibling.previousElementSibling
          .children[0];
      editingField.removeAttribute("readonly");
      editingField.focus();
      const button = e.target.parentNode.previousElementSibling;
      button.children[0].children[0].setAttribute(
        "xlink:href",
        "media/sprite.svg#done-button"
      );
      button.classList.replace(
        "active-section__settings-button",
        "active-section__edit-button"
      );
    } else {
      editingField = e.target.previousElementSibling.children[0];
      editingField.setAttribute("readonly", "readonly");
      e.target.classList.replace(
        "active-section__edit-button",
        "active-section__settings-button"
      );
      // e.target.classList.remove("active-section__edit-button");
      // e.target.classList.add("active-section__settings-button");
      e.target.children[0].children[0].setAttribute(
        "xlink:href",
        "media/sprite.svg#settings-button"
      );
    }
    editingField.addEventListener("input", resizeInput(editingField), false);
  }
});

//! Добавление новой задачи
newItemForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const taskText = newItemTitle.value;
  const task = taskTemplate.cloneNode(true);
  const taskDescription = task.querySelector("textarea");
  taskDescription.value = taskText;

  //Проверка на повторы задач
  const tasksArray = Array.from(list.children).map(
    (child) => child.children[0].children[3].children[0].value
  );
  const arrayCheck = tasksArray.includes(taskText);

  newItemTitle.addEventListener("change", () => {});

  if (arrayCheck == true) {
    existedTask.classList.remove("_hidden");
  } else if (newItemTitle.value == "") {
    // убрать когда строка очищена
    existedTask.classList.add("_hidden");
  } else {
    existedTask.classList.add("_hidden");

    // Таймер
    inputValue = dateInput.value;
    dateNow = new Date();
    const showDate = task.querySelector(".__notifs_countdown");
    const showDateText = showDate.children[1];
    const showDateSticker = showDate.children[0];

    if (inputValue != "") {
      const userDate = getUserDate(inputValue);
      if (userDate - dateNow > 60000 && inputValue != userDate) {
        //Расчет разницы и обновление документа
        function updateCountdown() {
          const innitialDate = new Date(userDate);

          const currentDate = new Date();
          let delta = (innitialDate - currentDate) / 1000;

          if (delta < 0) {
            showDateText.innerHTML = timerEndMessage;
            showDateSticker.children[0].setAttribute(
              "xlink:href",
              "media/stickers-sprite.svg#deadline"
            );
            showDate.classList.replace("__notifs_time", "__notifs_failure");
            clearInterval(interval);
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
        }
        let interval = setInterval(updateCountdown, 1000);
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
    setCounter(activeCounter, activeSection);
    toggleEmptyListMessage();
    newItemTitle.value = "";
  }
  AirDatepicker.selectedDates = [new Date()];
  dateInput.value = "";
  timerIcon.setAttribute("xlink:href", "media/sprite.svg#timer-inactive");
  timerButton.classList.remove("timer_active");
  datePicker.classList.add("_hidden");
  importantCheckbox.checked = false;
  resizeInput(taskDescription);
});

// TODO onload logic
window.addEventListener("load", () => {});

// TODO themes

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

const langArr = {
  maintab: {
    ru: "Главный",
    gb: "Херня",
  },

  worktab: {
    ru: "Работа",
    gb: "Хуета",
  },

  activecounter: {
    ru: "Активные задачи:",
    gb: "Запары:",
  },
};

// const langArr = JSON.parse(json);

langIcon.onclick = () => {
  if (langIcon.children[0].classList == "_hidden") {
    for (let key in langArr) {
      const element = document.querySelector("._lang-" + key);
      if (element) {
        element.value != "underfined"
          ? (element.value = langArr[key]["gb"])
          : (element.value = "underfined");
        element.innerHTML = langArr[key]["gb"];
      }
    }
    langIcon.children[1].classList.add("_hidden");
    langIcon.children[0].classList.remove("_hidden");
  } else {
    for (let key in langArr) {
      const element = document.querySelector("._lang-" + key);
      if (element) {
        element.value != "underfined"
          ? (element.value = langArr[key]["ru"])
          : (element.value = "underfined");
        element.innerHTML = langArr[key]["ru"];
      }
    }
    langIcon.children[1].classList.remove("_hidden");
    langIcon.children[0].classList.add("_hidden");
  }
};
