import setCounter from "./setCounter.js";
import toggleEmptyListMessage from "./toggleEmptyListMessage.js";
import resizeInput from "./resizeInput.js";

const manageTabs = () => {

  const activeSection = document.querySelector(".active-section");
  const activeCounter = document.getElementById("active-counter");
  const doneSection = document.querySelector(".done-tasks_section");
  const doneCounter = document.getElementById("done-counter");
  
  let tabChosen = document.querySelector("._active-tab");
  let tabClicked;
  const menu = document.getElementById("context-menu");
  
  // Set the position for menu
  const tabSection = document.querySelector(".tabs-container");
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
      for (let i = 0; i < tabs.length; i++) {
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

  const tx = document.getElementsByTagName("textarea");
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
    }); 
    

  
  menu.addEventListener("click", (e) => {
    const button = e.target.innerText;
    let tabInput = tabClicked.children[0].children[0]
    if (button == "Редактировать") {
      tabInput.removeAttribute("readonly");
      tabInput.focus();
      tabClicked.id = "__tab_isEditting";
      menu.classList.add("_hidden");

      tabInput.addEventListener("input", (e) => {
        let numberOfCharacters = e.target.value.length;
        if (numberOfCharacters >= 8) {
          let length = numberOfCharacters + 2 + "ch";
          e.target.style.width = length;
        }
      } )
    
      tabInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            tabInput.setAttribute("readonly", "readonly");
            tabClicked.id = "";
            tabChosen.children[0].children[0].setAttribute("readonly", "readonly");
            tabChosen.id = "";
          }
        })
    } else if (button == "Удалить") {
      tabClicked.remove();
      menu.classList.add("_hidden");
    }
  });
  
  const addTab = document.querySelector(".tabs-container__add-tab");
  // Add new Tabs
  const tabTemplate = document
  .querySelector("#tab-template")
  .content.querySelector(".tabs-container__tab");
  const activeTemplate = document
  .querySelector("#active-template")
  .content.querySelector(".__todo-list");
const doneTemplate = document
  .querySelector("#done-template")
  .content.querySelector(".__todo-list");

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
  })}

  export default manageTabs;