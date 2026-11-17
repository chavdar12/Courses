import { getPets } from '../api';
import PetList from '../components/PetList';

export default function Dashboard() {
    return <PetList title="Dashboard" empty="No pets in dashboard" load={getPets} />;
}
