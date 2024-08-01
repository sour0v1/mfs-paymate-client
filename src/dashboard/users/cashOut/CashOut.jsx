import React from 'react';
import { Outlet } from 'react-router-dom';
import MiniHeader from '../../../components/MiniHeader';
import { IoLogOut } from 'react-icons/io5';

const CashOut = () => {
    return (
        <div className='bg-[#1A1A1B] h-screen flex flex-col justify-center items-center gap-16 px-4 lg:px-0 w-full border-2 relative'>
            <MiniHeader icon={<IoLogOut />} text={'Cash-Out'}></MiniHeader>
            {/* <span className='text-white'>Home</span> */}

            <Outlet></Outlet>
        </div>
    );
};

export default CashOut;