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
    doneSection.appendChild(e.target.parentNode.parentNode);
    e.target.parentNode.parentNode.classList.remove("active-todo");
    e.target.parentNode.parentNode.classList.add("finished-task");
    e.target.remove();
    toggleEmptyListMessage();
  }
}

//TODO Удаление задачи
/* ---------------- Рабочий вариант с обработчиком на всем контейнере
const container = document.querySelector('.container')

container.addEventListener('click', (e) => {
   const isRemoveButton = e.target.classList.contains('delete-button')

   if (isRemoveButton) {
      console.log ('deleted')
   }
}) 

*/



let removeButton = document.getElementsByClassName('delete-button');
let deleteItem = function (item) {
  let buttons = item.querySelector(".delete-button");
  buttons.addEventListener("click", function () {
    console.log ('deleted')
  });
};

for (let i = 0; i < removeButton.length; i++) {
  deleteItem(removeButton[i]);
}




// let removeButton = document.getElementsByClassName('delete-button');

// for (let i = 0; i < removeButton.length; i++) {
//   removeButton[i].onclick = function(e) {
//     console.log ('deleted')
//     // e.target.parentNode.parentNode.parentNode.remove();
//     // toggleEmptyListMessage();
// }
// }

// removeButtonArray.forEach(item => {
//   item.addEventListener('click', event => {
//     console.log ('deleted')
//   })})

// let removeItem = function() {
//   console.log ('deleted')
// }
// removeButton.forEach(el => el.addEventListener('click', removeItem));


// removeButton.forEach.call((item) => {
//   item.onclick = function(e) {
//     console.log ('deleted')
//     e.target.parentNode.parentNode.parentNode.remove();
//     toggleEmptyListMessage();
// }
// });

//Добавление новой задачи
newItemForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let taskText = newItemTitle.value;
  let task = newItemTemplate.cloneNode(true);
  let taskDescription = task.querySelector("span");
  let deleteButton = newItemTemplate.querySelector('.delete-button')
  let newdeleteButton = deleteButton.cloneNode(true);
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
    taskDescription.appendChild(newdeleteButton);
    toggleEmptyListMessage();
    newItemTitle.value = "";
  }
});
