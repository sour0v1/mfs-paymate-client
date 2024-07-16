import React, { useState } from 'react';
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';
import logo from '../../assets/paymate-login.webp'

const Login = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className='bg-[#006769] h-screen w-full flex justify-center items-center'>

            <form className='w-1/3 flex flex-col justify-center items-center gap-4 text-[#006769]'>
                <img className='mb-9' src={logo} alt="" />
                <input className='py-3 px-4 w-full outline-none focus:outline-gray-100' type="text" placeholder='Phone or Email' />
                <div className='w-full relative'>
                    <input className='py-3 px-4 w-full outline-none focus:outline-gray-100' type={!open ? 'password' : 'text'} placeholder='Password' />
                    <span onClick={() => setOpen(!open)} className='absolute pt-4 right-0 px-2'>{!open ? <FaRegEyeSlash /> : <IoEyeOutline />}</span>
                </div>
                <input className='py-3 w-1/3 border border-white text-white hover:bg-white hover:text-[#006769]' type="submit" value = 'Log In' />

            </form>
        </div>
    );
};

export default Login;