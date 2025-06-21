import React, { use } from 'react';
import { AuthContext } from '../contexts/authcontext/AuthContext';

const useAuth = () => {
    return use(AuthContext)
};

export default useAuth;