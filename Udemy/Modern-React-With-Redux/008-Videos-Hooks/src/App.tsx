import { useEffect, useState } from 'react';
import type { Video } from './api';
import SearchBar from './components/SearchBar';
import VideoDetail from './components/VideoDetail';
import VideoList from './components/VideoList';
import useVideos from './useVideos';

export default function App() {
    const { videos, error, search } = useVideos('react hooks');
    const [selected, setSelected] = useState<Video | null>(null);

    // every new result list starts on its first video
    useEffect(() => setSelected(videos[0] ?? null), [videos]);

    return (
        <main>
            <SearchBar label="Video search" onSubmit={search} />
            {error && <p role="alert">{error}</p>}
            <VideoDetail video={selected} />
            <VideoList videos={videos} onSelect={setSelected} />
        </main>
    );
}
