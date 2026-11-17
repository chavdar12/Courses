import { Link, useNavigate, useParams } from 'react-router';
import {
    useCreateStreamMutation,
    useDeleteStreamMutation,
    useEditStreamMutation,
    useGetStreamQuery,
    useGetStreamsQuery,
} from '../api';
import { useUserId } from '../store';
import StreamForm from './StreamForm';

const useStreamId = () => Number(useParams().id);

export function StreamList() {
    const { data: streams, isLoading, isError } = useGetStreamsQuery();
    const userId = useUserId();

    if (isLoading) return <p role="status">Loading…</p>;
    if (isError || !streams) return <p role="alert">Could not load streams</p>;
    return (
        <main>
            <h1>Streams</h1>
            <ul>
                {streams.map((s) => (
                    <li key={s.id}>
                        <Link to={`/streams/${s.id}`}>{s.title}</Link>
                        <p>{s.description}</p>
                        {s.userId === userId && (
                            <>
                                <Link to={`/streams/edit/${s.id}`}>Edit {s.title}</Link>{' '}
                                <Link to={`/streams/delete/${s.id}`}>Delete {s.title}</Link>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            {userId && <Link to="/streams/new">Create stream</Link>}
        </main>
    );
}

export function StreamCreate() {
    const userId = useUserId();
    const navigate = useNavigate();
    const [create, { isError }] = useCreateStreamMutation();

    if (!userId) return <p>Sign in to create a stream.</p>;
    return (
        <main>
            <h1>Create a stream</h1>
            {isError && <p role="alert">Could not save the stream</p>}
            <StreamForm
                submitLabel="Create"
                onSubmit={async (values) => {
                    if ((await create({ ...values, userId })).data) await navigate('/');
                }}
            />
        </main>
    );
}

export function StreamEdit() {
    const id = useStreamId();
    const userId = useUserId();
    const navigate = useNavigate();
    const { data: stream, isError } = useGetStreamQuery(id);
    const [edit, { isError: saveFailed }] = useEditStreamMutation();

    if (isError) return <p role="alert">Stream not found</p>;
    if (!stream) return <p role="status">Loading…</p>;
    if (stream.userId !== userId) return <p>You can only edit your own streams.</p>;
    return (
        <main>
            <h1>Edit a stream</h1>
            {saveFailed && <p role="alert">Could not save the stream</p>}
            <StreamForm
                initial={{ title: stream.title, description: stream.description }}
                submitLabel="Save"
                onSubmit={async (values) => {
                    if ((await edit({ id, ...values })).data) await navigate('/');
                }}
            />
        </main>
    );
}

export function StreamDelete() {
    const id = useStreamId();
    const userId = useUserId();
    const navigate = useNavigate();
    const { data: stream } = useGetStreamQuery(id);
    const [remove] = useDeleteStreamMutation();

    if (!stream) return null;
    const own = stream.userId === userId;
    return (
        <div role="dialog" aria-modal="true" aria-labelledby="delete-title">
            <h2 id="delete-title">Delete stream</h2>
            <p>{own ? `Delete "${stream.title}"?` : 'You can only delete your own streams.'}</p>
            {own && (
                <button
                    onClick={async () => {
                        if (!('error' in (await remove(id)))) await navigate('/');
                    }}
                >
                    Delete
                </button>
            )}
            <Link to="/">Cancel</Link>
        </div>
    );
}

export function StreamShow() {
    const { data: stream, isError } = useGetStreamQuery(useStreamId());
    if (isError) return <p role="alert">Stream not found</p>;
    if (!stream) return <p role="status">Loading…</p>;
    return (
        <main>
            <h1>{stream.title}</h1>
            <p>{stream.description}</p>
        </main>
    );
}
