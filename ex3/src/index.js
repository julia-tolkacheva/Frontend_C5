// Ищем ноду инпута для получения количества картинок
const limitNode = document.querySelector("#limit");
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector(".btn");
// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector("#content");
// Ищем ноду для отображения ошибки при вводе числа
const errorNode = document.querySelector("#input_error")

//максимальное и минимальное значение
const MIN_LIM = 1
const MAX_LIM = 10

// Назначаем обработчик кнопки 
btnNode.addEventListener('click', async () => {
  const limitVal = limitNode.value;
  // console.log(limitVal)
  if (limitVal < MIN_LIM || limitVal > MAX_LIM) {
    errorNode.innerHTML = `<p>Значение ${limitVal} не входит
    в заданный диапазон от ${MIN_LIM} до ${MAX_LIM}</p>`;
  }
  else {
    // errorNode.innerHTML = limitVal;
    useRequest(`https://picsum.photos/v2/list/?limit=${limitVal}`,
      displayResult);
  }
})

// Вывод полученных картинок на экран
 function displayResult(apiData) {
  let cards = '';
  
  apiData.forEach(item => {
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
  xhr.open('GET', url, true);
  
  xhr.onload = function() {
    if (xhr.status !== 200) {
      console.log('Статус ответа: ', xhr.status);
      errorNode.innerHTML = `<p>Статус ответа: ${xhr.status}</p>`
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
      errorNode.innerHTML = `<br>`
    }
  };

  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
    errorNode.innerHTML = `<p>Ошибка! Статус ответа: ${xhr.status}</p>`
  };
  
  xhr.send();
}