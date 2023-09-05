const setCounter = (counter, array) => {
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

  export default setCounter;