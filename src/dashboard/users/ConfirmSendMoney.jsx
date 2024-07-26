import React from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmSendMoney = () => {
    const location = useLocation();
    console.log(location?.state?.number);
    return (
        <div className='w-full text-center space-y-4r'>
            <p className='text-white mx-auto'>Send money to <span className='px-2 py-1 bg-white text-[#006769]'>{location?.state?.number}</span></p>
            <form className='w-full lg:w-1/4 mx-auto space-y-2'>
                <input className='w-full py-3 px-4 outline-none bg-white' name='phone' type='number' placeholder='Enter amount'/>
                <input className='w-full py-3 px-4 outline-none bg-white' name='password' type='text' placeholder='Enter password'/>
            </form>
        </div>
    );
};

export default ConfirmSendMoney;