import React, { Children } from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { Navigate } from 'react-router';

const AdminRoute = ({Children}) => {
    const {user,loading} = useAuth()
    const {role,isLoading} = useUserRole()
    if(loading || isLoading){
        return <p>Loading...</p>
    }
    if(!user || role !== 'admin'){
        return <Navigate to="/forbidden"></Navigate>
    }
    return Children;
};

export default AdminRoute;