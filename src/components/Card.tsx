import { artistsToString, createMarkup } from "../utils/helpers";
import defaultImage from "../images/default.jpg";

export default function Card(props: {item: any}) {
    let additionalInfo = '';
    if(props.item.description)
        additionalInfo = props.item.description;
    if(props.item.artists)
        additionalInfo = artistsToString(props.item.artists);
    const image_url = props.item.images.length === 0 ? defaultImage : props.item.images[0].url;
    return <a tabIndex={0} className="item link footer__item-link" target="_blank"
           rel="noopener noreferrer" href={props.item.external_urls.spotify}>
             <img className="item-image" src={image_url} alt="cover" 
             width="220" height="220" />
             <p className="item-header">{props.item.name}</p>
             <p dangerouslySetInnerHTML={createMarkup(additionalInfo)} />
           </a>;
}