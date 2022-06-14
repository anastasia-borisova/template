import { IItem } from "../utils/interfaces";
import Tracks from "./Tracks";

export default function TrackSection(props: { items: IItem[]}) {
    if(props.items.length)
      return <section className="track-section">
               <h2 className="section__header">Треки</h2>
               <div className="tracks">
                  <Tracks tracks={props.items} />
               </div>
             </section>
    else
      return <></>
}