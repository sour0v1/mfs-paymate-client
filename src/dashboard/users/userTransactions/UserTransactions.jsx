import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import { FaMoneyCheckDollar } from 'react-icons/fa6';
import './UserTransaction.css'

const UserTransactions = () => {

    return (
        <div className='bg-[#006769] text-white pt-16 pb-6 min-h-screen relative px-4 lg:px-0'>
            <div className='absolute top-4 left-4 flex justify-center items-center gap-4'>
                <Link to={'/home'} className='text-white text-2xl'><FaHome /></Link>
                <div className='pl-2 border-l-2 flex justify-center items-center  gap-1 py-3'>
                    <p className='text-2xl text-white'><span><FaMoneyCheckDollar /></span></p>
                    <span className='text-white'>Transactions History</span>
                </div>
            </div>
            <div className='max-w-6xl mx-auto flex flex-col lg:flex-row justify-center items-start gap-6 my-3'>
                <div id='transaction' className='px-6 border h-full lg:min-h-screen flex flex-col items-start gap-3 py-3 w-full lg:w-fit'>
                    <NavLink to={'history/send-money'}>Send Money</NavLink>
                    <NavLink to={'history/recieve-money'}>Recieve Money</NavLink>
                    <NavLink to={'history/cash-in'}>Cash In Request</NavLink>
                </div>
                <div className='w-full lg:w-3/4'>
                    <Outlet></Outlet>
                </div>

            </div>
        </div>
    );
};

export default UserTransactions;