import { artistsToString } from "../utils/helpers";
import { IItem } from "../utils/interfaces";

export default function Tracks(props: { tracks: IItem[]}) {
    return <>
        {props.tracks.map((track) => <a key={track.id} href={track.external_urls.spotify} target='_blank' 
           rel="noopener noreferrer" className='track link'>{artistsToString(track.artists)} - {track.name}</a>)}
           </>
}