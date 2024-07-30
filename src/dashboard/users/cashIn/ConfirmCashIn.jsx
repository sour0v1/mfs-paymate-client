import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { RxCross1 } from 'react-icons/rx';

const ConfirmCashIn = () => {
    const location = useLocation();
    // const { userInfo } = useContext(AuthContext);
    const phoneNumber = location?.state?.number;
    const axiosSecure = useAxiosSecure();
    const [phoneValue, setPhoneValue] = useState(null);
    const [passValue, setPassValue] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [inserted, setInserted] = useState(false);
    const [money, setMoney] = useState(null);

    // console.log(userIdentity)
    const handleConfirm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        console.log('working');
        const balance = e.target.balance.value;
        setMoney(balance);
        const password = e.target.password.value;
        console.log(balance, password);
        const userIdentity = localStorage.getItem('userIdentity');
        const sendInfo = {
            balance, password, phoneNumber, userIdentity
        }

        const confirmation = await axiosSecure.post(`/user/confirm/cash-in`, sendInfo);
        console.log(confirmation?.data);
        if (confirmation?.data.insertedMessage) {
            setInserted(confirmation?.data.insertedMessage);
            e.target.reset();
            setPhoneValue(null);
            setPassValue(null);
        }
        setMessage(confirmation?.data.message);
        setLoading(false);


    }
    const handlePhoneChange = e => {
        e.preventDefault();
        const phone = e.target.value;
        console.log(phone);
        setPhoneValue(phone);
    }
    const handlePassChange = e => {
        e.preventDefault();
        const pass = e.target.value;
        console.log(pass);
        setPassValue(pass);
    }
    const changed = phoneValue && passValue;
    return (
        <div className='w-full text-center flex flex-col justify-center items-center gap-4'>
            <p className='text-white mx-auto'>Cash-In request to  <span className='py-1 underline'>{phoneNumber}</span></p>
            <p className='text-white'>{message}</p>
            <form onSubmit={handleConfirm} className='w-full lg:w-1/4 mx-auto space-y-3'>
                <input onChange={handlePhoneChange} className='w-full py-3 px-4 outline-none bg-white' name='balance' type='number' placeholder='Enter amount' />
                <input onChange={handlePassChange} className='w-full py-3 px-4 outline-none bg-white' name='password' type='text' placeholder='Enter password' />
                <button className={`w-full py-3 px-4 outline-none bg-white text-[#0B1906] rounded-xl font-medium  flex justify-center items-center ${changed ? '' : 'bg-gray-400 text-white'}`} type="submit" value={'Confirm'} disabled={changed ? false : true}>
                    Send
                </button>
            </form>
            {inserted &&
                <div className='absolute inset-0 bg-black bg-opacity-80 flex justify-center items-center'>
                    <div className='bg-white p-4 w-full lg:w-1/3 mx-4 lg:mx-0 relative rounded-xl'>
                        <button className='absolute top-3 right-4 text-xl p-2 rounded-full hover:bg-gray-100' onClick={() => {setInserted(false) ; setMoney(null)}}><RxCross1 /></button>
                        <p className='my-16 text-xl text-[#0B1906]'>Requested Successfully for <span className='font-medium'>{money}</span> to <span className='font-medium'>{phoneNumber}</span></p>
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

export default ConfirmCashIn;