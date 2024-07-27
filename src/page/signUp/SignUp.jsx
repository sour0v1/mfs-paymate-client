import { useState } from 'react';
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';
import logo from '../../assets/paymate-login.webp'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hook/useAxiosSecure';

const SignUp = () => {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const [regError, setRegError] = useState(null);
    const [regSuccess, setRegSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    console.log(errors)
    const onSubmit = async (data) => {
        setRegError(null);
        setRegSuccess(null);
        setLoading(true);
        console.log(data)

        const res = await axiosSecure.post(`/reg-user`, data)
        console.log(res.data);
        if (res?.data?.insertedId) {
            setRegSuccess(true);
        }
        if (res.data?.message) {
            setRegError(res.data?.message);
            setLoading(false);
        }
        else {
            setRegSuccess('success');
            setLoading(false);
        }

    };

    return (
        <div className='bg-[#006769] h-screen w-full flex justify-center items-center px-4 lg:px-0'>

            <form onSubmit={handleSubmit(onSubmit)} className='w-full lg:w-1/3 flex flex-col justify-center items-center gap-4 text-[#006769]'>
                <img className='mb-9' src={logo} alt="" />
                <p className='text-white'>{regError}</p>
                <div className='w-full'>

                    <input {...register('name', { required: true })} className='py-3 px-4 w-full outline-none focus:outline-gray-100' type="text" placeholder='Name' />
                    {errors.name && <span className='text-white text-start inline-block w-full'>Name is required</span>}
                </div>
                <div className='w-full'>
                    <input {...register('phone', { required: true })} className='py-3 px-4 w-full outline-none focus:outline-gray-100' type="number" placeholder='Phone Number' />
                    {errors.phone && <span className='text-white text-start inline-block w-full'>Phone Number is required</span>}
                </div>
                <div className='w-full'>
                    <input {...register('email', { required: true })} className='py-3 px-4 w-full outline-none focus:outline-gray-100' type="email" placeholder='Email' />
                    {errors.email && <span className='text-white text-start inline-block w-full'>Email is required</span>}
                </div>
                <div className='w-full relative'>
                    <input {...register('password', { required: true, pattern: /^\d{5}$/ })} className='py-3 px-4 w-full outline-none focus:outline-gray-100' type={!open ? 'password' : 'text'} placeholder='Password' />
                    <span onClick={() => setOpen(!open)} className='absolute pt-4 right-0 px-2'>{!open ? <FaRegEyeSlash /> : <IoEyeOutline />}</span>
                    {errors.password?.type === 'required' && <span className='text-white text-start inline-block w-full'>Password is required</span>}
                    {errors.password?.type === 'pattern' && <span className='text-white text-start inline-block w-full'>Password must be 5 digit number</span>}
                </div>
                <div className='text-white flex justify-center items-center gap-9'>
                    <label className='inline-flex items-center gap-2'>
                        <input {...register('role')} required className='accent-[#006769] w-4 h-4' type="radio" value={'user'} />
                        <span>User</span>
                    </label>

                    <label className='inline-flex items-center gap-2'>
                        <input {...register('role')} required className='accent-[#006769] w-4 h-4' type="radio" value={'agent'} />
                        <span>Agent</span>
                    </label>

                </div>
                {
                    loading ?
                        <button className='py-3 w-1/3 bg-white text-[#006769]  flex justify-center items-center'>
                            <span className="loading loading-spinner loading-sm"></span>
                        </button> :
                        <input className='py-3 w-1/3 border border-white text-white hover:bg-white hover:text-[#006769]' type="submit" value='Sign Up' />
                }
                <div className='mt-4'>
                    <Link to={'/'} className='text-white border-b hover:border-b-2'>Log In</Link>
                </div>

            </form>
            {
                regSuccess &&
                <div className='absolute inset-0 bg-black bg-opacity-80 flex justify-center items-center'>
                    <div className='bg-white p-4 w-full lg:w-1/4 mx-4 lg:mx-0 text-center relative rounded-xl'>
                        <button className='absolute top-2 right-4 text-2xl' onClick={() => setRegSuccess(false)}>X</button>
                        <p className='my-16 text-xl text-[#006769]'>Success!</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default SignUp;