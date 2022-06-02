import { getCategories, getToken, getPlaylists, search } from './api.js';

// html элемент, в котором находится основной контент на странице
const content = document.querySelector('.content');
// поисковая строка
const input = document.querySelector('.header__search');

/** 
 * Функция для создания заготовки раздела страницы
 * @returns html элемент section, состоящего из h2 - заголовка и div - контейнера для хранения элементов
 */
function createSection() {
  const section = document.createElement('section');
  section.className = 'section';
  const template = `
  <h2 class="section__header"></h2>
  <div class="items"></div>
  `;
  section.insertAdjacentHTML('beforeend', template);
  return section;
}

/**
 *  Функция для создания элемента раздела страницы на основе переданного объекта 
 * @returns ссылку, состоящую из изображения и подписи
*/
function objectToHtmlElement(obj) {
  const a = document.createElement('a');
  a.tabIndex = 0;
  a.classList = 'item link footer__item-link';
  a.target= '_blank';
  a.href = obj.external_urls.spotify;
  const image_url = obj.images.length == 0 ? "photos/default.jpg" : obj.images[0].url;
  const template = `
  <img class="item-image" src="${image_url}" alt="image" width="220" height="220">
  <p class="item-header">${obj.name}</p>
  `;
  a.insertAdjacentHTML('beforeend', template);
  return a;
}

/**
*  Функция для создания раздела с плейлистами 
* @param {object[]} playlists - массив плейлистов
* @param {string} categoryName - название категории плейлистов
* @returns раздел, содержащий название категории и ссылки на плейлисты из категории
*/
function playlistsToHtmlElement(playlists, categoryName) {
  const playlistSection = createSection().cloneNode(true);
  playlistSection.querySelector('.section__header').textContent = categoryName;
  const fragment = document.createDocumentFragment();
  playlists.forEach(playlist => {
    const element = objectToHtmlElement(playlist);
    element.insertAdjacentHTML('beforeend', `<p>${playlist.description}</p>`);
    fragment.appendChild(element);
  });
  playlistSection.querySelector('.items').appendChild(fragment);
  return playlistSection;
}

/**
* Вспомогальная функция для преобразования массива с именами исполнителей в строку
* @param artists - массив с именами исполнителей
* @returns строку с именами исполнителей 
*/
function artistsToString(artists) {
  return artists.map((artist) => artist.name).join(', ');
}

/**
* Функция для создания раздела с альбомами
* @param {object[]} albums - массив альбомов
* @returns раздел, содержащий ссылки на альбомы
*/
function albumsToHtmlElement(albums) {
  const albumSection = createSection().cloneNode(true);
  albumSection.querySelector('.section__header').textContent = 'Альбомы';
  const fragment = document.createDocumentFragment();
  albums.forEach(album => {
    const element = objectToHtmlElement(album);
    element.insertAdjacentHTML('beforeend', `<p>${artistsToString(album.artists)}</p>`);
    fragment.appendChild(element);
  });
  albumSection.querySelector('.items').appendChild(fragment);
  return albumSection;
}

/**
*  Функция для создания раздела с исполнителями
* @param {object[]} artists - массив исполнителей
* @returns раздел, содержащий ссылки на исполнителей
*/
function artistsToHtmlElement(artists) {
  const artistSection = createSection().cloneNode(true);
  artistSection.querySelector('.section__header').textContent = 'Исполнители';
  const fragment = document.createDocumentFragment();
  artists.forEach(artist => {
    fragment.appendChild(objectToHtmlElement(artist));
  });
  artistSection.querySelector('.items').appendChild(fragment);
  return artistSection;
}

/**
*  Функция для создания раздела с треками
* @param {object[]} tracks - массив треков
* @returns раздел, содержащий ссылки на треки
*/
function tracksToHtml(tracks) {
  const trackSection = createSection().cloneNode(true);
  trackSection.querySelector('.section__header').textContent = 'Треки';
  trackSection.className = 'track-section';
  trackSection.querySelector('.items').className = 'tracks';
  tracks.forEach(track => {
    trackSection.querySelector('.tracks').insertAdjacentHTML('beforeend', 
    `<a href='${track.external_urls.spotify}' target='_blank'
     class='track link'>${artistsToString(track.artists)} - ${track.name}</a>`);
  });
  return trackSection;
}

/** 
 * Функция для вывода результатов поиска на страницу 
 * @param {object} obj - объект, содержащий результаты поиска
*/
function searchResults(obj) {
  content.innerHTML = "";
  const albums = obj.albums.items;
  const artists = obj.artists.items;
  const tracks = obj.tracks.items;
  if(albums.length === 0 && artists.length === 0 && tracks.length === 0)
    content.insertAdjacentHTML('afterbegin', '<div class="not-found">По вашему запросу ничего не найдено</div>');
  else {
    const fragment = document.createDocumentFragment();
    if(albums.length)
      fragment.appendChild(albumsToHtmlElement(albums));
    if(artists.length)
      fragment.appendChild(artistsToHtmlElement(artists))
    if(tracks.length)
      fragment.appendChild(tracksToHtml(tracks));
    content.appendChild(fragment);
  }
}

/** 
 * Функция для вывода категорий плейлистов на страницу 
 * Внутри функции создается массив категорий плейлистов
 * Если второй параметр не передан, то выводятся все категории, начиная со start
 * Функция выполняется в том случае, когда есть токен доступа к api
 * @param {number} start - индекс в массиве категорий плейлистов, с которого начинается вывод
 * @param {number} end - индекс в массиве категорий плейлистов, до которого происходит вывод
 */
async function showPlaylists(start, end) {
  checkToken();
  const token = localStorage.getItem('token');
  if(token) {
    clearContent();
    addButton();
    const categories = await getCategories(token);
    if(!end)
      end = categories.length;
    const fragment = document.createDocumentFragment();
    for(let i = start; i < end; i++) {
      const playlists = await getPlaylists(token, categories[i].id);
      if(playlists && playlists.length > 0) 
        fragment.appendChild(playlistsToHtmlElement(playlists, categories[i].name));
    }
  content.appendChild(fragment);
  }
}

/**
 * Функция предназначена для удаления со страницы всех категорий плейлистов, кроме первых пяти
 */
function hidePlaylists() {
  const sections = document.querySelectorAll('.section');
  for(let i = 5; i < sections.length; i++) {
    sections[i].remove();
  }
}

content.addEventListener('click', (event) => {
  if(event.target.classList.contains('show-all')) {
    if(event.target.textContent == 'Показать все') {
      event.target.textContent = 'Скрыть';
      showPlaylists(5);
    }
    else {
      event.target.textContent = 'Показать все';
      hidePlaylists();
   }
  }
});

let keyPressTimeout = null;

/**
 * Функция выполняет поисковый запрос и выводит результаты поиска, в том случае, когда есть токен доступа к api
 * @param {string} searchQuery - поисковый запрос
 */
async function keyPress(searchQuery) {
  keyPressTimeout = null;
  checkToken();
  const token = localStorage.getItem('token');
  if(token) {
    const queryResult = await search(token, searchQuery);
    searchResults(queryResult);
  }
}

input.addEventListener('keypress', () => {
  if(keyPressTimeout) {
    clearTimeout(keyPressTimeout);
  }
  keyPressTimeout = setTimeout(() => {
    keyPress(input.value);
  }, 150);
});

input.addEventListener('search', () => {
  content.innerHTML = '';
  addButton();
  showPlaylists(0, 5);
});

/**
 * Функция для вывода сообщения об ошибке при отсутствии токена доступа
 * @param {string} errorMessage - сообщение об ошибке, в котором указана причина отсутсвия токена доступа
 */
function showTokenError(errorMessage) {
  content.innerHTML = '';
  content.insertAdjacentHTML("afterbegin", `<div class='error'>Сайт временно недоступен<p>${errorMessage}</p></div>`);
}

/**
 * Функция для добавления кнопки Показать все, если она еще не была добавлена
 */
function addButton() {
  if(!document.querySelector(".show-all"))
    content.insertAdjacentHTML('afterbegin', `<div class='button-container'><button type='button'` +
    `class='show-all'>Показать все</button></div>`);
}

/**
 * Функция для очистки content после появления сообщения об ошибке
 */
function clearContent() {
  if(document.querySelector(".error"))
    content.innerHTML = '';
}

/**
 * Функция получает токен доступа и его время жизни и добавляет их в локальное хранилище
 * В случае ошибки при получении токена выводится сообщение и локальное хранилище очищается
 */
async function setToken() {
  const token = await getToken();
  if(token.error) {
    localStorage.clear();
    showTokenError(token.error);
  }
  else {
    localStorage.setItem('token', token.access_token);
    localStorage.setItem('time', token.expires_in * 1000 + Date.now);
  }
}

/**
 * Функция получает токен, если он еще не был получен или вышло его время жизни
 */
function checkToken() {
  if(!localStorage.getItem('token') || Date.now >= localStorage.getItem('time'))
    setToken();
}

showPlaylists(0, 5);