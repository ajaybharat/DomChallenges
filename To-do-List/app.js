//***********selectitems ************/
const alert = document.querySelector(".alert");
const form = document.querySelector(".todolist-form");
const todolist = document.getElementById("todolist");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".todolist-container");
const list = document.querySelector(".todolist-list");
const clearBtn = document.querySelector(".clear-btn");

//edit option
let editElement;
let editFlag = false;
let editID = "";

//***********eVENT LISTENERS *************/
form.addEventListener("submit", addItem);

clearBtn.addEventListener("click", clearItems);

window.addEventListener("DOMContentLoaded", setUpItems);

// we can do event bubling for edit and delete

// here we will go with naive method

//*************Functions ****************/
function addItem(e) {
  e.preventDefault();
  const value = todolist.value.trim();
  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    createListItem(id, value);
    displayAlert("item added to list", "success");
    //show container
    container.classList.add("show-container");
    //add to local storage
    addToLocalStorage(id, value);
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("item edited", "success");
    // edit local storage item
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("please enter value", "danger");
  }
}

//edit funciton
function editItem(e) {
  const element = e.currentTarget.closest("article");
  //set edit item as we should keep reference of element to change value in UI
  editElement = e.currentTarget.parentElement.previousElementSibling;
  //set form value
  todolist.value = editElement.innerHTML;

  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "edit";
}
//delete funciton
function deleteItem(e) {
  const id = e.currentTarget.closest("article").dataset.id;
  list.removeChild(e.currentTarget.closest("article"));
  if (!list.children.length) {
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");
  setBackToDefault();
  //remove from localstorage
  removeFromLocalStorage(id);
}

//clear items
function clearItems() {
  const items = document.querySelectorAll(".todolist-item");

  if (items.length > 0) {
    items.forEach((each) => {
      list.removeChild(each);
    });
  }
  //   list.innerHTML = "";
  container.classList.remove("show-container");
  displayAlert("empty list", "danger");
  localStorage.removeItem("list");
  setBackToDefault();
}

//display alert

function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  //remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

//set back to default
function setBackToDefault() {
  todolist.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

//add to local storage
function addToLocalStorage(id, value) {
  const todolist = { id, value }; // {id:id,value:value}
  let items = getLocalStorage();
  items.push(todolist);
  localStorage.setItem("list", JSON.stringify(items));
}

//remove item from localstorage
function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter((each) => {
    return each.id !== id;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

//edit local storage
function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map((each) => {
    if (each.id === id) {
      each.value = value;
    }
    return each;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

//get localstorage
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

//set up items
function setUpItems() {
  let items = getLocalStorage();
  if (items.length) {
    items.forEach((each) => {
      createListItem(each.id, each.value);
    });
    //show container
    container.classList.add("show-container");
  }
}

// return list iteam
function createListItem(id, value) {
  const element = document.createElement("article");
  element.className = "todolist-item";
  //   const attr = document.createAttribute('data-id');
  //   attr.value = id;
  //   element.setAttribute(attr);
  element.setAttribute("data-id", id);
  element.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>`;
  const deletbtn = element.querySelector(".delete-btn");
  const editbtn = element.querySelector(".edit-btn");
  deletbtn.addEventListener("click", deleteItem);
  editbtn.addEventListener("click", editItem);
  //append child;
  list.appendChild(element);
}
