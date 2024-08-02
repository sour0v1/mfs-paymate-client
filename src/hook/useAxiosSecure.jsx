import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
    // baseURL : 'https://mfs-paymate-server.vercel.app/'
    baseURL: 'http://localhost:5000/',
    withCredentials: true,

});

const useAxiosSecure = () => {
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                navigate('/');
            }
            console.log(error);
            return Promise.reject(error);
        })
    }, [navigate])
    return (
        axiosSecure
    )
};

export default useAxiosSecure;