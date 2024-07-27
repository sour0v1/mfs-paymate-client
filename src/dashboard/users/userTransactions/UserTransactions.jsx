import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import { FaMoneyCheckDollar } from 'react-icons/fa6';

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
        <div className='bg-[#006769] text-white pt-16 pb-6 min-h-screen relative'>
            <div className='absolute top-4 left-4 flex justify-center items-center gap-4'>
                <Link to={'/home'} className='text-white text-2xl'><FaHome /></Link>
                <div className='pl-2 border-l-2 flex justify-center items-center  gap-1 py-3'>
                    <p className='text-2xl text-white'><span><FaMoneyCheckDollar /></span></p>
                    <span className='text-white'>Transactions History</span>
                </div>
            </div>
            <div className='max-w-6xl mx-auto'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className='text-white'>
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
        </div>
    );
};

export default UserTransactions;