import { useState } from 'react';
import { searchImages, type Image } from './api';
import ImageList from './components/ImageList';
import SearchBar from './components/SearchBar';

export default function App() {
    const [images, setImages] = useState<Image[]>([]);
    const [error, setError] = useState('');

    async function search(term: string) {
        setError('');
        try {
            setImages(await searchImages(term));
        } catch (e) {
            setError((e as Error).message);
        }
    }

    return (
        <main>
            <SearchBar onSubmit={search} />
            {error && <p role="alert">{error}</p>}
            <p>Found: {images.length} images</p>
            <ImageList images={images} />
        </main>
    );
}
