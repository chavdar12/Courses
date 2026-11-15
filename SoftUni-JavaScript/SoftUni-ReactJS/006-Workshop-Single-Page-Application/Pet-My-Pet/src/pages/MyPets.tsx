import { useCallback } from 'react';
import { getMyPets } from '../api';
import { useAuth } from '../auth';
import PetList from '../components/PetList';

export default function MyPets() {
    const userId = useAuth().user!._id;
    const load = useCallback(() => getMyPets(userId), [userId]);
    return <PetList title="My Pets" empty="No pets in database." load={load} />;
}
