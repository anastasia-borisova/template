import React from "react"
import Playlists from "./Playlists"

export default function MainPage(props: { categories: any[], onClick : (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void}) {
    return <>
    <div className="button-container">
        <button type="button" className="show-all" onClick={(event) => { props.onClick(event) } }>
            Показать все</button>
    </div>
    <Playlists categories={props.categories} />
    </>
}