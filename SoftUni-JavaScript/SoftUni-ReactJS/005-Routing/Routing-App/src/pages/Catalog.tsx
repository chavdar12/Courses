import {useParams} from 'react-router';

export default function Catalog() {
    const {category, userId} = useParams();
    return <h2>Catalog: {category} for user {userId}</h2>;
}
