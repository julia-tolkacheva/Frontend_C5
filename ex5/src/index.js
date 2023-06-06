// Ищем ноду инпута для получения номера страницы
const pageNode = document.querySelector("#page");
// Ищем ноду инпута для получения количества картинок
const limitNode = document.querySelector("#limit");
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector(".btn");
// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector("#content");
// Ищем ноду для отображения ошибки при вводе числа
const errorNode = document.querySelector("#input_error");

//максимальное и минимальное значение
const MIN_LIM = 1;
const MAX_LIM = 10;

// Назначаем обработчик кнопки
btnNode.addEventListener("click", () => {
  const pageVal = pageNode.value;
  const limitVal = limitNode.value;
  let inputError = 0;

  if (limitVal < MIN_LIM || limitVal > MAX_LIM) {
    inputError += 1;
  }
  if (pageVal < MIN_LIM || pageVal > MAX_LIM) {
    inputError += 2;
  }

  switch (inputError) {
    case 0:
      useRequest(
        `https://picsum.photos/v2/list/?page=${pageVal}&limit=${limitVal}`,
        displayResult
      );
      break;
    case 1:
      errorNode.innerHTML = `<p>Лимит ${limitVal} вне диапазона
        от ${MIN_LIM} до ${MAX_LIM}</p>`;
      break;
    case 2:
      errorNode.innerHTML = `<p>Номер страницы ${pageVal} вне диапазона
        от ${MIN_LIM} до ${MAX_LIM}</p>`;
      break;
    case 3:
      errorNode.innerHTML = `<p>Номер страницы ${pageVal} и лимит ${limitVal}
        вне диапазона от ${MIN_LIM} до ${MAX_LIM}</p>`;
      break;
    default:
      console.log(
        `Что то не так: значение inputError = ${inputError} не равно 0/1/2/3`
      );
  }
});

// Вывод полученных картинок на экран
function displayResult(apiData) {
  let cards = "";

  apiData.forEach((item) => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });

  // console.log('end cards', cards);

  resultNode.innerHTML = cards;
}

// Отправка запроса на сайт с картинками и затем вызов колбэк
function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onload = function () {
    if (xhr.status !== 200) {
      console.log("Статус ответа: ", xhr.status);
      errorNode.innerHTML = `<p>Статус ответа: ${xhr.status}</p>`;
    } else {
      const result = JSON.parse(xhr.response);
      localStorage.setItem("last_request", xhr.response);
      if (callback) {
        callback(result);
      }
      errorNode.innerHTML = `<br>`;
    }
  };

  xhr.onerror = function () {
    console.log("Ошибка! Статус ответа: ", xhr.status);
    errorNode.innerHTML = `<p>Ошибка! Статус ответа: ${xhr.status}</p>`;
  };

  xhr.send();
}

window.addEventListener("load", (event) => {
  console.log("страница загружена x");
  const lastRequest = localStorage.getItem("last_request");
  if (lastRequest) {
    console.log(lastRequest);
    displayResult(JSON.parse(lastRequest))
  } else {
    console.log("ничего ранее не загружалось");
  }
});
