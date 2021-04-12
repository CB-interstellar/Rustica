/* eslint-disable no-use-before-define */

// INVALID STATUS FÜR DIE FORM-BOXEN

// Namen Form
const ganzerName = document.getElementById("name");

ganzerName.addEventListener("change", (event) => {
  // eslint-disable-next-line eqeqeq
  if (event.target.value == "") {
    event.target.classList.add("sec-kontakt--warnung");
  } else {
    event.target.classList.remove("sec-kontakt--warnung");
  }
});

// E-Mail Form
const eMail = document.getElementById("email");

eMail.addEventListener("change", (event) => {
  // eslint-disable-next-line eqeqeq
  if (event.target.value.contains != "@") {
    event.target.classList.add("sec-kontakt--warnung");
  } else {
    event.target.classList.remove("sec-kontakt--warnung");
  }
});

// CHECKBOX
const checkBox = document.getElementById("check");
const labelBox = document.querySelector(".sec-kontakt__label--daten");

checkBox.addEventListener("click", warnCheckbox);

function warnCheckbox() {
  // eslint-disable-next-line eqeqeq
  if (checkBox.checked == false) {
    labelBox.classList.add("warn");
  } else {
    labelBox.classList.remove("warn");
  }
}

// Abschicken für E-Mail und Checkbox
const abschickenBtn = document.getElementById("abschicken");

abschickenBtn.addEventListener("click", abschickenButtonClick);

function abschickenButtonClick(event) {
  const data = {};
  event.preventDefault();
  // eslint-disable-next-line eqeqeq
  if (ganzerName.value == "") {
    ganzerName.classList.add("sec-kontakt--warnung");
    console.log("Keine Name angegeben!");
    // eslint-disable-next-line eqeqeq
  } else if (eMail.value == "") {
    eMail.classList.add("sec-kontakt--warnung");
    console.log("Keine Mail-Adresse angegeben!");
    // eslint-disable-next-line eqeqeq
  } else if (checkBox.checked == false) {
    labelBox.classList.add("warn");
    eMail.classList.remove("sec-kontakt--warnung");
    console.log("Nicht versandt! Datenschutz!");
  } else {
    ganzerName.classList.remove("sec-kontakt--warnung");
    eMail.classList.remove("sec-kontakt--warnung");
    labelBox.classList.remove("warn");
    localStorage.setItem("localData", JSON.stringify(data));
  }
}

/// /////////////////////////////////////////////////
// ANFERTIGEN DES CUSTOM SELECT BUTTONS
const spacebarKey = [0, 32];
const enterKey = 13;
const downKey = 40;
const upKey = 38;
const escapeKey = 27;

const listUl = document.querySelector(".dropdown--list");
const listContainer = document.querySelector(".dropdown--list-container");
const iconDown = document.querySelector(".dropdown__icon");
const listItems = document.querySelectorAll(".dropdown__list-item");
const dropdownBetreffNode = document.querySelector("#dropdown-betreff");
const listItemIds = [];

dropdownBetreffNode.addEventListener("click", (event) =>
  toggleListVisibility(event)
);

dropdownBetreffNode.addEventListener("keydown", (event) =>
  toggleListVisibility(event)
);

// Add each list item's id to the listItems array
listItems.forEach((item) => listItemIds.push(item.id));

listItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    setSelectedListItem(e);
    closeList();
  });

  item.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case enterKey:
        setSelectedListItem(e);
        closeList();
        return;

      case downKey:
        focusNextListItem(downKey);
        return;

      case upKey:
        focusNextListItem(upKey);
        return;

      case escapeKey:
        closeList();

      // eslint-disable-next-line no-fallthrough
      default:
    }
  });
});

// Etwas in die Select-box legen
function setSelectedListItem(e) {
  const selectedTextToAppend = document.createTextNode(e.target.innerText);
  dropdownBetreffNode.innerHTML = null;
  dropdownBetreffNode.appendChild(selectedTextToAppend);
}

// Container schließen
function closeList() {
  listUl.classList.remove("open");
  iconDown.classList.remove("expanded");
  listContainer.setAttribute("aria-expanded", false);
}

// Escape zum Verlassen, Space, Enter und Pfeiltasten zur Auswahl
function toggleListVisibility(e) {
  const openDropDown =
    spacebarKey.includes(e.keyCode) || e.keyCode === enterKey;

  if (e.keyCode === escapeKey) {
    closeList();
  }

  if (e.type === "click" || openDropDown) {
    listUl.classList.toggle("open");
    iconDown.classList.toggle("expanded");
    listContainer.setAttribute(
      "aria-expanded",
      listUl.classList.contains("open")
    );
  }

  if (e.keyCode === downKey) {
    focusNextListItem(downKey);
  }

  if (e.keyCode === upKey) {
    focusNextListItem(upKey);
  }
}

function focusNextListItem(direction) {
  const activeElementId = document.activeElement.id;
  if (activeElementId === "dropdown__betreff") {
    document.querySelector(`#${listItemIds[0]}`).focus();
  } else {
    const currentActiveElementIndex = listItemIds.indexOf(activeElementId);
    if (direction === downKey) {
      const currentActiveElementIsNotLastItem =
        currentActiveElementIndex < listItemIds.length - 1;
      if (currentActiveElementIsNotLastItem) {
        const nextListItemId = listItemIds[currentActiveElementIndex + 1];
        document.querySelector(`#${nextListItemId}`).focus();
      }
    } else if (direction === upKey) {
      const currentActiveElementIsNotFirstItem = currentActiveElementIndex > 0;
      if (currentActiveElementIsNotFirstItem) {
        const nextListItemId = listItemIds[currentActiveElementIndex - 1];
        document.querySelector(`#${nextListItemId}`).focus();
      }
    }
  }
}
