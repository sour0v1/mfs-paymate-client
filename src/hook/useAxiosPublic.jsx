import axios from 'axios';

const axiosPublic = axios.create({
    baseURL : 'https://mfs-paymate-server.vercel.app/'
});

const useAxiosPublic = () => {
    return(
        axiosPublic
    )
};

export default useAxiosPublic;