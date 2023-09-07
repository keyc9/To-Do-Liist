import setCounter from "./setCounter.js";
import toggleEmptyListMessage from "./toggleEmptyListMessage.js";
import resizeInput from "./resizeInput.js";
// import {updateCountdown, interval} from "./updateCountdown.js";
import {timerEndMessage, beforeEndMessage, afterEndMessage} from "./vars.js";

const manageTasks = () => {
    //TODO: is needed?
    const activeSection = document.querySelector(".active-section");
    const activeCounter = document.getElementById("active-counter");
    const doneSection = document.querySelector(".done-tasks_section");
    const doneCounter = document.getElementById("done-counter");

    // Удаление задачи
    const container = document.querySelector("main");
    container.addEventListener("click", (e) => {
        const isRemoveButton = e.target.classList.contains(
            "active-section__delete-button"
        );
        if (isRemoveButton) {
            const deletePlace = e.target.parentNode;
            if (deletePlace.classList.contains("active-section__settings-field")) {
                e.target.parentNode.parentNode.parentNode.remove();
            } else {
                e.target.parentNode.parentNode.remove();
            }

            setCounter(activeCounter, activeSection);
            setCounter(doneCounter, doneSection);
            toggleEmptyListMessage();
        }
    });

    activeSection.addEventListener("click", (e) => {
        // !Стикеры
        // Show stickers section
        const stickersTemplate = document
  .querySelector("#stickers-template")
  .content.querySelector(".active-section__stickers-section");

        const isStickerButton = e.target.classList.contains(
            "active-section__sticker-button"
        );
        if (isStickerButton) {
            const stickersContainer = e.target.nextElementSibling;
            if (stickersContainer.children.length == 0) {
                const stickers = stickersTemplate.cloneNode(true);
                stickersContainer.appendChild(stickers);
            }
            e.target.nextElementSibling.classList.toggle("_hidden");
        }

        // Set sticker to the task
        const isSticker = e.target.classList.contains(
            "stickers-container__sticker_item"
        );
        if (isSticker) {
            const children = e.target.parentElement.children;
            for (let i = 0; i < children.length; i++) {
                children[i].classList.remove("stickers-container__sticker_item_active");
            }
            const defaultSticker =
                e.target.parentElement.parentElement.previousElementSibling;
            const swap = e.target.childNodes[1].getAttribute("xlink:href");
            if (
                swap ==
                defaultSticker.childNodes[1].childNodes[1].getAttribute("xlink:href")
            ) {
                e.target.classList.remove("stickers-container__sticker_item_active");
                defaultSticker.childNodes[1].childNodes[1].setAttribute(
                    "xlink:href",
                    "media/sprite.svg#sticker-default"
                );
            } else {
                defaultSticker.childNodes[1].childNodes[1].setAttribute(
                    "xlink:href",
                    swap
                );
                e.target.classList.add("stickers-container__sticker_item_active");
            }
        }

        // !Перенос задачи в выполненное
        const isDoneButton = e.target.classList.contains(
            "active-section__done-button"
        );
        if (isDoneButton) {
            let insertPlace;
            const activeList = () => {
                const a = doneSection.children[1].children;
                for (let i = 0; i < a.length; i++) {
                    if (!a[i].classList.contains("_hidden")) {
                        insertPlace = a[i];
                    }
                }
            };

            e.target.classList.add("__button_inactive");
            e.target.previousElementSibling.previousElementSibling.classList.add("__button_inactive");
            // e.target.previousElementSibling.previousElementSibling.children[0].classList.add("_visible_inactive");
            e.target.children[0].classList.add("__notifs_success");
            e.target.children[0].children[1].classList.add("_visible");

            activeList();
            const targetTask = e.target.parentNode.parentNode;
            insertPlace.appendChild(targetTask);
            targetTask.classList.replace("__list-item_active-todo", "finished-task");
            //Show the message for timers
            const notif = targetTask.children[1];

            const beforeEndSticker = "media/stickers-sprite.svg#sucessful-timer";
            const afterEndSticker = "media/stickers-sprite.svg#timer-after-deadline";

            //TODO: Clearing interval
            let timerEnd = document.createElement("span");
            timerEnd.classList.add("__notifs__countdown-date", "__notifs-text");

            if (notif != null && notif.children[1].innerHTML == timerEndMessage) {
                notif.children[1].innerHTML = afterEndMessage;
                notif.classList.replace("__notifs_failure", "__notifs_success-after-timer");
                notif.children[0].children[0].setAttribute(
                    "xlink:href",
                    afterEndSticker
                );
            } else if (notif != null && notif.children[1].innerHTML != timerEndMessage) {
                notif.children[1].innerHTML = beforeEndMessage;
                notif.classList.replace("__notifs_time", "__notifs_success");
                notif.children[0].children[0].setAttribute(
                    "xlink:href",
                    beforeEndSticker
                );
            }

            //! Changing icons
            //Show delete btn only
            const settingsButton = e.target.parentNode.children[4];
            const deleteBtnTemplate = `<button class="active-section__delete-button">
<svg class="__icon ">
   <use xlink:href="media/sprite.svg#delete"></use>
</svg>
</button>`;

            settingsButton.insertAdjacentHTML("beforebegin", deleteBtnTemplate);
            settingsButton.remove();

            //Hide sticker if default
            const sticker = e.target.parentNode.children[0].children[0];
            if (
                sticker.children[0].getAttribute("xlink:href") ==
                "media/sprite.svg#sticker-default"
            ) {
                sticker.style.color = "transparent";
            }

            setCounter(activeCounter, activeSection);
            setCounter(doneCounter, doneSection);
            toggleEmptyListMessage();
        }

        //! Редактирование задачи
        const isSettingsButton = e.target.classList.contains(
            "active-section__settings-button"
        );
        if (isSettingsButton) {
            e.target.nextElementSibling.classList.toggle("_hidden");
        }

        const isEditButton = e.target.classList.contains(
            "active-section__edit-button"
        );
        if (isEditButton) {
            let editingField;
            if (e.target.innerText == "Редактировать") {
                e.target.parentNode.classList.add("_hidden");
                editingField =
                    e.target.parentNode.previousElementSibling.previousElementSibling
                        .children[0];
                editingField.removeAttribute("readonly");
                editingField.focus();
                const button = e.target.parentNode.previousElementSibling;
                button.children[0].children[0].setAttribute(
                    "xlink:href",
                    "media/sprite.svg#done-button"
                );
                button.classList.replace(
                    "active-section__settings-button",
                    "active-section__edit-button"
                );
            } else {
                editingField = e.target.previousElementSibling.children[0];
                editingField.setAttribute("readonly", "readonly");
                e.target.classList.replace(
                    "active-section__edit-button",
                    "active-section__settings-button"
                );
                e.target.children[0].children[0].setAttribute(
                    "xlink:href",
                    "media/sprite.svg#settings-button"
                );
            }
            editingField.addEventListener("input", resizeInput(editingField), false);
        }
    });
};

export default manageTasks;
