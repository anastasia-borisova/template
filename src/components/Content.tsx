import React, { useState, useEffect } from "react";
import { setToken, getPlaylistsByCategories, checkToken } from "../utils/helpers";
import { search } from "../utils/api";
import MainPage from "./MainPage";
import SearchResults from "./SearchResults";

export default function Content(props: { searchValue: string }) {
  const [categories, setCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [content, setContent] = useState(<></>)

  useEffect(() => {
    setToken();
  }, []);

  useEffect(() => {
    getPlaylistsByCategories(showAll).then((result: any) => {
      if(result)
        setCategories(result)
    });
  }, [showAll]);

  useEffect(() => {
    setContent(<MainPage categories={categories} onClick={buttonClick}/>);
  }, [categories]);

  let keyPressTimeout: any = null;

  const keyPress = async(searchQuery: string) => {
    keyPressTimeout = null;
    checkToken();
    const token = localStorage.getItem('token');
    if(token) {
      const queryResult = await search(token, searchQuery);
      return queryResult;
    }
  }

  const setSearchResult = (searchValue: string) => {
    if(searchValue) {
      if(keyPressTimeout) {
        clearTimeout(keyPressTimeout);
      }
      keyPressTimeout = setTimeout(() => {
        keyPress(searchValue).then((result) => {
          if(result)
            setContent(<SearchResults albums={result.albums} artists={result.artists} tracks={result.tracks}/>)
        });
      }, 150);
    }
  }

  useEffect(() => {
    setSearchResult(props.searchValue);
  }, [props.searchValue]);


  const buttonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = event.target as HTMLButtonElement;
    if(target.classList.contains('show-all')) {
      if(target.textContent === 'Показать все') {
        target.textContent = 'Скрыть';
        setShowAll(true);
      }
      else {
        target.textContent = 'Показать все';
        setShowAll(false);
     }
    }
  }

  return (
    <main className="content">
        {content}
    </main>
  );
}