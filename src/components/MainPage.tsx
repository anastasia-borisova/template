import React from "react"
import { IPlaylistsByCategory } from "../utils/interfaces"
import Playlists from "./Playlists"

export default function MainPage(props: { categories: IPlaylistsByCategory[], buttonTextContent: string, onClick : () => void}) {
    return <>
    <div className="button-container">
        <button type="button" className="show-all" onClick={() => { props.onClick() } }>
          {props.buttonTextContent}
        </button>
    </div>
    <Playlists categories={props.categories} />
    </>
}