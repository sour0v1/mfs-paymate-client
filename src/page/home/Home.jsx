import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/paymate-login.webp'
import { FaRegUserCircle } from 'react-icons/fa';
import { AuthContext } from '../../provider/Provider';
import { FaMoneyCheckDollar } from 'react-icons/fa6';
import { IoLogOut } from 'react-icons/io5';
import { IoIosSend } from 'react-icons/io';
import { BsCashCoin } from 'react-icons/bs';
import { Link, Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hook/useAxiosSecure';
import BalanceBtn from '../../components/BalanceBtn';
import './Home.css'

const Home = () => {
    const { setUserIdentity, userInfo, isPending } = useContext(AuthContext);
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const [tap, setTap] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    console.log(user);

    useEffect(() => {
        const userData = localStorage.getItem('userIdentity');
        setUser(userData);
    }, [])


    const handleLogOut = async () => {

        const local = localStorage.removeItem('userIdentity');
        console.log(local);
        setUserIdentity(local);
        const res = await axiosSecure.post(`/logout`)
        console.log(res?.data);
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
        setBalance(null)
        setLoading(true);
        const balance = await axiosSecure.get(`/check-balance?email=${userInfo?.email}`);
        const netBalance = balance?.data.balance
        console.log(netBalance);
        setBalance(netBalance);
        if (netBalance >= 0) {
            setLoading(false);
        }
        console.log('hello')

    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setBalance(null);

        }, 2000)

        return () => clearTimeout(timer)
    }, [balance])

    if (isPending) {
        return <div className='w-screen min-h-screen flex justify-center items-center bg-[#1A1A1B] text-white'>loading...</div>
    }
    // if (!userInfo) {
    //     return <div className='w-screen h-screen flex justify-center items-center text-[#1A1A1B]'>loading...</div>
    // }


    if (userInfo?.role === 'user') {
        return (
            <div>
                <div className='bg-[#1A1A1B] py-6 px-9 flex flex-col lg:flex-row justify-between items-center gap-4'>
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
                    <h1 className='text-2xl text-[#1A1A1B] text-center font-bold my-6'>Services</h1>
                    <div className='flex flex-col lg:flex-row justify-center items-center gap-6'>
                        <Link to={'/user/cash-in'} className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52 duration-200 hover:scale-105 hover:border-[#1A1A1B]'>
                            <span className='text-6xl text-[#1A1A1B]'><BsCashCoin /></span>
                            <p className='text-[#1A1A1B]'>Cash In</p>
                        </Link>
                        <Link to={'/user/cash-out/check-agent'} className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52 duration-200 hover:scale-105 hover:border-[#1A1A1B]'>
                            <span className='text-6xl text-[#1A1A1B]'><IoLogOut /></span>
                            <p className='text-[#1A1A1B]'>Cash Out</p>
                        </Link>
                        <Link to={'/user/send-money'} className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52 duration-200 hover:scale-105 hover:border-[#1A1A1B]'>
                            <span className='text-6xl text-[#1A1A1B]'><IoIosSend /></span>
                            <p className='text-[#1A1A1B]'>Send Money</p>
                        </Link>
                        <Link to={'/user/transactions/history/send-money'} className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52 duration-200 hover:scale-105 hover:border-[#1A1A1B]'>
                            <span className='text-6xl text-[#1A1A1B]'><FaMoneyCheckDollar /></span>
                            <p className='text-[#1A1A1B]'>Transactions</p>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (userInfo?.role === 'agent') {
        return (
            <div>
                <div className='bg-[#1A1A1B] py-6 px-9 flex flex-col lg:flex-row justify-between items-center gap-4'>
                    <div className='relative px-10'>
                        <img className='w-36 lg:w-48' src={logo} alt="" />
                        <span className='absolute top-0 right-0 text-white text-sm font-roboto'>Agent</span>
                    </div>
                    <BalanceBtn handleCheckBalance={handleCheckBalance} loading={loading} balance={balance} tap={tap}></BalanceBtn>
                    <div className='text-white flex justify-center items-center gap-2'>
                        <span className=' text-3xl lg:text-4xl border-r-2 p-2 rounded-full'><FaRegUserCircle /></span>
                        <div className='flex flex-col justify-center items-start'>
                            <span className='font-medium'>{userInfo?.name}</span>
                            <span>{userInfo?.phone}</span>
                            <button onClick={handleLogOut} className='underline text-white'>Log Out</button>
                        </div>
                    </div>
                </div>
                {/* user home */}
                <div className='my-9 max-w-3xl mx-auto'>
                    <h1 className='text-2xl text-[#1A1A1B] text-center font-bold my-6'>Services</h1>
                    <div className='flex flex-col lg:flex-row justify-center items-center gap-6 '>
                        <Link to={'/agent/cash-in-request'} className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52 duration-200 hover:scale-105 hover:border-[#1A1A1B]'>
                            <span className='text-6xl text-[#1A1A1B]'><BsCashCoin /></span>
                            <p className='text-[#1A1A1B]'>Cash In Request</p>
                        </Link>
                        <Link to={'/agent/cash-out-request'} className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52 duration-200 hover:scale-105 hover:border-[#1A1A1B]'>
                            <span className='text-6xl text-[#1A1A1B]'><IoLogOut /></span>
                            <p className='text-[#1A1A1B]'>Cash Out Request</p>
                        </Link>
                        <Link to={'/agent/transaction/history/cash-in'} className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52 duration-200 hover:scale-105 hover:border-[#1A1A1B]'>
                            <span className='text-6xl text-[#1A1A1B]'><FaMoneyCheckDollar /></span>
                            <p className='text-[#1A1A1B]'>Transactions</p>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (userInfo?.role === 'admin') {
        return (
            <div>
                <div className='bg-[#1A1A1B] py-6 px-9 flex  flex-col lg:flex-row justify-between items-center gap-4'>
                    <div className='relative px-10'>
                        <img className='w-36 lg:w-48' src={logo} alt="" />
                        <span className='absolute top-0 right-0 text-white text-sm font-roboto'>Admin</span>
                    </div>
                    <h1 className=' text-xl lg:text-2xl text-white text-center font-bold'>Dashboard</h1>
                    <div className='text-white flex justify-center items-center gap-3'>
                        <span className='text-2xl lg:text-4xl'><FaRegUserCircle /></span>
                        <div className='flex flex-col justify-center items-start'>
                            <span>{userInfo?.name}</span>
                            <span>{userInfo?.phone}</span>
                            <button onClick={handleLogOut} className='underline text-white'>Log Out</button>
                        </div>
                    </div>
                </div>

                <div className='max-w-6xl mx-auto flex flex-col lg:flex-row justify-center items-start gap-4 lg:gap-9 my-3 px-4 lg:px-0'>
                    <div id='dashboard' className='px-6 h-full lg:min-h-screen flex flex-col items-start gap-3 py-3 w-full lg:w-fit border lg:my-9'>
                        <NavLink to={'/home/admin'}>All Users</NavLink>
                        <NavLink to={'/home/all-agents'}>All Agents</NavLink>
                    </div>
                    <div className='w-full lg:w-3/4 lg:my-9'>
                        <Outlet></Outlet>
                    </div>

                </div>
            </div>
        )
    }
};

export default Home;