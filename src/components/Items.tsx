import { IItem } from "../utils/interfaces";
import Card from "./Card";

export default function Items(props: { items: IItem[]}) {
    return <>{props.items.map((item) => <Card key={item.id} item={item}/>)}</>
}