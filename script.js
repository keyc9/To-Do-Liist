//Коллекция узлов
let list = document.querySelector(".todo-list");
let items = list.children;
//Пустая задача
let emptyListMessage = document.querySelector(".empty-tasks");
//Элементы формы, для добавления задач
let newItemForm = document.querySelector(".add-form");
let newItemTitle = newItemForm.querySelector(".add-form-input");
//Темплейт для задачи
let taskTemplate = document.querySelector("#task-template").content;
let newItemTemplate = taskTemplate.querySelector(".todo-list-item");

//Сообщение о выполнении всех задач
let toggleEmptyListMessage = function () {
  if (items.length === 0) {
    emptyListMessage.classList.remove("hidden");
  } else {
    emptyListMessage.classList.add("hidden");
  }
};

//Обработчик нажатия на чекбокс
let addCheckHandler = function (item) {
  let checkbox = item.querySelector(".todo-list-input");
  checkbox.addEventListener("change", function () {
    item.remove();
    toggleEmptyListMessage();
  });
};

for (let i = 0; i < items.length; i++) {
  addCheckHandler(items[i]);
}

//Добавление новой задачи
newItemForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  let taskText = newItemTitle.value;
  let task = newItemTemplate.cloneNode(true);
  let taskDescription = task.querySelector("span");
  taskDescription.textContent = taskText;

  addCheckHandler(task);

  //Добавление важной задачи
  let importantCheckbox = document.querySelector(".important-button");
  if (importantCheckbox.checked === true) {
    task.classList.add("important");
  }

  //TODO: Проверка на повторы задач - дописать поведение
  let tasksArray = Array.from(items).map((child) => child.outerText);
  let arrayCheck = tasksArray.includes(taskText);
  if (arrayCheck == true) {
    console.log("error");
  } else {
    //Вставка в DOM
    list.appendChild(task);
    toggleEmptyListMessage();
    newItemTitle.value = "";
  }
});
