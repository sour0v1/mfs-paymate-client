import React, { useState } from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../hook/useAxiosSecure';

const CheckNumber = ({ role, type }) => {
    const axiosSecure = useAxiosSecure();
    const [message, setMessage] = useState(null);
    const [checkNumber, setCheckNumber] = useState(true);
    const navigate = useNavigate();
    const handleMoneySend = async (e) => {
        e.preventDefault();
        setMessage(null);
        const form = e.target;
        const phone = form.phone.value;
        // console.log(phone)

        const checkPhone = await axiosSecure.get(`/${role}/check-number?phone=${phone}`)
        console.log(checkPhone?.data.message);
        if (checkPhone?.data.matched) {
            // console.log('hello');
            if (role === 'user') {
               return navigate(`/user/send-money/confirm`, { state: { number: phone } });
            }
            return navigate(`/user/${type}/confirm`, {state : {number : phone }});
        }
        if (checkPhone?.data.message) {
            setMessage(checkPhone?.data.message);
        }
    }

    const handleChange = e => {
        e.preventDefault();
        const phone = e.target.value;
        console.log(phone)
        if (phone.length) {
            console.log('right');
            setCheckNumber(false);
        }
        else {
            setCheckNumber(true);
        }

    }
    return (
        <form onChange={handleChange} onSubmit={handleMoneySend} className='w-full lg:w-1/4  flex flex-col justify-center items-center gap-2'>
            {/* <span className='text-white'>Enter Mobile Number:</span> */}
            <span className='text-white'>{message}</span>
            <div className='w-full flex flex-row justify-center items-center gap-1'>
                <input className='w-full py-3 px-4 outline-none' name='phone' type="number" placeholder={role === 'user' ? `Enter user's phone number` : `Enter agent's phone number`} />
                <button className={` ${checkNumber ? 'bg-gray-300' : 'text-[#1A1A1B] bg-white'} text-2xl py-3 px-3`} disabled={checkNumber ? true : false}>
                    <IoIosArrowRoundForward />
                </button>
            </div>

        </form>
    );
};

export default CheckNumber;