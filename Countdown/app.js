const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

let tempdate = new Date().getDate();
let tempyear = new Date().getFullYear();
let tempmonth = new Date().getMonth();

let futuredate = new Date(tempyear, tempmonth, tempdate, 22, 53, 0);

const year = futuredate.getFullYear();
const hours = futuredate.getHours();
const minutes = futuredate.getMinutes();
let month = futuredate.getMonth();
month = months[month];
const date = futuredate.getDate();

const weekday = weekdays[futuredate.getDay()];
giveaway.innerText = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}`;

//future time in ms
const futureTime = futuredate.getTime();

const getRemaingTime = () => {
  const today = new Date().getTime();
  const t = futureTime - today;

  //values in ms
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  //calculate all values
  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  //set values array
  const values = [days, hours, minutes, seconds];

  function format(item) {
    if (items < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  items.forEach((each, index) => {
    each.innerHTML = format(values[index]);
  });
  if (t < 0) {
    clearInterval(coutdown);
    deadline.innerHTML = `<h4 class="expires">Sorry, this give away was expired</h4>`;
  }
};
//countdowm
let coutdown = setInterval(getRemaingTime, 1000);
getRemaingTime();
