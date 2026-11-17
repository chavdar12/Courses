import { useDispatch, useSelector } from 'react-redux';
import { selectSong, type RootState } from './store';

function SongList() {
    const list = useSelector((state: RootState) => state.songs.list);
    const dispatch = useDispatch();
    return (
        <ul>
            {list.map((song) => (
                <li key={song.title}>
                    {song.title}{' '}
                    <button onClick={() => dispatch(selectSong(song))}>Select {song.title}</button>
                </li>
            ))}
        </ul>
    );
}

function SongDetail() {
    const song = useSelector((state: RootState) => state.songs.selected);
    if (!song) return <p>Select a song</p>;
    return (
        <section aria-label="Details">
            <h2>{song.title}</h2>
            <p>Length: {song.duration}</p>
        </section>
    );
}

export default function App() {
    return (
        <main>
            <SongList />
            <SongDetail />
        </main>
    );
}
