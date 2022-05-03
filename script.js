const main = document.querySelector(".all-info");
const change = document.querySelector(".btn-change");
const choseCity = document.querySelector(".change-city");
const allInfo = document.querySelector(".all-info");
const popup = document.getElementById("popup");
const findButton = document.querySelector(".find-city");
const cityInput = document.querySelector(".city-input");
const form = document.querySelector(".form");

const geoLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    navigator.geolocation.getCurrentPosition(getCityByIp);
  }
};

const showPosition = (position) => {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude, longitude);
  let limit = 1;
  const openWeather = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${limit}&appid=a44763c6c3839a45a3942f0d92a8bb3b`;

  const fetchData = async () => {
    const fetchResult = await fetch(openWeather);
    const data = await fetchResult.json();
    console.log(data);
    const weatherForCity = `https://api.openweathermap.org/data/2.5/weather?q=${data[0].name}&appid=a44763c6c3839a45a3942f0d92a8bb3b`;

    const weatherByData = async () => {
      const weatherResult = await fetch(weatherForCity);
      const dataByCity = await weatherResult.json();
      const { name } = dataByCity;
      const { temp } = dataByCity.main;
      const { description } = dataByCity.weather[0];

      const divInfo = () => {
        return `
          <div class="weather-info">
              <h1>${Math.floor((temp - 32) / (5 * 9))}℃</h1>
              <p>${description} in ${name}
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

      createDiv();
    };
    weatherByData();
  };

  fetchData();
};

function getCityByIp() {
  fetch("https://api.ipify.org/?format=json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_38nQZzdTsm4C9PFIdiAE9383WbSKe&ipAddress=${data.ip}`
      )
        .then((response) =>
          //   data.json();
          response.json()
        )
        .then((data) => getWeather(data.location.city));
    });
}

function getWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a44763c6c3839a45a3942f0d92a8bb3b`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      weatherByData(data);
    });
}
getCityByIp();

const weatherByData = ({ name, main, weather }) => {
  const drawCard = divInfo(name, main.temp, weather[0].description);

  createDiv(drawCard);
};
// weatherByData();

const divInfo = (name, temp, description) => {
  console.log(name, temp, description);
  return `
      <div class="weather-info">
          <h1>${Math.floor((temp - 32) / (5 * 9))}℃</h1>
          <p>${description} in ${name}
      </div>
      <div >
              <button class="btn-change">Change citty</button>
          </div>`;
};

const createDiv = (drawCard) => {
  main.innerHTML = drawCard;
  const change = document.querySelector(".btn-change");

  change.addEventListener("click", userClick);
};
geoLocation();

const userClick = () => {
  popup.classList.toggle("active");
};
const handleSubmit = (event) => {
  event.preventDefault();
  getWeather(cityInput.value);
  userClick();
};

findButton.addEventListener("click", handleSubmit);

const handleInput = (element) => {
  return element.target.value;
};

cityInput.addEventListener("input", handleInput);
form.addEventListener("submit", handleSubmit);
