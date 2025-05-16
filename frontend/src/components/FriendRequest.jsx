import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router";
import avatar from "../assets/avatar.png";

const FriendRequest = ({ request }) => {
  const queryClient = useQueryClient();

  // mutation to accept request
  const { mutate: acceptConnectionRequest } = useMutation({
    mutationFn: async (requestId) =>
      axiosInstance.put(`/connections/accept/${requestId}`),
    onSuccess: () => {
      toast.success("Connection request accepted");
      queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong");
    },
  });

  // mutation to reject request
  const { mutate: rejectConnectionRequest } = useMutation({
    mutationFn: async (requestId) =>
      axiosInstance.put(`/connections/reject/${requestId}`),
    onSuccess: () => {
      toast.success("Connection request rejected");
      queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong");
    },
  });

  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        <Link to={`/profile/${request.sender.username}`}>
          <img
            src={request.sender.profilePicture || avatar}
            alt={request.name}
            className="size-16 rounded-full object-cover"
          />
        </Link>

        <div>
          <Link
            to={`/profile/${request.sender.username}`}
            className="font-semibold text-lg"
          >
            <p className="text-gray-600">{request.sender.headline}</p>
          </Link>
        </div>
      </div>

      <div className="space-x-2">
        <button
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
          onClick={() => acceptConnectionRequest(request._id)}
          title="Accept"
        >
          Accept
        </button>
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
          onClick={() => rejectConnectionRequest(request._id)}
          title="Reject"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default FriendRequest;
