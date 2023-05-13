//Коллекция узлов
let list = document.querySelector(".todo-list");
let items = list.children;
console.log (items)
//Пустая задача
let emptyListMessage = document.querySelector(".empty-tasks");
//Элементы формы, для добавления задач
let newItemForm = document.querySelector(".add-form");
let newItemTitle = newItemForm.querySelector(".add-form-input");
//Темплейт для задачи
let taskTemplate = document.querySelector("#task-template").content;
let newItemTemplate = taskTemplate.querySelector(".todo-list-item");
//Разделы
let activeSection = document.querySelector('.active-tasks');
let activeList = document.querySelector(".active-todo");
let activeItems = activeList.children;
let doneSection = document.querySelector('.finished-tasks');


//Сообщение о выполнении всех задач
let toggleEmptyListMessage = function () {
  if (activeItems.length === 0) {
    emptyListMessage.classList.remove("hidden");
  } else {
    emptyListMessage.classList.add("hidden");
  }
};

//TODO Перенос задачи в выполненное
//Обработчик нажатия на чекбокс
document.querySelector('.active-tasks').onclick = function(e) {
  if(e.target.value) {
    console.log(e.target.checked, e.target, e.target.parentNode.parentNode);
    doneSection.appendChild(e.target.parentNode.parentNode);
    e.target.parentNode.parentNode.classList.remove("active-todo");
    e.target.parentNode.parentNode.classList.add("finished-task");
    e.target.remove();
    toggleEmptyListMessage();
  }
}

// let addCheckHandler = function (item) {
//   let checkbox = item.querySelector(".todo-list-input");
//   checkbox.addEventListener("change", function () {
//     console.log ('checked')

//   });
// };




//TODO Удаление задачи

document.querySelector('.delete-button').onclick = function(e) {
    console.log ('deleted')
}
// let deleteTask = function(item) {
// let deleteButton = item.querySelector(".delete-button");
// deleteButton.addEventListener("click", function() {
//   item.remove();
//   toggleEmptyListMessage();
// });
// };

//Перебор элементов с обработчиками
// for (let i = 0; i < activeItems.length; i++) {
//   addCheckHandler(activeItems[i]);
// }

// for (let i = 0; i < items.length; i++) {
//   deleteTask(items[i]);
// }


//Добавление новой задачи
newItemForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let taskText = newItemTitle.value;
  let task = newItemTemplate.cloneNode(true);
  let taskDescription = task.querySelector("span");
  let deleteButton = newItemTemplate.querySelector('.delete-button')
  taskDescription.textContent = taskText;
  

  //Добавление важной задачи
  let importantCheckbox = document.querySelector(".important-button");
  if (importantCheckbox.checked === true) {
    task.classList.add("important");
  }

  //TODO: Проверка на повторы задач - дописать поведение
  let tasksArray = Array.from(items).map((child) => child.outerText);
  console.log(tasksArray);
  let arrayCheck = tasksArray.includes(taskText);
  if (arrayCheck == true) {
    console.log("error");
  } else {
    //Вставка в DOM
    activeSection.appendChild(task);
    taskDescription.appendChild(deleteButton);
    toggleEmptyListMessage();
    newItemTitle.value = "";
  }
});
