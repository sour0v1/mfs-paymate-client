import React, { useContext, useState } from 'react';
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';
import logo from '../../assets/paymate-login.webp'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hook/useAxiosSecure';

const Login = () => {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [logError, setLogError] = useState(null);
    const [logSuccess, setLogSuccess] = useState(null);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            console.log(data)
            const userIdentity = data?.userIdentity;

            const res = await axiosSecure.post(`/log-user`, data)
            console.log(res.data);
            if (res.data?.message) {
                setLogError(res.data?.message);
                setLoading(false);
            }
            else {
                setLogSuccess('success');
                setLoading(false);
                setLogError(null);
                localStorage.setItem('userIdentity', `${userIdentity}`);
                if (res.data?.role == 'admin') {
                    return navigate('/home/admin');
                }
                navigate('/home');

            }

        }
        catch{
            console.log(errors);
        }
    };
    return (
        <div className='bg-[#1A1A1B] min-h-screen w-full flex justify-center items-center px-4 py-6 lg:px-0'>

            <form onSubmit={handleSubmit(onSubmit)} className='w-full lg:w-1/3 flex flex-col justify-center items-center gap-4 text-[#1A1A1B]'>
                <img className='mb-9 absolute top-6 left-6 border-l-4 pl-2 py-3 w-48' src={logo} alt="" />
                <p className='text-white'>{logError}</p>
                <div className='w-full'>
                    <input {...register('userIdentity', { required: true })} className='py-3 px-4 w-full outline-none focus:outline-gray-100 rounded-sm' type="text" placeholder='Phone or Email' />
                    {errors.userIdentity && <span className='text-white text-start inline-block w-full pt-1'>Phone or Email is required</span>}
                </div>
                <div className='w-full relative'>
                    <input {...register('password', { required: true })} className='py-3 px-4 w-full outline-none focus:outline-gray-100 rounded-sm' type={!open ? 'password' : 'text'} placeholder='Password' />
                    <span onClick={() => setOpen(!open)} className='absolute pt-4 right-0 px-2'>{!open ? <FaRegEyeSlash /> : <IoEyeOutline />}</span>
                    {errors.password && <span className='text-white text-start inline-block w-full pt-1'>Password is required</span>}
                </div>
                {
                    loading ?
                        <button className='py-3 w-1/3 bg-white text-[#1A1A1B] rounded-full flex justify-center items-center'>
                            <span className="loading loading-spinner loading-sm"></span>
                        </button> :
                        <input className='py-3 w-1/3 border border-white rounded-full text-white hover:bg-white hover:text-[#1A1A1B]' type="submit" value='Sign In' />
                }
                {/* <input className='py-3 w-1/3 border border-white text-white hover:bg-white hover:text-[#1A1A1B]' type="submit" value='Log In' /> */}
                <div className='mt-4'>
                    <Link to={'/sign-up'} className='text-white border-b hover:border-b-2'>Create Account</Link>
                </div>

            </form>
        </div>
    );
};

export default Login;