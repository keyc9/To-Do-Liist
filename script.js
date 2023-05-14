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

//Добавление новой задачи
newItemForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let taskText = newItemTitle.value;
  let task = newItemTemplate.cloneNode(true);
  let taskDescription = task.querySelector("span");
  let deleteButton = newItemTemplate.querySelector(".delete-button");
  let newdeleteButton = deleteButton.cloneNode(true);
  taskDescription.textContent = taskText;

  //TODO: Проверка на повторы задач
  let tasksArray = Array.from(items).map((child) => child.outerText);
  let arrayCheck = tasksArray.includes(taskText);

  newItemTitle.addEventListener('change', () => {
    
  }
 
  )

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
