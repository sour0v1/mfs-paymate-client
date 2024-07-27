import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UserTransactions = () => {
    const axiosSecure = useAxiosSecure();
    const userIdentity = localStorage.getItem('userIdentity');
    const { data: transactions } = useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/transaction?userIdentity=${userIdentity}`)
            return res?.data;
        },
        enabled: !!userIdentity
    })
    console.log(transactions);
    return (
        <div className='max-w-6xl mx-auto my-9'>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>From</th>
                            <th>Amount</th>
                            <th>To</th>
                            <th>Type</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    {
                        transactions?.map((transaction, idx) => <tbody key={idx}>
                            {/* row 1 */}
                            <tr>
                                <th>{idx + 1}</th>
                                <td>{transaction?.from}</td>
                                <td>{transaction?.balance}</td>
                                <td>{transaction?.to}</td>
                                <td>{transaction?.type}</td>
                                <td>{transaction?.date}</td>
                            </tr>
                        </tbody>)
                    }
                </table>
            </div>
        </div>
    );
};

export default UserTransactions;