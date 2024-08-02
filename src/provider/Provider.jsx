import React, { createContext, useState } from 'react';
import useAxiosSecure from '../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const AuthContext = createContext(null);

const Provider = ({ children }) => {
    const [userIdentity, setUserIdentity] = useState(null);
    console.log(userIdentity);

    // const axios = useAxiosSecure();
    const { data: userInfo, isPending } = useQuery({
        queryKey: ['userInfo'],
        queryFn: async () => {
            const res = await axios.get(`https://mfs-paymate-server.vercel.app/user-info?userIdentity=${userIdentity}`)
            // have to change by the server side domain
            return res.data;
        },
        // refetchInterval : 100
        enabled : !! userIdentity
    })
    console.log(userInfo)

    const value = {
        userInfo, setUserIdentity, isPending,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default Provider;