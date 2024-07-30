import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const CashInHistory = () => {
    const axiosSecure = useAxiosSecure();
    const userIdentity = localStorage.getItem('userIdentity');
    const { data: transactions, isPending, isFetching } = useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/transaction/cash-in?userIdentity=${userIdentity}`)
            return res?.data;
        },
        enabled: !!userIdentity
    })
    console.log(transactions);
    if (isPending || isFetching) {
        return <div className='flex justify-center items-center'>
            <span>loading...</span>
        </div>
    }
    if (!transactions?.length) {
        return <div className='w-full flex justify-center items-center'>
            <span>There are currently no transactions</span>
        </div>
    }
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr className='text-white'>
                        <th></th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>To</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                {
                    transactions?.map((transaction, idx) => <tbody key={idx}>
                        {/* row 1 */}
                        <tr>
                            <th>{idx + 1}</th>
                            <td>Cash In</td>
                            <td>{transaction?.balance}</td>
                            <td>{transaction?.to}</td>
                            <td>{transaction?.accepted ? <span className='bg-white px-2 rounded-full'>Accepeted</span> : <span className='bg-white px-2 rounded-full text-[#0B1906] py-1 inline-block'>Pending</span>}</td>
                            <td>{transaction?.date}</td>
                        </tr>
                    </tbody>)
                }
            </table>
        </div>
    );
};

export default CashInHistory;