import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router';
import {editPet, getPet, type Pet, type PetInput} from '../api';
import PetForm from '../components/PetForm';

export default function Edit() {
    const id = useParams().id!;
    const navigate = useNavigate();
    const [pet, setPet] = useState<Pet | null>(null);

    useEffect(() => {
        getPet(id).then(setPet).catch((e: Error) => alert(e.message));
    }, [id]);

    const onSubmit = (input: PetInput) =>
        editPet(id, input).then(() => navigate(`/details/${id}`), (e: Error) => alert(e.message));

    return pet && <PetForm title="Edit Pet" submit="Save" initial={pet} onSubmit={onSubmit}/>;
}
