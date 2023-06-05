//Коллекция узлов
let list = document.querySelector(".todo-list");
let items = list.children;
console.log(items);
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

//Счетчик задач
let counter = document.getElementById("counter");
let setCounter = function () {
  counter.textContent = activeItems.length;
};
setCounter();

//TODO Таймер
//Вставка текущей даты в инпут
let date = new Date();

let userDay = date.getDate(),
  userMonth = date.getMonth() + 1,
  userYear = date.getFullYear(),
  userHour = date.getHours(),
  userMin = date.getMinutes();

userMonth = (userMonth < 10 ? "0" : "") + userMonth;
userDay = (userDay < 10 ? "0" : "") + userDay;
userHour = (userHour < 10 ? "0" : "") + userHour;
userMin = (userMin < 10 ? "0" : "") + userMin;

let today = userYear + "-" + userMonth + "-" + userDay,
  displayTime = userHour + ":" + userMin;

document.querySelector(".date").value = today;
document.querySelector(".time").value = displayTime;

//TODO Вставить переменную

//TODO

// !Расчет разницы и обновление документа

function updateCountdown() {
  let userDate = document.querySelector(".date").valueAsDate;
  let userTime = document.querySelector(".time").value;
  userDate.setHours(userTime.split(":")[0]);
  userDate.setMinutes(userTime.split(":")[1]);
  let a = new Date(userDate);

  const showMonths = document.getElementById("months");
  const ShowDays = document.getElementById("days");
  const showHours = document.getElementById("hours");
  const showMinutes = document.getElementById("minutes");

  let currentDate = new Date();
  // get total seconds between the times
  let delta = (a - currentDate) / 1000;
  if (delta < 0) {
    showMonths.innerHTML = "Время вышло";
    return
  }

  // calculate (and subtract) whole days
  let days = Math.floor(delta / 86400);
  delta -= days * 86400;

  let months = Math.floor(days / 30);
  days -= months * 30;

  // calculate (and subtract) whole hours
  let hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  let minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  let seconds = delta % 60;

  console.log(`delta: ${delta}`)
  console.log(`seconds: ${seconds}`)
  console.log(
    `months: ${months}, days: ${days}, hours: ${hours}, min: ${minutes}`
  );

  if (months <= 0) {
    if (days <= 0) {
      if (hours <= 0) {
        if (seconds <= 0) {
          showMonths.innerHTML = "Время вышло";
        } else {
          showMonths.innerHTML = `${minutes} мин.`;
        }
      } else {
        showMonths.innerHTML = `${hours} ч. ${minutes} мин.`;
      }
    } else {
      showMonths.innerHTML = `${days} д. ${hours} ч. ${minutes} мин.`;
    }
  } else {
    showMonths.innerHTML = `${months} мес. ${days} д. ${hours} ч. ${minutes} мин.`;
  }
}

setInterval(updateCountdown, 1000);

//Сообщение о выполнении всех задач
let toggleEmptyListMessage = function () {
  if (activeItems.length === 0) {
    emptyListMessage.classList.remove("hidden");
  } else {
    emptyListMessage.classList.add("hidden");
  }
};

// Перенос задачи в выполненное
document.querySelector(".active-tasks").onclick = function (e) {
  if (e.target.value) {
    doneSection.appendChild(e.target.parentNode.parentNode);
    e.target.parentNode.parentNode.classList.remove("active-todo");
    e.target.parentNode.parentNode.classList.add("finished-task");
    e.target.remove();
    setCounter();
    toggleEmptyListMessage();
  }
};

// Удаление задачи
// Рабочий вариант с обработчиком на всем контейнере
const container = document.querySelector(".container");
container.addEventListener("click", (e) => {
  const isRemoveButton = e.target.classList.contains("delete-button");
  if (isRemoveButton) {
    e.target.parentNode.parentNode.parentNode.remove();
    setCounter();
  }
});

//! Добавление новой задачи
newItemForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let taskText = newItemTitle.value;
  let task = newItemTemplate.cloneNode(true);
  let taskDescription = task.querySelector("span");
  let deleteButton = newItemTemplate.querySelector(".delete-button");
  let newdeleteButton = deleteButton.cloneNode(true);
  taskDescription.textContent = taskText;

  //Проверка на повторы задач
  let tasksArray = Array.from(items).map((child) => child.outerText);
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
      taskDescription.appendChild(newdeleteButton);
      toggleEmptyListMessage();
      setCounter();
      newItemTitle.value = "";
    } else {
      //Вставка в DOM в конец
      activeSection.appendChild(task);
      taskDescription.appendChild(newdeleteButton);
      toggleEmptyListMessage();
      setCounter();
      newItemTitle.value = "";
    }
  }
});
