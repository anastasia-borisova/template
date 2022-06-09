import Section from "./Section";
import TrackSection from "./TrackSection";

export default function SearchResults(props: { albums: any, artists: any, tracks: any }) {
    const albums = props.albums.items;
    const artists = props.artists.items;
    const tracks = props.tracks.items;
    if(albums.length === 0 && artists.length === 0 && tracks.length === 0)
      return <div className="not-found">По вашему запросу ничего не найдено</div>;
    else {
      let albumsSection = <></>;
      let artistsSection = <></>;
      let tracksSection = <></>;
      if(albums.length)
        albumsSection = <Section header="Альбомы" items={albums} />;
      if(artists.length)
        artistsSection = <Section header="Исполнители" items={artists} />;
      if(tracks.length)
        tracksSection = <TrackSection items={tracks}/>;
      return <>
        {albumsSection}
        {artistsSection}
        {tracksSection}
      </>
    }
}