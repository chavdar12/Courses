import {Navigate, Outlet} from 'react-router';
import {useAuth} from '../auth';

export default function RequireAuth() {
    return useAuth().user ? <Outlet/> : <Navigate to="/login" replace/>;
}
