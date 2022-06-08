import Section from "./Section";
import Items from "./Items";
import Tracks from "./Tracks";

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
        albumsSection = <Section sectionClass="section" header="Альбомы" divClass="items" component={<Items items={albums}/>}/>;
      if(artists.length)
        artistsSection = <Section sectionClass="section" header="Исполнители" divClass="items" component={<Items items={artists}/>}/>;
      if(tracks.length)
        tracksSection = <Section sectionClass="track-section" header="Треки" divClass="tracks" component={<Tracks tracks={tracks}/>}/>;
      return <>
        {albumsSection}
        {artistsSection}
        {tracksSection}
      </>
    }
}