import React, { useEffect, useState } from 'react';
import { BsCashCoin } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import MiniHeader from '../../components/MiniHeader';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { RxCross1 } from 'react-icons/rx';

const CashInRequest = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [agent, setAgent] = useState(null);
    console.log(agent);

    const { data: cashInRequests, isFetching, isPending, refetch } = useQuery({
        queryKey: ['requests'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/agent/cash-in-requests?agent=${agent}`);
            return res.data;
        },
        enabled: !!agent

    })
    console.log(cashInRequests)

    const handleCashInRequest = async (id) => {
        setLoading(true);
        console.log(id);
        const res = await axiosSecure.post(`/agent/confirm/cash-in-request?id=${id}`);
        console.log(res.data);
        if (res?.data?.modifiedCount) {
            refetch();
            setLoading(false);
        }
        if (res.data?.message) {
            setMessage(res.data?.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        const agentIdentity = localStorage.getItem('userIdentity');
        setAgent(agentIdentity);
    }, [])

    return (
        <div className='bg-[#0B1906] min-h-screen w-full'>
            <MiniHeader icon={<BsCashCoin />} text={'Cash In Request'}></MiniHeader>
            {
                isFetching || isPending ?
                    <div className='text-white max-w-5xl mx-auto text-center w-full pt-24 pb-9'>
                        loading...
                    </div> :
                    <div className='max-w-5xl mx-auto text-white pt-24 pb-9 overflow-x-auto'>
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className='text-white'>
                                    <th></th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>From</th>
                                    <th>Status</th>
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
                                        <td>{transaction?.accepted ? <span>Confirmed</span> : <button onClick={() => {
                                            handleCashInRequest(transaction?._id)
                                        }} className='inline-block px-2 py-1 rounded-full bg-white text-[#0B1906]'>Confirm</button>}</td>
                                        <td>{transaction?.date}</td>
                                    </tr>
                                </tbody>)
                            }
                        </table>
                    </div>

            }
            {message &&
                <div className='absolute inset-0 bg-black bg-opacity-80 flex justify-center items-center'>
                    <div className='bg-white p-4 w-full lg:w-1/3 mx-4 lg:mx-0 relative rounded-xl'>
                        <button className='absolute top-3 right-4 text-xl p-2 rounded-full hover:bg-gray-100' onClick={() => setMessage(false)}><RxCross1 /></button>
                        <p className='my-16 text-xl text-[#0B1906]'>Success!</p>
                    </div>
                </div>
            }
            {loading &&
                <div className='absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                    <span className="loading loading-spinner loading-lg text-white"></span> :
                </div>
            }

        </div>
    );
};

export default CashInRequest;