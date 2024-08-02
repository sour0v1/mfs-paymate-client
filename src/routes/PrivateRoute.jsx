// import React, { useEffect, useState } from 'react';
// import useAxiosSecure from '../hook/useAxiosSecure';
// import axios from 'axios';
// import { useQuery } from '@tanstack/react-query';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const axiosSecure = useAxiosSecure();
//     useEffect(() => {
//         const userIdentity = localStorage.getItem('userIdentity');
//         setUser(userIdentity);
//     }, [])

//     const { data: loggedInfo } = useQuery({
//         queryKey: ['loggedInfo'],
//         queryFn: async () => {
//             if (user) {
//                 const res = await axiosSecure.get(`/verify/logged-in?user=${user}`)
//                 return res.data;
//             }
//         },
//         enabled: !!user
//     })
//     console.log(loggedInfo);
//     console.log(user);
//     if (loggedInfo?.message) {
//         return children
//     }
//     return <Navigate to={'/'}></Navigate>
// };

// export default PrivateRoute;