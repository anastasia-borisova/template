import { IPlaylistsByCategory } from '../utils/interfaces';
import Section from './Section';

export default function Playlists(props: {categories: IPlaylistsByCategory[]}) {
    return <>
    {props.categories.map((category) => <Section key={category.id}
      header={category.name} items={category.playlists} />
    )}
    </>
}