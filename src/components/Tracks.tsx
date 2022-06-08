import { artistsToString } from "../utils/helpers";

export default function Tracks(props: { tracks: any[]}) {
    return <>
        {props.tracks.map((track: any) => <a key={track.id} href={track.external_urls.spotify} target='_blank' 
           rel="noopener noreferrer" className='track link'>{artistsToString(track.artists)} - {track.name}</a>)}
           </>;
}