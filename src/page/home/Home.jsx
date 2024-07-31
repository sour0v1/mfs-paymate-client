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


    const handleLogOut = async() => {
        // Have to do
        const res = await axiosSecure.post(`/logout?user=${user}`)
        console.log(res?.data);
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
        return <div className='w-screen min-h-screen flex justify-center items-center bg-[#0B1906] text-white'>loading...</div>
    }
    // if (!userInfo) {
    //     return <div className='w-screen h-screen flex justify-center items-center text-[#0B1906]'>loading...</div>
    // }


    if (userInfo?.role === 'user') {
        return (
            <div>
                <div className='bg-[#0B1906] py-6 px-9 flex flex-col lg:flex-row justify-between items-center gap-4'>
                    <img className='w-36 lg:w-48' src={logo} alt="" />
                    <BalanceBtn handleCheckBalance={handleCheckBalance} loading={loading} balance={balance} tap={tap}></BalanceBtn>
                    <div className='text-white flex justify-center items-center gap-3'>
                        <span className=' text-3xl lg:text-4xl'><FaRegUserCircle /></span>
                        <div className='flex flex-col justify-center items-start'>
                            <span className='font-medium'>{userInfo?.name}</span>
                            <span>{userInfo?.phone}</span>
                            <button onClick={handleLogOut} className='border-b hover:border-b-2 text-white'>Log Out</button>
                        </div>
                    </div>
                </div>
                {/* user home */}
                <div className='my-9 max-w-3xl mx-auto'>
                    <h1 className='text-2xl text-[#0B1906] text-center font-bold my-6'>Services</h1>
                    <div className='flex flex-col lg:flex-row justify-center items-center gap-6'>
                        <Link to={'/user/cash-in'} className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52 duration-200 hover:scale-105 hover:border-[#0B1906]'>
                            <span className='text-6xl text-[#0B1906]'><BsCashCoin /></span>
                            <p className='text-[#0B1906]'>Cash In</p>
                        </Link>
                        <Link to={'/user/cash-out/check-agent'} className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52 duration-200 hover:scale-105 hover:border-[#0B1906]'>
                            <span className='text-6xl text-[#0B1906]'><IoLogOut /></span>
                            <p className='text-[#0B1906]'>Cash Out</p>
                        </Link>
                        <Link to={'/user/send-money'} className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52 duration-200 hover:scale-105 hover:border-[#0B1906]'>
                            <span className='text-6xl text-[#0B1906]'><IoIosSend /></span>
                            <p className='text-[#0B1906]'>Send Money</p>
                        </Link>
                        <Link to={'/user/transactions/history/send-money'} className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52 duration-200 hover:scale-105 hover:border-[#0B1906]'>
                            <span className='text-6xl text-[#0B1906]'><FaMoneyCheckDollar /></span>
                            <p className='text-[#0B1906]'>Transactions</p>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (userInfo?.role === 'agent') {
        return (
            <div>
                <div className='bg-[#0B1906] py-6 px-9 flex flex-col lg:flex-row justify-between items-center gap-4'>
                    <img className='w-36 lg:w-48' src={logo} alt="" />
                    <BalanceBtn handleCheckBalance={handleCheckBalance} loading={loading} balance={balance} tap={tap}></BalanceBtn>
                    <div className='text-white flex justify-center items-center gap-2'>
                        <span className=' text-3xl lg:text-4xl border-r-2 p-2 rounded-full'><FaRegUserCircle /></span>
                        <div className='flex flex-col justify-center items-start'>
                            <span className='font-medium'>{userInfo?.name}</span>
                            <span>{userInfo?.phone}</span>
                            <button onClick={handleLogOut} className='border-b text-white'>Log Out</button>
                        </div>
                    </div>
                </div>
                {/* user home */}
                <div className='my-9 max-w-3xl mx-auto'>
                    <h1 className='text-2xl text-[#0B1906] text-center font-bold my-6'>Services</h1>
                    <div className='flex flex-col lg:flex-row justify-center items-center gap-6 '>
                        <Link to={'/agent/cash-in-request'} className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52 duration-200 hover:scale-105 hover:border-[#0B1906]'>
                            <span className='text-6xl text-[#0B1906]'><BsCashCoin /></span>
                            <p className='text-[#0B1906]'>Cash In Request</p>
                        </Link>
                        <div className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52 duration-200 hover:scale-105 hover:border-[#0B1906]'>
                            <span className='text-6xl text-[#0B1906]'><IoLogOut /></span>
                            <p className='text-[#0B1906]'>Cash Out Request</p>
                        </div>
                        <Link to={'/agent/transaction/history/cash-in'} className='border p-6 flex flex-col justify-center items-center gap-2 w-48 h-52 duration-200 hover:scale-105 hover:border-[#0B1906]'>
                            <span className='text-6xl text-[#0B1906]'><FaMoneyCheckDollar /></span>
                            <p className='text-[#0B1906]'>Transactions</p>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (userInfo?.role === 'admin') {
        return (
            <div>
                <div className='bg-[#0B1906] py-6 px-9 flex  flex-col lg:flex-row justify-between items-center gap-4'>
                    <img className='w-32 lg:w-48' src={logo} alt="" />
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