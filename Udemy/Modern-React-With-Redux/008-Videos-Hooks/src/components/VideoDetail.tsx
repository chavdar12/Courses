import type { Video } from '../api';

export default function VideoDetail({ video }: { video: Video | null }) {
    if (!video) return null;
    const { videoId } = video.id;
    return (
        <section className="video-detail">
            <iframe
                title={video.snippet.title}
                src={`https://www.youtube.com/embed/${encodeURIComponent(videoId)}`}
                allowFullScreen
            />
            <h2>{video.snippet.title}</h2>
            <p>{video.snippet.description}</p>
        </section>
    );
}
