import React from 'react';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';

const BalanceBtn = ({handleCheckBalance, balance, loading}) => {
    return (
        <button onClick={handleCheckBalance} className='bg-white flex justify-center items-center text-[#006769] py-1 lg:py-2 px-6 rounded-full'>{
            loading ? <span className="loading loading-dots loading-sm"></span> : balance ? <p className='flex justify-center items-center gap-1'><span><FaBangladeshiTakaSign /></span><span>{balance}</span></p> : 'Tap to Check Balance'
        }</button>
    );
};

export default BalanceBtn;