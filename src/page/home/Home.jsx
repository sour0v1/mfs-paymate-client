import React, { useContext } from 'react';
import logo from '../../assets/paymate-login.webp'
import { FaRegUserCircle } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hook/useAxiosSecure';
import Provider, { AuthContext } from '../../provider/Provider';

const Home = () => {
    const {userIdentity} = useContext(AuthContext)
    console.log(userIdentity);
    const axiosSecure = useAxiosSecure();
    const {data : userInfo} = useQuery({
        queryKey : ['userInfo'],
        queryFn : async () => {
            const res = await axiosSecure.get(`/user-info?userIdentity=${userIdentity}`)
            return res.data;
        }
    })
    console.log(userInfo);
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
                    </div>
                </div>
           </div>
        </div>
    );
};

export default Home;