import React from 'react';

const BalanceBtn = ({handleCheckBalance, balance, loading}) => {
    return (
        <button onClick={handleCheckBalance} className='bg-white flex justify-center items-center text-[#006769] py-2 px-6 rounded-full'>{
            loading ? <span className="loading loading-dots loading-sm"></span> : balance ? <span>${balance}</span> : 'Tap to Check Balance'
        }</button>
    );
};

export default BalanceBtn;