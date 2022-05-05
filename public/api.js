export { getCategories, getToken, getPlaylists, search }

/**
 * Функция для получения токена доступа 
 * При возникновении ошибки в консоль выводится сообщение
 * @returns токен доступа 
*/
async function getToken() {
  const client_id = 'cc54ff5069b04ecbb4cf473f445e9872';
  const client_secret = '5a84d500c04542fe87ca70dee98313fc';
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
      },
      body: 'grant_type=client_credentials'
    })
    .then((res) => {
      if(!res.ok)
        throw new Error(`Error ${res.status}`);
      else
        return res.json();
    });
    return response.access_token;
  }
  catch(error) {
    console.log(error.message);
  }
}

/**
 * Функция для получения категорий плейлистов Spotify
 * При возникновении ошибки в консоль выводится сообщение
 * @param {string} token - токен доступа
 * @returns массив категорий плейлистов Spotify
 */
async function getCategories(token) {
  try {
    const response = await fetch('https://api.spotify.com/v1/browse/categories', {
      method: 'GET',
      headers: { 
        'Authorization' : 'Bearer ' + token,
        'Content-Type' : 'application/json'
        },
    })
    .then((res) => {
      if(!res.ok)
        throw new Error(`Error ${res.status}`);
      else
        return res.json();
    });
    return response.categories.items;
  }
  catch(error) {
    console.log(error.message);
  }
}

/**
* Функция для получения плейлистов по идентификатору категории
* При возникновении ошибки в консоль выводится сообщение
* @param {string} token - токен доступа
* @param {string} category_id - категория плейлиста
* @returns массив плейлистов, входящих в категорию category_id
*/
async function getPlaylists(token, category_id) {
  try {
    const response = await fetch(`https://api.spotify.com/v1/browse/categories/${category_id}/playlists?limit=10`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token },
    })
    .then((res) => {
      if(!res.ok)
        throw new Error(`Error ${res.status}`);
      else
        return res.json();
    });
    return response.playlists.items;
  }
  catch(error) {
    console.log(error.message);
  }
}

/**
* Функция для получения альбомов, исполнителей и треков, соответствующих поисковому запросу
* При возникновении ошибки в консоль выводится сообщение
* @param {string} token - токен доступа 
* @param {string} searchQuery - поисковый запрос
* @returns объект, содержащий альбомы, исполнителей и треки, которые соответствуют поисковому запросу
*/
async function search(token, searchQuery) {
  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=album,artist,track`, {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + token }
    })
    .then((res) => {
      if(!res.ok)
        throw new Error(`Error ${res.status}`);
      else
        return res.json();
    });
    return response;
  }
  catch(error) {
    console.log(error.message);
  }
}


