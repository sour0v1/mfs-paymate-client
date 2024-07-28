import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/paymate-login.webp'
import { FaRegUserCircle } from 'react-icons/fa';
import { AuthContext } from '../../provider/Provider';
import { FaMoneyCheckDollar } from 'react-icons/fa6';
import { IoLogOut } from 'react-icons/io5';
import { IoIosSend } from 'react-icons/io';
import { BsCashCoin } from 'react-icons/bs';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hook/useAxiosSecure';
import BalanceBtn from '../../components/BalanceBtn';

const Home = () => {
    const { setUserIdentity, userInfo, isPending } = useContext(AuthContext);
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const [tap, setTap] = useState(true);
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

    const handleCheckBalance = async () => {
        setTap(false);
        setBalance(null)
        setLoading(true);
        const balance = await axiosSecure.get(`/check-balance?email=${userInfo?.email}`);
        const netBalance = balance?.data.balance
        console.log(netBalance);
        setBalance(netBalance);
        if (netBalance >=0) {
            setLoading(false);
        }
        console.log('hello')

    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTap(true);
            setBalance(null);
        }, 2000)

        return () => clearTimeout(timer)
    }, [balance])

    if (isPending) {
        return <div className='w-screen h-screen flex justify-center items-center text-[#006769]'>loading...</div>
    }
    // if (!userInfo) {
    //     return <div className='w-screen h-screen flex justify-center items-center text-[#006769]'>loading...</div>
    // }


    if (userInfo?.role === 'user') {
        return (
            <div>
                <div className='bg-[#006769] py-6 px-9 flex flex-col lg:flex-row justify-between items-center gap-4'>
                    <img className='w-36 lg:w-48' src={logo} alt="" />
                    <BalanceBtn handleCheckBalance={handleCheckBalance} loading={loading} balance={balance} tap={tap}></BalanceBtn>
                    <div className='text-white flex justify-center items-center gap-3'>
                        <span className=' text-3xl lg:text-4xl'><FaRegUserCircle /></span>
                        <div className='flex flex-col justify-center items-start'>
                            <span className='font-medium'>{userInfo?.name}</span>
                            <span>{userInfo?.phone}</span>
                            <button onClick={handleLogOut} className='underline text-white'>Log Out</button>
                        </div>
                    </div>
                </div>
                {/* user home */}
                <div className='my-9 max-w-3xl mx-auto'>
                    <h1 className='text-2xl text-[#006769] text-center font-bold my-6'>Services</h1>
                    <div className='flex flex-col lg:flex-row justify-center items-center gap-6'>
                        <Link className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52 duration-200 hover:scale-105 hover:border-[#006769]'>
                            <span className='text-6xl text-[#006769]'><BsCashCoin /></span>
                            <p className='text-[#006769]'>Cash In</p>
                        </Link>
                        <div className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52 duration-200 hover:scale-105 hover:border-[#006769]'>
                            <span className='text-6xl text-[#006769]'><IoLogOut /></span>
                            <p className='text-[#006769]'>Cash Out</p>
                        </div>
                        <Link to={'/user/send-money'} className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52 duration-200 hover:scale-105 hover:border-[#006769]'>
                            <span className='text-6xl text-[#006769]'><IoIosSend /></span>
                            <p className='text-[#006769]'>Send Money</p>
                        </Link>
                        <Link to={'/user/transactions/history/send-money'} className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52 duration-200 hover:scale-105 hover:border-[#006769]'>
                            <span className='text-6xl text-[#006769]'><FaMoneyCheckDollar /></span>
                            <p className='text-[#006769]'>Transactions</p>
                        </Link>
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
                    <BalanceBtn handleCheckBalance={handleCheckBalance} loading={loading} balance={balance}></BalanceBtn>
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

    if (userInfo?.role === 'admin') {
        return (
            <div>
                <div className='bg-[#006769] py-6 px-9 flex justify-between items-center'>
                    <img className='w-48' src={logo} alt="" />
                    <BalanceBtn handleCheckBalance={handleCheckBalance} loading={loading} balance={balance}></BalanceBtn>
                    <div className='text-white flex justify-center items-center gap-3'>
                        <span className='text-4xl'><FaRegUserCircle /></span>
                        <div className='flex flex-col justify-center items-start'>
                            <span>{userInfo?.name}</span>
                            <span>{userInfo?.phone}</span>
                            <button onClick={handleLogOut} className='underline text-white'>Log Out</button>
                        </div>
                    </div>
                </div>
                <h1 className='text-2xl text-[#006769] text-center font-bold my-6'>Dashboard</h1>
                <div className='max-w-5xl mx-auto border flex justify-center items-center gap-9 p-6'>
                    <div className='w-1/3 border flex flex-col justify-center items-start gap-2 text-[#006769] underline p-4'>
                        <Link to={'/home/all-users'}>All Users</Link>
                        <Link to={'/home/all-agents'}>All Agents</Link>
                    </div>
                    <div className='w-2/3 border'>
                        <Outlet></Outlet>
                    </div>

                </div>
            </div>
        )
    }
};

export default Home;