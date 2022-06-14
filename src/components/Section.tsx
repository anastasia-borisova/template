import { IItem } from "../utils/interfaces";
import Items from "./Items";

export default function Section(props: { header: string, items: IItem[]}) {
    if(props.items.length)
      return <section className="section">
               <h2 className="section__header">{props.header}</h2>
               <div className="items">
                  <Items items={props.items}/>
               </div>
             </section>
    else 
      return <></>
}