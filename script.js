//Коллекция узлов
let list = document.querySelector(".todo-list");
let items = list.children;
//Высплывающие подсказки
let emptyListMessage = document.querySelector(".empty-tasks");
let existedTask = document.querySelector(".task-exists");
//Элементы формы, для добавления задач
let newItemForm = document.querySelector(".add-form");
let newItemTitle = newItemForm.querySelector(".add-form-input");
//Темплейт для задачи
let taskTemplate = document.querySelector("#task-template").content;
let newItemTemplate = taskTemplate.querySelector(".todo-list-item");
//Разделы
let activeSection = document.querySelector(".active-tasks");
let activeItems = activeSection.children;
let doneSection = document.querySelector(".finished-tasks");
let doneItems = doneSection.children;

const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute(
    "style",
    "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
  );
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = 0;
  this.style.height = this.scrollHeight + "px";
}

// new AirDatepicker('#airdatepicker')

new AirDatepicker("#airdatepicker", {
  inline: true,
  selectedDates: [new Date()],
  isMobile: true,
  autoClose: true,
  timepicker: true,
  buttons: ["today", "clear"],
  keyboardNav: true,
});

//Счетчики задач
let setCounter = function (counter, array) {
  counter.textContent = array.length;
};

const activeCounter = document.getElementById("active-counter");
const doneCounter = document.getElementById("done-counter");
setCounter(activeCounter, activeItems);
setCounter(doneCounter, doneItems);

//TODO Таймер
//Вставка текущей даты в инпут
// let date = new Date();

// let userDay = date.getDate(),
//   userMonth = date.getMonth() + 1,
//   userYear = date.getFullYear(),
//   userHour = date.getHours(),
//   userMin = date.getMinutes();

// userMonth = (userMonth < 10 ? "0" : "") + userMonth;
// userDay = (userDay < 10 ? "0" : "") + userDay;
// userHour = (userHour < 10 ? "0" : "") + userHour;
// userMin = (userMin < 10 ? "0" : "") + userMin;

// let today = userYear + "-" + userMonth + "-" + userDay,
//   displayTime = userHour + ":" + userMin;

// document.querySelector(".date").min = today;
// document.querySelector(".date").value = today;
// document.querySelector(".time").value = displayTime;

// // !Расчет разницы и обновление документа
// function updateCountdown() {
//   let userDate = document.querySelector(".date").valueAsDate;
//   let userTime = document.querySelector(".time").value;
//   userDate.setHours(userTime.split(":")[0]);
//   userDate.setMinutes(userTime.split(":")[1]);
//   let innitialDate = new Date(userDate);

//   const showDate = document.querySelector(".showdate");

//   let currentDate = new Date();
//   let delta = (innitialDate - currentDate) / 1000;
//   if (delta < 0) {
//     showDate.innerHTML = "Время вышло";
//     return
//   }

//   let days = Math.floor(delta / 86400);
//   delta -= days * 86400;

//   let months = Math.floor(days / 31);
//   days -= months * 31;

//   let hours = Math.floor(delta / 3600) % 24;
//   delta -= hours * 3600;

//   let minutes = Math.floor(delta / 60) % 60;
//   delta -= minutes * 60;

//   let seconds = Math.round(delta % 60);

//   if (months <= 0) {
//     if (days <= 0) {
//       if (hours <= 0) {
//         if (seconds <= 0 && minutes <= 0) {
//           showDate.innerHTML = "Время вышло";
//         } else {
//           showDate.innerHTML = `${minutes +1} мин.`;
//         }
//       } else {
//         showDate.innerHTML = `${hours + Math.floor(minutes/60)} ч. ${minutes +1} мин.`;
//       }
//     } else {
//       showDate.innerHTML = `${days} д. ${hours  + Math.floor(minutes/60)} ч. ${minutes+1} мин.`;
//     }
//   } else {
//     showDate.innerHTML = `${months} мес. ${days} д. ${hours + Math.floor(minutes/60)} ч. ${minutes+1} мин.`;
//   }
// }

// setInterval(updateCountdown, 1000);

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

// Перенос задачи в выполненное (только секция активных)
const activeonly = document.querySelector(".active-tasks_section");
activeonly.addEventListener("click", (e) => {
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

//! Стикеры
// let images = [
//   "media/stickers/bandaid.svg",
//   "media/stickers/bicycling.svg",
//   "media/stickers/bone.svg",
//   "media/stickers/bonfire.svg",
//   "media/stickers/book.svg",
//   "media/stickers/bottle.svg",
//   "media/stickers/calendar.svg",
//   "media/stickers/call-chat.svg",
//   "media/stickers/camera.svg",
//   "media/stickers/cart.svg",
//   "media/stickers/case.svg",
//   "media/stickers/cat.svg",
//   "media/stickers/clothes.svg",
//   "media/stickers/computer.svg",
//   "media/stickers/confetti.svg",
//   "media/stickers/cup.svg",
//   "media/stickers/dollar.svg",
//   "media/stickers/earphones.svg",
//   "media/stickers/gamepad.svg",
//   "media/stickers/globe.svg",
//   "media/stickers/heart.svg",
//   "media/stickers/home.svg",
//   "media/stickers/letter.svg",
//   "media/stickers/location.svg",
//   "media/stickers/map.svg",
//   "media/stickers/meditation.svg",
//   "media/stickers/photo.svg",
//   "media/stickers/pills.svg",
//   "media/stickers/study.svg",
//   "media/stickers/tea.svg",
//   "media/stickers/tram.svg",
//   "media/stickers/volleyball.svg",
//   "media/stickers/walking.svg",
//   "media/stickers/wineglass.svg",
//   "media/stickers/workout.svg",
// ];

// const stickersContainer = document.querySelector(".stickers_container");

// for (let i = 0; i < images.length; i++) {
//   const img = document.createElement("img");
//   img.src = images[i];
//   stickersContainer.appendChild(img);
// }

// let thumbnails = document.querySelectorAll(".gallery__picture-preview");
// let fullPhoto = document.querySelector(".full-picture");

// let addThumbnailClickHandler = function (preview, pictures) {
//   preview.addEventListener("click", function () {
//     fullPhoto.src = pictures;
//   });
// };

// for (let i = 0; i < thumbnails.length; i++) {
//   addThumbnailClickHandler(thumbnails[i], pictures[i]);
// }

//! Добавление новой задачи
newItemForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let taskText = newItemTitle.value;
  let task = newItemTemplate.cloneNode(true);
  let taskDescription = task.querySelector("h3");
  taskDescription.textContent = taskText;

  //Проверка на повторы задач

  let tasksArray = Array.from(list.children).map((child) => child.innerText);
  let arrayCheck = tasksArray.includes(taskText);

  newItemTitle.addEventListener("change", () => {});

  if (arrayCheck == true) {
    existedTask.classList.remove("hidden");
  } else if (newItemTitle.value == "") {
    // TODO: убрать когда строка очищена
    existedTask.classList.add("hidden");
  } else {
    existedTask.classList.add("hidden");
    //Добавление важной задачи
    let importantCheckbox = document.querySelector(".important-button");
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
});

// TODO onload logic
window.addEventListener("load", () => {});

// TODO themes

const colorIcon = document.querySelector(".color-theme");
colorIcon.onclick = () => {
  document.body.classList.toggle("dark-theme");
  // if(document.body.classList.contains("dark-theme")){
  //   colorIcon.src = ""
  // } else {
  //   colorIcon.src = ""
  // }
};

const langIcon = document.querySelector(".goblin-theme");
const langArr = {
  "maintab" : {
    "ru" : "Основной",
    "gb" : "Херня",
  },

  "worktab" : {
    "ru" : "Работа",
    "gb" : "Хуета",
  },
};

langIcon.onclick = () => {
  console.log("Toggled")
  for (let key in langArr) {
    let element = document.querySelector(".lang-" + key);
  if (element) {
    element.innerHTML = langArr[key]["gb"];
    console.log(element + ' Key: ' + langArr[key]["gb"] + " InnerHTML: " + element.innerHTML)
  }
}
};

