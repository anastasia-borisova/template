import { IItem } from "../utils/interfaces";
import Section from "./Section";
import TrackSection from "./TrackSection";

export default function SearchResults(props: { albums: IItem[], artists: IItem[], tracks: IItem[] }) {
    const albums = props.albums;
    const artists = props.artists;
    const tracks = props.tracks;
    if(albums.length === 0 && artists.length === 0 && tracks.length === 0)
      return <div className="not-found">По вашему запросу ничего не найдено</div>;
    else 
      return <>
        <Section header="Альбомы" items={albums} />
        <Section header="Исполнители" items={artists} />
        <TrackSection items={tracks}/>
      </>
}