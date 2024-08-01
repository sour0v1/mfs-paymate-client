import React from 'react';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';

const BalanceBtn = ({handleCheckBalance, balance, loading, tap}) => {
    // console.log(balance);
    return (
        <button onClick={handleCheckBalance} className='bg-white flex justify-center items-center text-[#1A1A1B] py-1 lg:py-2 px-6 rounded-full'>{
            loading && <span className="loading loading-dots loading-sm"></span>
            
        }
        {
            balance >= 0 && <span>{balance}</span>
        }
        {
            (balance === null && !loading) && <span>Tap to check balance</span>
        }
        
        </button>
    );
};

export default BalanceBtn;