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

document.querySelector(".date").min = today; 
document.querySelector(".date").value = today;
document.querySelector(".time").value = displayTime;

// !Расчет разницы и обновление документа
function updateCountdown() {
  let userDate = document.querySelector(".date").valueAsDate;
  let userTime = document.querySelector(".time").value;
  userDate.setHours(userTime.split(":")[0]);
  userDate.setMinutes(userTime.split(":")[1]);
  let innitialDate = new Date(userDate);

  const showDate = document.querySelector(".showdate");

  let currentDate = new Date();
  let delta = (innitialDate - currentDate) / 1000;
  if (delta < 0) {
    showDate.innerHTML = "Время вышло";
    return
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
          showDate.innerHTML = `${minutes +1} мин.`;
        }
      } else {
        showDate.innerHTML = `${hours + Math.floor(minutes/60)} ч. ${minutes +1} мин.`;
      }
    } else {
      showDate.innerHTML = `${days} д. ${hours  + Math.floor(minutes/60)} ч. ${minutes+1} мин.`;
    }
  } else {
    showDate.innerHTML = `${months} мес. ${days} д. ${hours + Math.floor(minutes/60)} ч. ${minutes+1} мин.`;
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

// Удаление задачи
// Рабочий вариант с обработчиком на всем контейнере
const container = document.querySelector(".container");
container.addEventListener("click", (e) => {
  const isRemoveButton = e.target.classList.contains("delete-button");
  const isDoneButton = e.target.classList.contains("done-button");
  if (isRemoveButton) {
    e.target.parentNode.parentNode.parentNode.remove();
    setCounter();
  }
  // Перенос задачи в выполненное
  if (isDoneButton) {
    doneSection.appendChild(e.target.parentNode.parentNode.parentNode);
    e.target.parentNode.parentNode.parentNode.classList.remove("active-todo");
    e.target.parentNode.parentNode.parentNode.classList.add("finished-task");
    e.target.remove();
    setCounter();
    toggleEmptyListMessage();
  }
});

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
      setCounter();
      newItemTitle.value = "";
    } else {
      //Вставка в DOM в конец
      activeSection.appendChild(task);
      toggleEmptyListMessage();
      setCounter();
      newItemTitle.value = "";
    }
  }
});
