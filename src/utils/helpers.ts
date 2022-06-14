import { getToken, getCategories, getPlaylists } from "./api";
import { IPlaylistsByCategory, IObject, IItem } from "./interfaces";
export { artistsToString, createMarkup, setToken, getPlaylistsByCategories, checkToken }

/**
* Вспомогальная функция для преобразования массива с именами исполнителей в строку
* @param artists - массив с именами исполнителей
* @returns строку с именами исполнителей через запятую
*/
function artistsToString(artists: IObject[]): string {
    return artists.map((artist) => artist.name).join(', ');
}

/**
 * Функция для создания из строки объекта, который можно будет преобразовать в html 
 * в атрибуте dangerouslySetInnerHTML
 * @param str строка, которая может содержать html 
 * @returns объект с ключом __html и строкой
 */
function createMarkup(str: string): { __html: string } {
    return {__html: str};
}

/**
 * Функция получает токен доступа и его время жизни и добавляет их в локальное хранилище
 */
async function setToken(): Promise<void> {
    const token = await getToken();
    if(!token.access_token) 
      localStorage.clear();
    else {
      localStorage.setItem('token', token.access_token);
      localStorage.setItem('time', (token.expires_in * 1000 + Date.now()).toString());
    }
}

/**
 * Функция получает токен, если он еще не был получен или вышло его время жизни
 */
async function checkToken(): Promise<void> {
    if(!localStorage.getItem('token') || Date.now() >= parseInt(localStorage.getItem('time') || '')) 
      await setToken();
}

/**
 * Функция создает массив объектов, которые состоят из названия категории плейлистов и массива плейлистов
 * @param showAllCategories если параметр равен true, то в массив добавляются все категории плейлистов, 
 * иначе добавляются первые пять категорий
 * @returns массив объектов, которые состоят из названия категории плейлистов и массива плейлистов
 */
async function getPlaylistsByCategories(showAllCategories: boolean): Promise<IPlaylistsByCategory[]> {
    await checkToken();
    const token = localStorage.getItem('token');
    const playlistsByCategory: IPlaylistsByCategory[] = [];
    if(token) {
      const categories = await getCategories(token);
      let end = 5;
      if(showAllCategories)
        end = categories.length;
      for(let i = 0; i < end; i++) {
        const playlists : IItem[] = await getPlaylists(token, categories[i].id);
        if(playlists && playlists.length > 0) {
          playlistsByCategory.push({ id: categories[i].id, name: categories[i].name, playlists : playlists });
      }  
    }
  }
  return playlistsByCategory;
}