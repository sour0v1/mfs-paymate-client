import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';

const AllAgents = () => {
  const axiosSecure = useAxiosSecure();
  const { data: agents, refetch, isPending } = useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const res = await axiosSecure.get('/all-agents');
      return res.data;
    }
  })
  console.log(agents);

  // verify agents
  const handleVerifyAgent = async (id) => {
    const res = await axiosSecure.post(`/verify-agent?id=${id}`)
    console.log(res.data);
    if (res.data?.verified) {
      refetch();
    }
  }
  if (isPending) {
    return <div className='w-full h-full flex justify-center items-center text-[#006769]'>loading...</div>
  }
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              agents?.map((agent, idx) => <tr key={idx}>
                <th>{idx + 1}</th>
                <td>{agent?.name}</td>
                <td>{agent?.phone}</td>
                <td>{agent?.email}</td>
                <td><button onClick={() => handleVerifyAgent(agent?._id)} className={`${agent?.verified ? 'text-[#006769]' : 'text-black border-b border-black'}`}>{agent?.verified ? 'Verified' : 'Verify'}</button></td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAgents;