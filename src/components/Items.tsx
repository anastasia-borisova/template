import Card from "./Card";

export default function Items(props: { items: any[]}) {
    return <>{props.items.map((item) => <Card key={item.id} item={item}/>)}</>;
}
  