import { FaHome } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { Link, Outlet } from "react-router-dom";
import MiniHeader from "../../../components/MiniHeader";


const SendMoney = () => {
    return (
        <div className='bg-[#1A1A1B] h-screen flex flex-col justify-center items-center gap-16 px-4 lg:px-0 w-full border-2 relative'>
            <MiniHeader icon={<IoIosSend />} text={'Send Money'}></MiniHeader>
            {/* <span className='text-white'>Home</span> */}
                  
            <Outlet></Outlet>
        </div>
    );
};

export default SendMoney;