const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const body = document.querySelector("body");
let darkMode = localStorage.getItem("darkMode");
let lightMode = localStorage.getItem("lightMode");
let violetMode = localStorage.getItem("violetMode");
const userPrefersLight =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches;

if (userPrefersLight) {
  body.classList.add("light");
  moon.style.display = "block";
  sun.style.display = "none";
}
if (body.classList)
function handleSunClick() {
  sun.style.display = "none";
  moon.style.display = "block";
  body.classList.add("light");
  enableLightMode();
  disableDarkMode();
}
function handleMoonClick() {
  moon.style.display = "none";
  sun.style.display = "block";
  body.classList.remove("light");
  enableDarkMode();
  disableLightMode();
}
if(window.localStorage.getItem("lightMode") === "enabled"){
moon.style.display = "block";
sun.style.display = "none"
}

moon.addEventListener("click", handleMoonClick);
sun.addEventListener("click", handleSunClick);

function enableDarkMode() {
  localStorage.setItem("darkMode", "enabled");
}
function disableDarkMode() {
  localStorage.setItem("darkMode", null);
}
function enableLightMode() {
  localStorage.setItem("lightMode", "enabled");
}
function disableLightMode() {
  localStorage.setItem("lightMode", null);
}
if (darkMode === "enabled") {
  body.classList.remove("light");
} else if (lightMode === "enabled") {
  body.classList.add("light");
}

// TODO FUNCTIONALITY
const todoText = document.querySelectorAll(".todo-text");
const todoCheckbox = document.querySelectorAll(".todo-checkbox");
const todoInput = document.getElementById("todo-input");
const container = document.querySelector(".todo-container");
const todoElements = document.querySelectorAll(".todo");
const hoverElements = document.querySelectorAll(".hover");
const removeImgs = document.querySelectorAll(".remove");
const itemLength = document.querySelectorAll(".itemLength");
const clear = document.querySelectorAll(".clear");
const all = document.querySelectorAll(".all");
const active = document.querySelectorAll(".active");
const completed = document.querySelectorAll(".completed");
// ITEMS LIFT LENGTH
function itemsLiftLength(items) {
  return itemLength.forEach((item) => (item.textContent = items));
}
// ALL EVENT LISTENERS FOR NEW ELEMENTS
function eventListenersForNewElements(newElement) {
  newElement.children[2].addEventListener("click", handleCompletedTodo);
  newElement.children[0].addEventListener("click", handleCheckbox);
  newElement.addEventListener("mousemove", hoverMouseIn);
  newElement.addEventListener("mouseout", hoverMouseOut);
  newElement.children[3].addEventListener("click", removeCurrentTodo);
  newElement.children[2].addEventListener("mousemove", elementHoverEffect);
  newElement.children[2].addEventListener("mouseout", removeHoverEffect);
  newElement.children[0].addEventListener("mouseenter", elementHoverEffect);
  newElement.children[0].addEventListener("mouseout", removeHoverEffect);
  newElement.addEventListener("dragstart", dragStart);
  newElement.addEventListener("dragover", dragOver);
  newElement.addEventListener("dragenter", dragEnter);
  newElement.addEventListener("dragleave", dragLeave);
  newElement.addEventListener("drop", dragDrop);
  newElement.addEventListener("dragend", dragEnd);
}
// ADD TODO TO THE LIST
function handleUserInput(e) {
  let value = todoInput.value;
  if (e.key === "Enter" && value.length > 0) {
    let newElement = document.createElement("li");
    newElement.classList.add("todo");
    newElement.setAttribute("draggable", true);
    newElement.innerHTML = `
    <input type="checkbox" aria-labelledby="checkbox" class="todo-checkbox border"></input>
    <div></div>
    <p class="todo-text">${value}</p>
    <img class="remove" src="./images/icon-cross.svg" alt="remove">`;
    container.insertAdjacentElement("afterbegin", newElement);
    // IF ADDED NEW TODO ON COMPLETED SECTION
    completed.forEach((element) => {
      if (element.style.color === "var(--bright-Blue)") {
        newElement.style.display = "none";
      }
    });
    todoInput.value = "";
    // ADD TO LOCAL STORAGE
    addToLocalStorage(value, (newElement.children[2].className === "todo-text done") ? true : false);
    // CALL THE FUNCTION TO ADD EVENT LISTENER
    eventListenersForNewElements(newElement)
    // UPDATE ITEMS LENGTH
    itemsLiftLength(parseInt(itemLength[0].textContent) + 1);
  }
}
// HANDLE COMPLETED TODO
function handleCompletedTodo() {
  toggleTrueLocalStorage(this.innerText)
  this.classList.toggle("done");
  this.parentElement.children[0].checked =
    !this.parentElement.children[0].checked;
  let allElement = [...container.children];
  allElement.forEach(() => {
    // IF CLICKED COMPLETE IN ACTIVE SECTION
    active.forEach((element) => {
      if (element.style.color === "var(--bright-Blue)") {
        this.parentElement.style.display = "none";
      }
    });
    completed.forEach((element) => {
      if (element.style.color === "var(--bright-Blue)") {
        this.parentElement.style.display = "none";
      }
    });
  });
  if (this.className === "todo-text done") {
    itemsLiftLength(parseInt(itemLength[0].textContent) - 1);
  } else {
    itemsLiftLength(parseInt(itemLength[0].textContent) + 1);
  }
}
// SYNC CHECKBOX WITH OVERLINE IN TEXT
function handleCheckbox() {
  toggleTrueLocalStorage( this.parentElement.children[2].innerText)
  this.parentElement.children[2].classList.toggle("done");
  let allElement = [...container.children];
  allElement.forEach(() => {
    // IF CLICKED COMPLETE IN ACTIVE SECTION
    active.forEach((element) => {
      if (element.style.color === "var(--bright-Blue)") {
        this.parentElement.style.display = "none";
      }
    });
    completed.forEach((element) => {
      if (element.style.color === "var(--bright-Blue)") {
        this.parentElement.style.display = "none";
      }
    });
  });
  if (this.parentElement.children[2].className === "todo-text done") {
    itemsLiftLength(parseInt(itemLength[0].textContent) - 1);
  } else {
    itemsLiftLength(parseInt(itemLength[0].textContent) + 1);
  }
}
// REMOVE ALL COMPLETED TODO
function removeCompletedTodo(e) {
  const completedElements = document.querySelectorAll(".done");
  e.preventDefault;
  completedElements.forEach((element) => {
    element.parentElement.remove();
  });
  removeDoneFromLocalStorage(completedElements)
}
// HOVER EFFECT FOR REMOVE EACH TODO
function hoverMouseIn() {
  this.children[3].style.display = "inline-block";
}
function hoverMouseOut() {
  this.children[3].style.display = "none";
}
// REMOVE CURRENT TODO
function removeCurrentTodo() {
  this.parentElement.remove();
  deleteItemFromLocalStorage(this)
  if (this.previousElementSibling.className === "todo-text done") {
    return;
  } else {
    itemsLiftLength(parseInt(itemLength[0].textContent) - 1);
  }
}
// FILTER ALL TODO
let allMyTodo = [...container.children];
function filterAllTodo() {
  all.forEach((element) => (element.style.color = "var(--bright-Blue)"));
  active.forEach((element) => (element.style.color = "var(--DarkGrayishBlue)"));
  completed.forEach(
    (element) => (element.style.color = "var(--DarkGrayishBlue)")
  );

  allMyTodo = [...container.children];
  allMyTodo.filter((todo) => {
    todo.style.display = "flex";
  });
}

// FILTER ACTIVE TODO
function filterActiveTodo() {
  active.forEach((element) => (element.style.color = "var(--bright-Blue)"));
  all.forEach((element) => (element.style.color = "var(--DarkGrayishBlue)"));
  completed.forEach(
    (element) => (element.style.color = "var(--DarkGrayishBlue)")
  );

  allMyTodo = [...container.children];
  allMyTodo.filter((todo) => {
    if (todo.children[2].className !== "todo-text done") {
      todo.style.display = "flex";
    } else {
      todo.style.display = "none";
    }
  });
}
// FILTER COMPLETED TODO
function filterCompletedTodo() {
  completed.forEach((element) => (element.style.color = "var(--bright-Blue)"));
  all.forEach((element) => (element.style.color = "var(--DarkGrayishBlue)"));
  active.forEach((element) => (element.style.color = "var(--DarkGrayishBlue)"));
  allMyTodo = [...container.children];
  allMyTodo.filter((todo) => {
    if (todo.children[2].className === "todo-text done") {
      todo.style.display = "flex";
    } else {
      todo.style.display = "none";
    }
  });
}
// HOVER EFFECT FOR ACTIVE AND ALL AND COMPLETED ELEMENTS
function handleHoverFilter() {
  if (this.style.color === "var(--bright-Blue)") {
    return;
  } else if (body.className === "light") {
    this.style.color = "var(--text-color)";
  } else {
    this.style.color = "var(--text)";
  }
}
function handleRemoveHover() {
  if (this.style.color === "var(--bright-Blue)") {
    return;
  } else if (body.className === "light") {
    this.style.color = "var(--soft-text-color)";
  } else {
    this.style.color = "var(--DarkGrayishBlue)";
  }
}
all.forEach((element) => (element.style.color = "var(--bright-Blue)"));

function elementHoverEffect() {
  this.parentElement.children[1].classList.add("gradient-hover");
  this.parentElement.children[0].classList.remove("border");
}
function removeHoverEffect() {
  this.parentElement.children[1].classList.remove("gradient-hover");
  this.parentElement.children[0].classList.add("border");
}
// FUNCTION TO MOVE ITEM FROM ARRAY TO ANOTHER PLACE
function array_move(arr, oldIndex, newIndex) {
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  return arr;
};
// DRAG AND DROP FUNCTIONALITY
let firstElement;
function dragStart() {
  this.style.opacity = "20%";
  firstElement = this;
}
function dragOver(e) {
  e.preventDefault();
}
function dragEnter() {
  this.style.opacity = "50%";
}
function dragLeave() {
  if (this === firstElement) return;
  this.style.opacity = "100%";
}
function dragDrop() {
  firstElement.style.opacity = "100%";
  this.style.opacity = "100%";
  let allElement = [...this.parentElement.children];
  if (allElement.indexOf(firstElement) > allElement.indexOf(this)) {
    this.insertAdjacentElement("beforebegin", firstElement);
  } else {
    this.insertAdjacentElement("afterend", firstElement);
  }
  addDragDropToLocalStorage(firstElement.children[2].innerText, this.children[2].innerText)
}
function dragEnd() {
  firstElement.style.opacity = "100%";
}
// ADD TODO TO LOCAL STORAGE
function addToLocalStorage(todo, isChecked) {
  let toDos;
  if (localStorage.getItem("toDos") === null) {
    toDos = []
  } else {
    toDos = JSON.parse(localStorage.getItem("toDos"))
  }
  let newItem = {
    todo,
    isChecked,
  }
  toDos.push(newItem)
  localStorage.setItem("toDos", JSON.stringify(toDos))

}
// UPDATE UI TO THE USER ON REFRESH
function getItemsFromLocalStorage() {
  let toDos;
  if (localStorage.getItem("toDos") === null) {
    toDos = []
  } else {
    toDos = JSON.parse(localStorage.getItem("toDos"))
  }
  toDos.forEach(todo => {
    let value = todo.todo;
    let textClass;
    let checked;
    // CHECK IF THE ELEMENT DONE OR NOT
    if (todo.isChecked === true) {
      textClass = "todo-text done"
      checked = "checked"
    } else {
      textClass = "todo-text"
      checked = ""
    }
    let newElement = document.createElement("li");
    newElement.classList.add("todo");
    newElement.setAttribute("draggable", true);
    newElement.innerHTML = `
    <input type="checkbox" aria-labelledby="checkbox" class="todo-checkbox border" ${checked}></input>
    <div></div>
    <p class="${textClass}">${value}</p>
    <img class="remove" src="./images/icon-cross.svg" alt="remove">`;
    container.insertAdjacentElement("afterbegin", newElement);
    // ADD EVENT LISTENER TO MY TODOS
    eventListenersForNewElements(newElement)
  })
}
// DELETE ELEMENT FROM LOCAL STORAGE ON DELETE
function deleteItemFromLocalStorage(todo) {
  let toDos;
  if (localStorage.getItem("toDos") === null) {
    toDos = []
  } else {
    toDos = JSON.parse(localStorage.getItem("toDos"))
  }
  const todoText = todo.previousElementSibling.innerText;
  toDos.splice(toDos.indexOf(todoText), 1)
  localStorage.setItem("toDos", JSON.stringify(toDos))
}
// DELETE ELEMENT FROM LOCAL STORAGE ON DELETE
function removeDoneFromLocalStorage(doneToDos) {
  let toDos;
  if (localStorage.getItem("toDos") === null) {
    toDos = []
  } else {
    toDos = JSON.parse(localStorage.getItem("toDos"))
  }
  doneToDos.forEach(todo => {
    const todoText = todo.innerText;
    toDos.splice(toDos.indexOf(todoText), 1);
    localStorage.setItem("toDos", JSON.stringify(toDos));
  })
}
// TOGGLE TRUE OR FALSE IN LOCAL STORAGE
function toggleTrueLocalStorage(todoText) {
  let toDos;
  if (localStorage.getItem("toDos") === null) {
    toDos = [];
  } else {
    toDos = JSON.parse(localStorage.getItem("toDos"));
  }
  const indexOfTodo = toDos.findIndex(todo => todo.todo === todoText);
  toDos[indexOfTodo].isChecked = !toDos[indexOfTodo].isChecked;
  localStorage.setItem("toDos", JSON.stringify(toDos));
}
// SAVE DRAG AND DROP PLACES ON REFRESH
function addDragDropToLocalStorage(firstElement, secondElement) {
  let toDos;
  if (localStorage.getItem("toDos") === null) {
    toDos = [];
  } else {
    toDos = JSON.parse(localStorage.getItem("toDos"));
  }
  const indexOfFirstElement = toDos.findIndex(todo => todo.todo === firstElement);
  const indexOfSecondElement = toDos.findIndex(todo => todo.todo === secondElement);
  array_move(toDos, indexOfFirstElement, indexOfSecondElement);
  localStorage.setItem("toDos", JSON.stringify(toDos));
}
// INPUT TODO
todoInput.addEventListener("keypress", handleUserInput);
// REMOVE COMPLETED TODO
clear.forEach((element) =>
  element.addEventListener("click", removeCompletedTodo)
);
// FILTER MY TODO
all.forEach((element) => element.addEventListener("click", filterAllTodo));
active.forEach((element) =>
  element.addEventListener("click", filterActiveTodo)
);
completed.forEach((element) =>
  element.addEventListener("click", filterCompletedTodo)
);
hoverElements.forEach((element) => {
  element.addEventListener("mouseenter", handleHoverFilter);
  element.addEventListener("mouseout", handleRemoveHover);
});
// CALL THE FUNCTION TO ADD NEW ELEMENTS
getItemsFromLocalStorage();
// FILTER MY TODOS THAT NOT HAS CLASS OF DONE
const allChildren = [...container.children];
let myLastChildren = [];
allChildren.forEach(child => {
  if (child.children[2].className === "todo-text") {
    myLastChildren.push(child);
  } else {
    return;
  }
})
itemsLiftLength(myLastChildren.length);
