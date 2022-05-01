const link =
  "http://api.weatherstack.com/current?access_key=f2976b78f737b2ff67b8e1b7ac7f8092"; /// создаю переменную для ссылки

const main = document.querySelector(".all-info");
const change = document.querySelector(".btn-change");
const choseCity = document.querySelector(".change-city");
const allInfo = document.querySelector(".all-info");
const popup = document.getElementById("popup");
const findButton = document.querySelector(".find-city");
const cityInput = document.querySelector(".city-input");
const form = document.querySelector(".form"); //// получаю все нужные мне узлы

let object = {
  city: "Moscow",
  description: 0,
  temperature: 0,
}; ////создаю объект с которым буду работать

//// Пишу асинхронную функцию для получения данных с сервера и отрисовки блоков по полученным данным
const fetchData = async () => {
  const fetchResult = await fetch(`${link}&query=${object.city}`);
  // console.log(fetchResult);
  const data = await fetchResult.json(); //// получаю объект с сервера
  console.log(data);
  const {
    current: { city, weather_descriptions: description, temperature },
  } = data; ////деструктуризирую полученный объект

  object = {
    ...object,
    temperature,
    description: description[0], ////перезаписываю свой объект, description[0] так как с сервера под этим ключом приходит массив с 1 элементом, обращаюсь к нему
  };

  console.log(object);
  createDiv(); ////отрисовываю объект как приходит промис
};

const divInfo = () => {
  ////отдельная функция для создания нового узла
  const { city, description, temperature } = object;
  return `
    <div class="weather-info">
        <h1>${temperature}℃</h1>
        <p>${description} in ${city}
    </div>
    <div >
            <button class="btn-change">Change citty</button>
        </div>`;
};

////Функция для отрисовки, которая вставляет созданный мной объект
const createDiv = () => {
  main.innerHTML = divInfo();
  const change = document.querySelector(".btn-change");

  change.addEventListener("click", userClick); ////добавляю слушатель внутри этой функции, так как до ее вызова, узла не существует, а функция не выполнится пока промис не придет
};

////все что ниже связанно с добавлением слушателей на кнопочки и переключением классов
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
  object = {
    ...object,
    city: element.target.value, ////перезаписываю элемент, меняя в нем город на введенный пользователем
  };
};

cityInput.addEventListener("input", handleInput);
form.addEventListener("submit", handleSubmit);

////вызываю  свою асинхронную функцию
fetchData();
