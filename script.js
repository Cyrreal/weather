const link =
  "http://api.weatherstack.com/current?access_key=f2976b78f737b2ff67b8e1b7ac7f8092";

const main = document.querySelector(".all-info");
const change = document.querySelector(".btn-change");
const choseCity = document.querySelector(".change-city");
const allInfo = document.querySelector(".all-info");
const popup = document.getElementById("popup");
const findButton = document.querySelector(".find-city");
const cityInput = document.querySelector(".city-input");
const form = document.querySelector(".form");

let store = {
  city: "Moscow",
  description: 0,
  temperature: 0,
};

const fetchData = async () => {
  const fetchResult = await fetch(`${link}&query=${store.city}`);
  const data = await fetchResult.json();

  const {
    current: { city, weather_descriptions: description, temperature },
  } = data;

  store = {
    ...store,
    temperature,
    description: description[0],
  };

  console.log(store);
  createDiv();
};

const divInfo = () => {
  const { city, description, temperature } = store;
  return `
    <div class="weather-info">
        <h1>${temperature}℃</h1>
        <p>${description} in ${city}
    </div>
    <div >
            <button class="btn-change">Change citty</button>
        </div>`;
};

const createDiv = () => {
  main.innerHTML = divInfo();
  const change = document.querySelector(".btn-change");

  change.addEventListener("click", userClick);
};
const userClick = () => {
  popup.classList.toggle("active");
};
const handleSubmit = (event) => {
  event.preventDefault();
  console.log(store.city);
  fetchData();
  userClick();
};

findButton.addEventListener("click", handleSubmit);

const handleInput = (element) => {
  store = {
    ...store,
    city: element.target.value,
  };
};

cityInput.addEventListener("input", handleInput);
form.addEventListener("submit", handleSubmit);

fetchData();
