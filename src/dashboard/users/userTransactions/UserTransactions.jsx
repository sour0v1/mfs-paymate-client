import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import { FaMoneyCheckDollar } from 'react-icons/fa6';
import './UserTransaction.css'
import MiniHeader from '../../../components/MiniHeader';

const UserTransactions = () => {

    return (
        <div className='bg-[#1A1A1B] text-white pt-16 pb-6 min-h-screen relative px-4 lg:px-0'>
           <MiniHeader icon={<FaMoneyCheckDollar />} text={'Transaction History'}></MiniHeader>
            <div className='max-w-6xl mx-auto flex flex-col lg:flex-row justify-center items-start gap-6 my-3'>
                <div id='transaction' className='px-6 h-full border-r flex flex-col items-end lg:items-start gap-3 py-4 w-full lg:w-fit'>
                    <NavLink to={'history/send-money'}>Send Money</NavLink>
                    <NavLink to={'history/recieve-money'}>Recieved Money</NavLink>
                    <NavLink to={'history/cash-in'}>Cash In</NavLink>
                    <NavLink to={'history/cash-out'}>Cash Out</NavLink>
                </div>
                <div className='w-full lg:w-3/4 border-l px-6 pb-6'>
                    <Outlet></Outlet>
                </div>

            </div>
        </div>
    );
};

export default UserTransactions;