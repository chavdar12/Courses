import type {Post as PostData} from '../api';
import PostAuthor from './PostAuthor';

export default function Post({description, author}: PostData) {
    return (
        <div className="Post">
            <img src="/origami.svg" alt="Origami logo" className="image"/>
            <p className="description">{description}</p>
            <PostAuthor username={author.username}/>
        </div>
    );
}
