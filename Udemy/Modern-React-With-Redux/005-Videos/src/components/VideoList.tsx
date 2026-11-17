import type { Video } from '../api';

export default function VideoList({
    videos,
    onSelect,
}: {
    videos: Video[];
    onSelect: (v: Video) => void;
}) {
    return (
        <ul className="video-list">
            {videos.map((video) => (
                <li key={video.id.videoId}>
                    <button onClick={() => onSelect(video)}>
                        <img src={video.snippet.thumbnails.medium.url} alt="" />
                        {video.snippet.title}
                    </button>
                </li>
            ))}
        </ul>
    );
}
