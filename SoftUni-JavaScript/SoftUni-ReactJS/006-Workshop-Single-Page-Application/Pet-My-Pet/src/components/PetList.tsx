import {useEffect, useState} from 'react';
import {Link} from 'react-router';
import type {Pet} from '../api';

type Props = {title: string; empty: string; load: () => Promise<Pet[]>};

export default function PetList({title, empty, load}: Props) {
    const [pets, setPets] = useState<Pet[] | null>(null);

    useEffect(() => {
        load().then(setPets).catch((e: Error) => alert(e.message));
    }, [load]);

    return (
        <section>
            <h1>{title}</h1>
            {pets?.length === 0 && <p className="no-pets">{empty}</p>}
            <ul className="pets">
                {pets?.map(pet => (
                    <li key={pet._id} className="pet-card">
                        <img src={pet.imageUrl} alt={pet.name}/>
                        <h2>{pet.name}</h2>
                        <p>{pet.type}</p>
                        <Link to={`/details/${pet._id}`}>Details</Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
