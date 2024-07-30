import React from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MiniHeader = ({icon, text}) => {
    return (
        <div className='absolute top-4 left-4 flex justify-center items-center gap-4'>
            <Link to={'/home'} className='text-white text-2xl'><FaHome /></Link>
            <div className='pl-2 border-l-2 flex justify-center items-center  gap-1 py-3'>
                <p className='text-2xl text-white'><span>{icon}</span></p>
                <span className='text-white'>{text}</span>
            </div>
        </div>
    );
};

export default MiniHeader;