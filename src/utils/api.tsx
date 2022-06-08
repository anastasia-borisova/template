export { getCategories, getToken, getPlaylists, search }

class Options {
  /**
   * Класс для создания дополнительных настроек запроса
   * 
   * @constructor
   * @this {Options}
   * @param {string} token - токен доступа
   */
  token: string; 

  constructor(token: string = "") {
    this.token = token;
  }

  /**
   * Создает дополнительные настройки для GET запросов, включает в себя заголовки 
   * Authorization и Content-Type
   * @this {Options}
   * @returns объект с дополнительными настройками для GET запросов
  */
  getOptions(): object {
    return {
      method: 'GET',
      headers: { 
        'Authorization' : 'Bearer ' + this.token,
        'Content-Type' : 'application/json',
      }
    };
  }
  /**
   * Создает дополнительные настройки для POST запросов, включает в себя заголовки 
   * Authorization и Content-Type и тело запроса 
   * @this {Options}
   * @returns объект с дополнительными настройками для POST запросов
  */
  postOptions(client_id: string, client_secret: string): object {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
      },
      body: 'grant_type=client_credentials'
    }
  }
}

/**
 * Функция для выполнения запросов к api
 * При возникновении ошибки в консоль выводится сообщение
 * @param {string} url - адрес, по которому выполняется запрос
 * @param {object} init - дополнительные параметры для настройки запроса
 * @returns ответ на запрос в формате json
 */
async function queryToApi(url: string, init: object): Promise<any> {
  try {
    const response = await fetch(url, init);
    if(!response.ok)
        throw new Error(`Error ${response.status}`);
    else {
      const json = await response.json();
      return json;
    }
  }
  catch(error: any) {
    console.log(error.message);
  }
}

/**
 * Функция для получения токена доступа 
 * @returns объект, содержащий токен доступа и время его жизни
*/
async function getToken(): Promise<any> {
  const client_id = 'cc54ff5069b04ecbb4cf473f445e9872';
  const client_secret = '5a84d500c04542fe87ca70dee98313fc';
  const url = 'https://accounts.spotify.com/api/token';
  const options = new Options();
  const response = await queryToApi(url, options.postOptions(client_id, client_secret));
  return response;
}

/**
 * Функция для получения категорий плейлистов Spotify
 * @param {string} token - токен доступа
 * @returns массив категорий плейлистов Spotify
 */
async function getCategories(token: string): Promise<any> {
  const url = 'https://api.spotify.com/v1/browse/categories?limit=10&country=US';
  const options = new Options(token);
  const response = await queryToApi(url, options.getOptions());
  if(response?.categories)
    return response.categories.items;
}

/**
* Функция для получения плейлистов по идентификатору категории
* @param {string} token - токен доступа
* @param {string} category_id - категория плейлиста
* @returns массив плейлистов, входящих в категорию category_id
*/
async function getPlaylists(token: string, category_id: string): Promise<any> {
  const url = `https://api.spotify.com/v1/browse/categories/${category_id}/playlists?limit=10&country=US`;
  const options = new Options(token);
  const response = await queryToApi(url, options.getOptions());
  if(response?.playlists)
    return response.playlists.items;
}

/**
* Функция для получения альбомов, исполнителей и треков, соответствующих поисковому запросу
* @param {string} token - токен доступа 
* @param {string} searchQuery - поисковый запрос
* @returns объект, содержащий альбомы, исполнителей и треки, которые соответствуют поисковому запросу
*/
async function search(token: string, searchQuery: string): Promise<any> {
  const url = `https://api.spotify.com/v1/search?q=${searchQuery}&type=album,artist,track`;
  const options = new Options(token);
  const response = await queryToApi(url, options.getOptions());
  return response;
}