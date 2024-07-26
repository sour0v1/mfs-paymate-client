import React, { useState } from 'react';
import { IoIosArrowRoundForward} from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hook/useAxiosSecure';

const CheckNumber = () => {
    const axiosSecure = useAxiosSecure();
    const [message, setMessage] = useState(null);
    const [checkNumber, setCheckNumber] = useState(true);
    const navigate = useNavigate();
    const handleMoneySend = async (e) => {
        e.preventDefault();
        setMessage(null);
        const form = e.target;
        const phone = form.phone.value;
        console.log(phone)

        const checkPhone = await axiosSecure.get(`/user/check-number?phone=${phone}`)
        console.log(checkPhone?.data.message);
        if (checkPhone?.data.matched) {
            // console.log('hello');
            navigate(`/user/send-money/confirm`, {state : {number : phone}});
        }
        if (checkPhone?.data.message) {
            setMessage(checkPhone?.data.message);
        }
    }

    const handleChange = e => {
        e.preventDefault();
        const phone = e.target.value;
        console.log(phone)
        if (phone.length >= 11) {
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
                <input className='w-full py-3 px-4 outline-none' name='phone' type="number" placeholder='Enter phone number' />
                <button className={`bg-white  ${checkNumber ? 'text-gray-600 bg-gray-200' : 'text-[#006769]'} text-2xl py-3 px-3`} disabled={checkNumber ? true : false}>
                    <IoIosArrowRoundForward />
                </button>
            </div>

        </form>
    );
};

export default CheckNumber;