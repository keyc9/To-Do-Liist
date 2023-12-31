import data from '../translations.json' assert {type: 'json'};

const chageLang = () => {

const langIcon = document.querySelector(".theme-buttons__goblin-theme");

  langIcon.onclick = () => {
    if (langIcon.children[0].classList == "_hidden") {
      for (let key in data) {
        const element = document.querySelector("._lang-" + key);
        if (element) {
          element.value != "underfined"
            ? (element.value = data[key]["gb"])
            : (element.value = "underfined");
          element.innerHTML = data[key]["gb"];
        }
      }
      langIcon.children[1].classList.add("_hidden");
      langIcon.children[0].classList.remove("_hidden");
    } else {
      for (let key in data) {
        const element = document.querySelector("._lang-" + key);
        if (element) {
          element.value != "underfined"
            ? (element.value = data[key]["ru"])
            : (element.value = "underfined");
          element.innerHTML = data[key]["ru"];
        }
      }
      langIcon.children[1].classList.remove("_hidden");
      langIcon.children[0].classList.add("_hidden");
    }
  }
  };

  export default chageLang;