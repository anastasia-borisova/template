import { useState, useEffect } from "react";
import { getPlaylistsByCategories, checkToken } from "../utils/helpers";
import { search } from "../utils/api";
import MainPage from "./MainPage";
import SearchResults from "./SearchResults";
import { IPlaylistsByCategory, ISearchResults } from "../utils/interfaces";

export default function Content(props: { searchValue: string }) {
  const [categories, setCategories] = useState<IPlaylistsByCategory[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [content, setContent] = useState(<></>);
  const [buttonText, setButtonText] = useState("Показать все");

  useEffect(() => {
    getPlaylistsByCategories(showAll).then((result: IPlaylistsByCategory[]) => {
      setCategories(result)
    });
  }, [showAll]);

  const buttonClick = () => {
    if(!showAll) {
      setButtonText('Скрыть');
      setShowAll(true);
    }
    else {
      setButtonText('Показать все');
      setShowAll(false);
   }
  }

  useEffect(() => {
    setContent(<MainPage categories={categories} buttonTextContent={buttonText} onClick={buttonClick}/>);
  }, [categories, buttonText]);

  const setSearchResult = async (searchValue: string) => {
    if(searchValue) {
      await checkToken();
      const token = localStorage.getItem('token');
      if(token) {
        search(token, searchValue).then((result: ISearchResults) => {
          setContent(<SearchResults albums={result.albums.items} artists={result.artists.items} tracks={result.tracks.items}/>);
        })
      }     
    }
  }

  useEffect(() => {
    setSearchResult(props.searchValue);
  }, [props.searchValue]);

  return (
    <main className="content">
        {content}
    </main>
  );
}