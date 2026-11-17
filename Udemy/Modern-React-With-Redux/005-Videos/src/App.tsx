import { useEffect, useState } from 'react';
import { searchVideos, type Video } from './api';
import SearchBar from './components/SearchBar';
import VideoDetail from './components/VideoDetail';
import VideoList from './components/VideoList';

export default function App() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [selected, setSelected] = useState<Video | null>(null);
    const [error, setError] = useState('');

    async function search(term: string) {
        setError('');
        try {
            const found = await searchVideos(term);
            setVideos(found);
            setSelected(found[0] ?? null);
        } catch (e) {
            setError((e as Error).message);
        }
    }

    useEffect(() => {
        void search('react hooks');
    }, []);

    return (
        <main>
            <SearchBar label="Video search" onSubmit={search} />
            {error && <p role="alert">{error}</p>}
            <VideoDetail video={selected} />
            <VideoList videos={videos} onSelect={setSelected} />
        </main>
    );
}
