import {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router';
import {deletePet, getLikes, getMyLike, getPet, likePet, type Pet} from '../api';
import {useAuth} from '../auth';

export default function Details() {
    const id = useParams().id!;
    const {user} = useAuth();
    const navigate = useNavigate();
    const [pet, setPet] = useState<Pet | null>(null);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(true);

    useEffect(() => {
        Promise.all([getPet(id), getLikes(id), user ? getMyLike(id, user._id) : 1])
            .then(([p, count, mine]) => {
                setPet(p);
                setLikes(count);
                setLiked(mine > 0);
            })
            .catch((e: Error) => alert(e.message));
    }, [id, user]);

    if (!pet) return null;
    const isOwner = user?._id === pet._ownerId;

    const onDelete = async () => {
        if (!confirm(`Are you sure you want to delete ${pet.name}?`)) return;
        try {
            await deletePet(id);
            navigate('/');
        } catch (e) {
            alert((e as Error).message);
        }
    };

    const onLike = async () => {
        try {
            await likePet(id);
            setLikes(l => l + 1);
            setLiked(true);
        } catch (e) {
            alert((e as Error).message);
        }
    };

    return (
        <section className="details">
            <img src={pet.imageUrl} alt={pet.name}/>
            <h1>{pet.name}</h1>
            <p className="type">Type: {pet.type}</p>
            <p>{pet.description}</p>
            <p className="likes">Likes: {likes}</p>
            {isOwner && (
                <div className="actions">
                    <Link to={`/edit/${id}`}>Edit</Link>
                    <button onClick={onDelete}>Delete</button>
                </div>
            )}
            {user && !isOwner && !liked && <button onClick={onLike}>Like</button>}
        </section>
    );
}
