var UsersData;

//select elements
const tbody = document.querySelector("tbody");
const inputContainer = document.querySelector(".input-container");
const inputs = document.querySelectorAll("input");

//event listeners
window.addEventListener("DOMContentLoaded", fetchUsers);

inputContainer.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) enterEventHandler(e);
});

inputs.forEach((each) => {
  each.addEventListener("blur", enterEventHandler);
});

async function fetchUsers() {
  UsersData = await fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((res) => {
      return res;
    });
  tbody.innerHTML = displayItems(UsersData);
}

function displayItems(users) {
  console.log(users);
  var displaydata = users
    .map((each, idx) => {
      return `<tr><td>${idx + 1}</td><td>${each.name}</td><td>${
        each.username
      }</td><td>${each.email}</td><td>${each.phone}</td></tr>`;
    })
    .join("");
  return displaydata;
}

function enterEventHandler(e) {
  console.log(e);
  const value = e.target.value.trim().toLowerCase();
  // if (!value ) return;
  var items;
  const filterparticularItems = (str) => {
    items = UsersData.filter((each) => {
      return each[str].toLowerCase().includes(value);
    });
  };

  switch (e.target.id) {
    case "name":
      filterparticularItems("name");
      break;
    case "username":
      filterparticularItems("username");
      break;
    case "email":
      filterparticularItems("email");
      break;
    case "phone":
      filterparticularItems("phone");
      break;
  }

  tbody.innerHTML = displayItems(items);
}

function blurEventhandler(e) {}
