
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { Navigate } from 'react-router';

const AdminRoute = ({children}) => {
    const {user,loading} = useAuth()
    const {role,isLoading} = useUserRole()
    if(loading || isLoading){
        return <p>Loading...</p>
    }
    if(!user || role !== 'admin'){
        return <Navigate to="/forbidden"></Navigate>
    }
    return children;
};

export default AdminRoute;