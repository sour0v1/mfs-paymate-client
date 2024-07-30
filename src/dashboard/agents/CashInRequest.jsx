import React, { useEffect, useState } from 'react';
import { BsCashCoin } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import MiniHeader from '../../components/MiniHeader';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const CashInRequest = () => {
    const axiosSecure = useAxiosSecure();
    const [agent, setAgent] = useState(null);
    console.log(agent);

    const { data: cashInRequests } = useQuery({
        queryKey: ['requests'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/agent/cash-in-requests?agent=${agent}`);
            return res.data;
        },
        enabled: !!agent

    })
    console.log(cashInRequests)

    useEffect(() => {
        const agentIdentity = localStorage.getItem('userIdentity');
        setAgent(agentIdentity);
    }, [])
    return (
        <div className='bg-[#0B1906] min-h-screen w-full'>
            <MiniHeader icon={<BsCashCoin />} text={'Cash In Request'}></MiniHeader>
            <div className='max-w-5xl mx-auto text-white pt-24 pb-9 overflow-x-auto'>
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
                        cashInRequests?.map((transaction, idx) => <tbody key={idx}>
                            {/* row 1 */}
                            <tr>
                                <th>{idx + 1}</th>
                                <td>Cash in request</td>
                                <td>{transaction?.balance}</td>
                                <td>{transaction?.from}</td>
                                <td>{transaction?.date}</td>
                            </tr>
                        </tbody>)
                    }
                </table>
            </div>
        </div>
    );
};

export default CashInRequest;