import ApprovalCard from './components/ApprovalCard';
import CommentDetail, { type Comment } from './components/CommentDetail';

// inline SVG avatars: no network, no third-party images
const avatar = (color: string) =>
    `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect width="1" height="1" fill="${color}"/></svg>`)}`;

export const comments: Comment[] = [
    {
        author: 'Ana',
        timeAgo: 'Today at 9:15',
        text: 'Shipped the fix, thanks!',
        avatar: avatar('tomato'),
    },
    {
        author: 'Boris',
        timeAgo: 'Yesterday at 18:02',
        text: 'Nice write-up.',
        avatar: avatar('teal'),
    },
    {
        author: 'Vera',
        timeAgo: 'Monday at 11:40',
        text: 'Can we pair on this?',
        avatar: avatar('gold'),
    },
];

export default function App() {
    return (
        <main className="comments">
            <ApprovalCard>
                <p>Are you sure?</p>
            </ApprovalCard>
            {comments.map((c) => (
                <ApprovalCard key={c.author}>
                    <CommentDetail {...c} />
                </ApprovalCard>
            ))}
        </main>
    );
}
