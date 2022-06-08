import Section from './Section';
import Items from './Items';

export default function Playlists(props: {categories: any[]}): any {
    return <>
    {props.categories.map((category) => <Section key={category.name} sectionClass="section" 
      header={category.name} divClass="items" component={<Items items={category.playlists} />} />
    )}
    </>
}