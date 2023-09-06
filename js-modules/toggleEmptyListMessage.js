const toggleEmptyListMessage = () => {
  const emptyListMessage = document.querySelector(".__notifs__empty-tasks-tasks");
  const activeCounter = document.getElementById("active-counter");

    if (activeCounter.textContent == "0") {
      const newNotif = document.querySelector(".__notifs__new-list");
      if (newNotif) {
        emptyListMessage.classList.add("_hidden");

      } else {
        emptyListMessage.classList.remove("_hidden");
      }
    } else {
      emptyListMessage.classList.add("_hidden");
    }
  };


export default toggleEmptyListMessage;