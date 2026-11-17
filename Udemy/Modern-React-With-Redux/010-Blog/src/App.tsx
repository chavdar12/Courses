import { useGetPostsQuery, useGetUserQuery } from './api';

function UserHeader({ userId }: { userId: number }) {
    const { data: user } = useGetUserQuery(userId);
    return <p className="author">{user?.name ?? '…'}</p>;
}

export default function App() {
    const { data: posts, isLoading, isError } = useGetPostsQuery();

    if (isLoading) return <p role="status">Loading posts…</p>;
    if (isError || !posts) return <p role="alert">Could not load posts</p>;
    return (
        <main>
            {posts.map((post) => (
                <article key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    <UserHeader userId={post.userId} />
                </article>
            ))}
        </main>
    );
}
