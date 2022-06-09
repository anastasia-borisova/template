import Section from './Section';

export default function Playlists(props: {categories: any[]}): any {
    return <>
    {props.categories.map((category) => <Section key={category.name}
      header={category.name} items={category.playlists} />
    )}
    </>
}