// Ищем ноду инпута для получения ширины
const widthNode = document.querySelector("#pic_width");
// Ищем ноду инпута для получения высоты
const heigthNode = document.querySelector("#pic_heigth");
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector(".btn");
// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector("#content");
// Ищем ноду для отображения ошибки при вводе числа
const errorNode = document.querySelector("#input_error")

const MIN_DIM = 100
const MAX_DIM = 300

btnNode.addEventListener('click', () => {
  const width = widthNode.value;
  const heigth = heigthNode.value;
  if (width < MIN_DIM || width > MAX_DIM ||
     heigth < MIN_DIM || heigth > MAX_DIM) {
    errorNode.innerHTML = `<p>Значение одного из чисел не входит
    в заданный диапазон от ${MIN_DIM} до ${MAX_DIM}</p>`;
  }
  else {
    // errorNode.innerHTML = limitVal;
    useRequest(`https://picsum.photos/${width}/${heigth}`,
      displayResult);
  }
})
/**
  * Функция обработки полученного результата
  * apiData - объект с результатом запроса
  */
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

function useRequest(url, callback) {
  fetch(url)
  .then((response) => response.blob())
  .then((myBlob) => {
    const objectURL = URL.createObjectURL(myBlob);

    const imageBlock = `
      <img src="${objectURL}"  />
    `;
    resultNode.innerHTML = imageBlock;
    errorNode.innerHTML = `<br>`;
  })
  .catch(() => { console.log('error') });

  };
