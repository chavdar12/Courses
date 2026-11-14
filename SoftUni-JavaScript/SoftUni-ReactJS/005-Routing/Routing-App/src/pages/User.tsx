import {useParams} from 'react-router';

export default function User() {
    return <h2>Profile of {useParams().user}</h2>;
}
