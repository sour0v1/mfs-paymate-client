import React, { createContext, useState } from 'react';
import useAxiosSecure from '../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

export const AuthContext = createContext(null);

const Provider = ({ children }) => {
    const [userIdentity, setUserIdentity] = useState(null);
    console.log(userIdentity);

    const axiosSecure = useAxiosSecure();
    const { data: userInfo, isPending } = useQuery({
        queryKey: ['userInfo'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-info?userIdentity=${userIdentity}`)
            return res.data;
        },
        refetchInterval : 100
    })
    console.log(userInfo)

    const value = {
        userInfo, setUserIdentity, isPending
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default Provider;