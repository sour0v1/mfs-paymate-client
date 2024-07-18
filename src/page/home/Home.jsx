import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/paymate-login.webp'
import { FaRegUserCircle } from 'react-icons/fa';
import { AuthContext } from '../../provider/Provider';
import { FaMoneyCheckDollar } from 'react-icons/fa6';
import { IoLogOut } from 'react-icons/io5';
import { IoIosSend } from 'react-icons/io';
import { BsCashCoin } from 'react-icons/bs';
import { Navigate, useNavigate } from 'react-router-dom';

const Home = () => {
    const { setUserIdentity, userInfo, isPending } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(userInfo);

    const handleLogOut = () => {
        const local = localStorage.removeItem('userIdentity');
        console.log(local);
        setUserIdentity(local);
        navigate('/');
    }

    useEffect(() => {
        const local = localStorage.getItem('userIdentity');
        if (local) {
            setUserIdentity(local);
        }
        else {
            navigate('/');
        }
    }, [])

    if (isPending) {
        return <div className='w-screen h-screen flex justify-center items-center text-[#006769]'>loading...</div>
    }

    if (userInfo?.role === 'user') {
        return (
            <div>
                <div className='bg-[#006769] py-6 px-9 flex justify-between items-center'>
                    <img className='w-48' src={logo} alt="" />
                    <button className='bg-white text-[#006769] py-2 px-6 rounded-full'>Tap to check balance</button>
                    <div className='text-white flex justify-center items-center gap-3'>
                        <span className='text-4xl'><FaRegUserCircle /></span>
                        <div className='flex flex-col justify-center items-start'>
                            <span>{userInfo?.name}</span>
                            <span>{userInfo?.phone}</span>
                            <button onClick={handleLogOut} className='underline text-white'>Log Out</button>
                        </div>
                    </div>
                </div>
                {/* user home */}
                <div className='my-9 max-w-3xl mx-auto'>
                    <h1 className='text-2xl text-[#006769] text-center font-bold my-6'>Services</h1>
                    <div className='flex justify-center items-center gap-6'>
                        <div className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52'>
                            <span className='text-6xl text-[#006769]'><BsCashCoin /></span>
                            <p className='text-[#006769]'>Cash In</p>
                        </div>
                        <div className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52'>
                            <span className='text-6xl text-[#006769]'><IoLogOut /></span>
                            <p className='text-[#006769]'>Cash Out</p>
                        </div>
                        <div className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52'>
                            <span className='text-6xl text-[#006769]'><IoIosSend /></span>
                            <p className='text-[#006769]'>Send Money</p>
                        </div>
                        <div className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52'>
                            <span className='text-6xl text-[#006769]'><FaMoneyCheckDollar /></span>
                            <p className='text-[#006769]'>Transactions</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if (userInfo?.role === 'agent') {
        return (
            <div>
                <div className='bg-[#006769] py-6 px-9 flex justify-between items-center'>
                    <img className='w-48' src={logo} alt="" />
                    <button className='bg-white text-[#006769] py-2 px-6 rounded-full'>Tap to check balance</button>
                    <div className='text-white flex justify-center items-center gap-3'>
                        <span className='text-4xl'><FaRegUserCircle /></span>
                        <div className='flex flex-col justify-center items-start'>
                            <span>{userInfo?.name}</span>
                            <span>{userInfo?.phone}</span>
                            <button onClick={handleLogOut} className='underline text-white'>Log Out</button>
                        </div>
                    </div>
                </div>
                {/* user home */}
                <div className='my-9 max-w-3xl mx-auto'>
                    <h1 className='text-2xl text-[#006769] text-center font-bold my-6'>Services</h1>
                    <div className='flex justify-center items-center gap-6'>
                        <div className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52'>
                            <span className='text-6xl text-[#006769]'><BsCashCoin /></span>
                            <p className='text-[#006769]'>Cash In Request</p>
                        </div>
                        <div className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52'>
                            <span className='text-6xl text-[#006769]'><IoLogOut /></span>
                            <p className='text-[#006769]'>Cash Out Request</p>
                        </div>
                        <div className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52'>
                            <span className='text-6xl text-[#006769]'><FaMoneyCheckDollar /></span>
                            <p className='text-[#006769]'>Transactions</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Home;