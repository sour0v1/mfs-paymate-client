import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";


const AllAgents = () => {
  const axiosSecure = useAxiosSecure();
  const { data: agents, refetch, isPending, isFetching } = useQuery({
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
    if (res.data?.modifiedCount) {
      refetch();
      console.log('hmmmmmm');
    }
  }
  if (isPending || isFetching) {
    return <div className='w-full h-full flex justify-center items-center text-[#1A1A1B]'>loading...</div>
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
                <td><button onClick={() => handleVerifyAgent(agent?._id)} className={`${agent?.verified ? 'text-[#1A1A1B]' : 'text-black border-b border-black'}`}>{agent?.verified ? 'Verified' : 'Verify'}</button></td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAgents;