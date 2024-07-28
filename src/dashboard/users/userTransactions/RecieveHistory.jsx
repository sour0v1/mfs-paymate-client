import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const RecieveHistory = () => {
    const axiosSecure = useAxiosSecure();
    const userIdentity = localStorage.getItem('userIdentity');
    const { data: transactions, isPending, isFetching } = useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/transaction/recieve-money?userIdentity=${userIdentity}`)
            return res?.data;
        },
        enabled: !!userIdentity
    })
    console.log(transactions);
    // if (isPending) {
    //   return <div className='h-screen w-full bg-black bg-opacity-50 inset-0 absolute flex justify-center items-center'>
    //         <span>loading...</span>
    //     </div>
    // }
    if (isPending || isFetching) {
        return <div className='flex justify-center items-center'>
            <span>loading...</span>
        </div>
    }
    if(!transactions?.length){
        return <div className='w-full flex justify-center items-center'>
           <span> There are currently no transactions</span>
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
                        <th>From</th>
                        <th>Date</th>
                    </tr>
                </thead>
                {
                    transactions?.map((transaction, idx) => <tbody key={idx}>
                        {/* row 1 */}
                        <tr>
                            <th>{idx + 1}</th>
                            <td>Recieved Money</td>
                            <td>{transaction?.balance}</td>
                            <td>{transaction?.from}</td>
                            <td>{transaction?.date}</td>
                        </tr>
                    </tbody>)
                }
            </table>
        </div>
    );
};

export default RecieveHistory;