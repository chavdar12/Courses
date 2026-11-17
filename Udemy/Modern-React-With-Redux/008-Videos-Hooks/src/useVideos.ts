import { useCallback, useEffect, useState } from 'react';
import { searchVideos, type Video } from './api';

export default function useVideos(defaultTerm: string) {
    const [videos, setVideos] = useState<Video[]>([]);
    const [error, setError] = useState('');

    const search = useCallback(async (term: string) => {
        setError('');
        try {
            setVideos(await searchVideos(term));
        } catch (e) {
            setError((e as Error).message);
        }
    }, []);

    useEffect(() => {
        void search(defaultTerm);
    }, [defaultTerm, search]);

    return { videos, error, search };
}
