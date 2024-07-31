import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../hook/useAxiosSecure';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const PrivateRoute = ({children}) => {
    const [user, setUser] = useState(null);
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        const userIdentity = localStorage.getItem('userIdentity');
        setUser(userIdentity);
    }, [])

   const {data : loggedInfo} = useQuery({
    queryKey : ['loggedInfo'],
    queryFn : async () => {
        const res = await axiosSecure.get(`/verify/logged-in?user=${user}`)
        return res.data;
    }
   })
   console.log(loggedInfo);
    console.log(user);
    return (
        <div>
            
        </div>
    );
};

export default PrivateRoute;