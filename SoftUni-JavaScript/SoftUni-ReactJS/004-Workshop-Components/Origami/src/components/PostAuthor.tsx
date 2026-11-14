export default function PostAuthor({username}: {username: string}) {
    return (
        <div className="author">
            <span>
                <small>Author:</small> {username}
            </span>
        </div>
    );
}
