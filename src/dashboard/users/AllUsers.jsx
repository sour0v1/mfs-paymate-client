import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const { data: users, refetch, isPending } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-users');
            return res.data;
        }
    })
    console.log(users);

    // verify users
    const handleVerifyUser = async (id) => {
        setLoading(true);
        const res = await axiosSecure.post(`/verify-user?id=${id}`)
        console.log(res?.data);
        if (res.data?.verified) {
            refetch();
            setLoading(false);
        }
        // refetch();
    }
    if (isPending) {
        return <div className='w-full h-full flex justify-center items-center text-[#006769]'>loading...</div>
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users?.map((user, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>{user?.name}</td>
                                <td>{user?.phone}</td>
                                <td>{user?.email}</td>
                                <td><button onClick={() => handleVerifyUser(user?._id)} className={`${user?.verified ? 'text-[#006769]' : 'text-black border-b border-black'}`}>{user?.verified ? 'Verified' : loading ? 'loading..' : 'Verify'}</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;