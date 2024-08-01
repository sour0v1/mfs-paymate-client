import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { AuthContext } from '../../../provider/Provider';
import { RxCross1 } from 'react-icons/rx';
import { IoEyeOutline } from 'react-icons/io5';
import { FaRegEyeSlash } from 'react-icons/fa';

const ConfirmSendMoney = () => {
    const location = useLocation();
    // const { userInfo } = useContext(AuthContext);
    const phoneNumber = location?.state?.number;
    const axiosSecure = useAxiosSecure();
    const [phoneValue, setPhoneValue] = useState(null);
    const [passValue, setPassValue] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modified, setModified] = useState(false);
    const [open, setOpen] = useState(false);

    // console.log(userIdentity)
    const handleConfirm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        console.log('working');
        const balance = e.target.balance.value;
        const password = e.target.password.value;
        console.log(balance, password);
        const userIdentity = localStorage.getItem('userIdentity');
        const sendInfo = {
            balance, password, phoneNumber, userIdentity
        }

        const confirmation = await axiosSecure.post(`/user/confirm/send-money`, sendInfo);
        console.log(confirmation?.data);
        if (confirmation?.data.insertedId) {
            setModified(true);
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
            <p className='text-white mx-auto'>Send money to <span className='py-1 underline'>{phoneNumber}</span></p>
            <p className='text-white'>{message}</p>
            <form onSubmit={handleConfirm} className='w-full lg:w-1/4 mx-auto space-y-3'>
                <input onChange={handlePhoneChange} className='w-full py-3 px-4 outline-none bg-white' name='balance' type='number' placeholder='Enter amount' />
                <div className='w-full relative'>
                    <input onChange={handlePassChange} className='w-full py-3 px-4 outline-none bg-white' name='password' type={open ? 'text' : 'password'} placeholder='Enter password' />
                    <span onClick={() => setOpen(!open)} className='absolute pt-4 right-0 px-2'>{!open ? <FaRegEyeSlash /> : <IoEyeOutline />}</span>
                </div>
                <button className={`w-full py-3 px-4 outline-none  text-[#1A1A1B] font-medium rounded-xl  flex justify-center items-center ${changed ? 'bg-white' : 'bg-gray-300 '}`} type="submit" value={'Confirm'} disabled={changed ? false : true}>
                    Send
                </button>
            </form>
            {modified &&
                <div className='absolute inset-0 bg-black bg-opacity-80 flex justify-center items-center'>
                    <div className='bg-white p-4 w-full lg:w-1/3 mx-4 lg:mx-0 relative rounded-xl'>
                        <button className='absolute top-3 right-4 text-xl p-2 rounded-full hover:bg-gray-100' onClick={() => setModified(false)}><RxCross1 /></button>
                        <p className='my-16 text-xl text-[#1A1A1B]'>Success!</p>
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

export default ConfirmSendMoney;