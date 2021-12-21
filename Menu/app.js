const menu = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "./images/item-1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "./images/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "./images/item-10.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "country delight",
    category: "breakfast",
    price: 20.99,
    img: "./images/item-1.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "./images/item-10.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "./images/item-2.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "bacon overflow",
    category: "breakfast",
    price: 8.99,
    img: "./images/item-1.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "./images/item-10.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "quarantine buddy",
    category: "shakes",
    price: 16.99,
    img: "./images/item-2.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
];

const displayMenuItems = (menuItems) => {
  var displayMenu = menuItems
    .map((each) => {
      return `<article class="menu-item">
  <img src=${each.img} alt="menu-item" class="photo" />
  <div class="item-info">
  <header>
  <h4>${each.title}</h4>
  <h4 class="price">${each.price}</h4>
  </header>
  <p class="item-text">
  ${each.desc}
  </p>
  </div>
  </article>`;
    })
    .join("");
  return displayMenu;
};

const sectionCenter = document.querySelector(".section-center");
const filterCintent = document.querySelector(".btn-container");

window.addEventListener("DOMContentLoaded", function () {
  sectionCenter.innerHTML = displayMenuItems(menu);
  const categories = menu.reduce(
    (acc, curr) => {
      if (!acc.includes(curr.category)) {
        acc.push(curr.category);
      }
      return acc;
    },
    ["all"]
  );
  const filterButton = categories
    .map((each) => {
      return `<button class="filter-btn" type="button">${each}</button>`;
    })
    .join("");
  filterCintent.innerHTML = filterButton;
});

filterCintent.addEventListener("click", function (e) {
  var buttontext = e.target.textContent.trim();
  if (buttontext === "all") {
    sectionCenter.innerHTML = displayMenuItems(menu);
    return;
  }
  var filteredItems = menu.filter((each) => {
    return each.category === buttontext;
  });
  sectionCenter.innerHTML = displayMenuItems(filteredItems);
});
