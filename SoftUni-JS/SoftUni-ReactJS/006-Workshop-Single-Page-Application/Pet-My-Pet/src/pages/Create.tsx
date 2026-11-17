import { useNavigate } from 'react-router';
import { createPet, type PetInput } from '../api';
import PetForm from '../components/PetForm';

export default function Create() {
    const navigate = useNavigate();
    const onSubmit = (pet: PetInput) =>
        createPet(pet).then(
            () => navigate('/'),
            (e: Error) => alert(e.message),
        );
    return <PetForm title="Add Pet" submit="Add Pet" onSubmit={onSubmit} />;
}
