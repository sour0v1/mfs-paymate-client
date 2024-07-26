import { FaHome } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { Link, Outlet } from "react-router-dom";


const SendMoney = () => {
    return (
        <div className='bg-[#006769] h-screen flex flex-col justify-center items-center gap-16 px-4 lg:px-0 w-full border-2 relative'>
            <div className='absolute top-4 left-4 flex justify-center items-center gap-4'>
                <Link to={'/home'} className='text-white text-2xl'><FaHome /></Link>
                <div className='pl-2 border-l-2 flex justify-center items-center  gap-1 py-3'>
                    <p className='text-2xl text-white'><span><IoIosSend /></span></p>
                    <span className='text-white'>Send Money</span>
                </div>
            </div>
            {/* <span className='text-white'>Home</span> */}
            
            <Outlet></Outlet>
        </div>
    );
};

export default SendMoney;