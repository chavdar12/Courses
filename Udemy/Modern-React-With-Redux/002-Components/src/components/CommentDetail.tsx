export type Comment = { author: string; timeAgo: string; text: string; avatar: string };

export default function CommentDetail({ author, timeAgo, text, avatar }: Comment) {
    return (
        <article className="comment">
            <img className="avatar" src={avatar} alt={`${author}'s avatar`} />
            <div>
                <strong className="author">{author}</strong>
                <time className="metadata">{timeAgo}</time>
                <p className="text">{text}</p>
            </div>
        </article>
    );
}
