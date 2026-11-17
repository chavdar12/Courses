import type { Image } from '../api';

export default function ImageList({ images }: { images: Image[] }) {
    return (
        <div className="image-list">
            {images.map((image) => (
                <img key={image.id} src={image.urls.regular} alt={image.alt_description ?? ''} />
            ))}
        </div>
    );
}
