import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { AuthContext } from '../../provider/Provider';

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
    const changed = phoneValue?.length > 0 && passValue?.length > 0;
    return (
        <div className='w-full text-center flex flex-col justify-center items-center gap-4'>
            <p className='text-white mx-auto'>Send money to <span className='px-2 py-1 bg-white text-[#006769]'>{phoneNumber}</span></p>
            <p className='text-white'>{message}</p>
            <form onSubmit={handleConfirm} className='w-full lg:w-1/4 mx-auto space-y-3'>
                <input onChange={handlePhoneChange} className='w-full py-3 px-4 outline-none bg-white' name='balance' type='number' placeholder='Enter amount' />
                <input onChange={handlePassChange} className='w-full py-3 px-4 outline-none bg-white' name='password' type='text' placeholder='Enter password' />
                <button className={`w-full py-3 px-4 outline-none bg-white text-[#006769]  flex justify-center items-center ${changed ? 'opacity-100' : 'opacity-70'}`} type="submit" value={'Confirm'} disabled={changed ? false : true}>
                    Send
                </button>
            </form>
            {modified &&
                <div className='absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                    {loading ?
                        <span className="loading loading-spinner loading-sm text-white"></span> :
                        <div className='bg-white p-4 w-1/3 relative'>
                            <button className='absolute top-2 right-4 text-2xl' onClick={() => setModified(false)}>X</button>
                            <p className='my-9 text-xl text-[#006769]'>Success!</p>
                        </div>
                    }
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