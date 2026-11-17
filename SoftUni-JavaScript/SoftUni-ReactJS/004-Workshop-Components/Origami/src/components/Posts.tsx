import { useEffect, useState } from 'react';
import { getPosts, type Post as PostData } from '../api';
import Post from './Post';

export default function Posts() {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        getPosts()
            .then(setPosts)
            .catch((e: Error) => setError(e.message));
    }, []);

    return (
        <div className="Posts">
            {error && <p role="alert">{error}</p>}
            {posts.map((p) => (
                <Post key={p._id} {...p} />
            ))}
        </div>
    );
}
