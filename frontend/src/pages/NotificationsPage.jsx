import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {
  ExternalLink,
  Eye,
  MessageSquare,
  ThumbsUp,
  Trash2,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router";
import Sidebar from "../components/Sidebar";
import { formatDistanceToNow } from "date-fns";
import avatar from "../assets/avatar.png";

const NotificationsPage = () => {
  const queryClient = useQueryClient();
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  // get notifications
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => axiosInstance.get(`/notifications`),
  });

  // mutation for marking notifications
  const { mutate: markAsReadMutation } = useMutation({
    mutationFn: async (id) => axiosInstance.put(`/notifications/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Marked successfully");
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Failed to mark notification");
    },
  });

  // mutation for deleting notification
  const { mutate: deleteNotificationMutation } = useMutation({
    mutationFn: async (id) => axiosInstance.delete(`/notifications/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Deleted successfully");
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Failed to delete");
    },
  });

  function renderNotificationIcon(type) {
    switch (type) {
      case "like":
        return <ThumbsUp className="text-blue-500" />;

      case "comment":
        return <MessageSquare className="text-green-500" />;

      case "connectionAccepted":
        return <UserPlus className="text-purple-500" />;

      default:
        return null;
    }
  }

  function renderNotificationContent(notification) {
    switch (notification.type) {
      case "like":
        return (
          <span>
            <strong>{notification.relatedUser.name}</strong> liked your post
          </span>
        );

      case "comment":
        return (
          <span>
            <Link
              to={`/profile/${notification.relatedUser.username}`}
              className="font-bold"
            >
              {notification.relatedUser.name}
            </Link>{" "}
            commented on your post
          </span>
        );

      case "connectionAccepted":
        return (
          <span>
            <Link
              to={`/profile/${notification.relatedUser.username}`}
              className="font-bold"
            >
              {notification.relatedUser.name}
            </Link>{" "}
            accepted your connection request
          </span>
        );

      default:
        return null;
    }
  }

  function renderRelatedPost(relatedPost) {
    if (!relatedPost) return null;

    return (
      <Link
        to={`/post/${relatedPost._id}`}
        className="mt-2 p-2 bg-gray-50 rounded-md flex items-center space-x-2 hover:bg-gray-100 transition-colors cursor-pointer"
      >
        {relatedPost.image && (
          <img
            src={relatedPost.image}
            alt="Post preview"
            className="w-10 h-10 object-cover rounded"
          />
        )}
        <div className="flex-1 overflow-hidden">
          <p className="text-sm text-gray-600 truncate">
            {relatedPost.content}
          </p>
        </div>
        <ExternalLink size={14} className="text-gray-400" />
      </Link>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="col-span-1 lg:col-span-1">
        <Sidebar user={authUser} />
      </div>

      <div className="col-span-1 lg:col-span-3">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Notifications</h1>

          {isLoading ? (
            <p>Loading notifications...</p>
          ) : notifications && notifications.data.length > 0 ? (
            <ul className="space-y-2">
              {notifications.data.map((notification) => (
                <li
                  key={notification._id}
                  className={`bg-white border rounded-lg p-4 transition-all hover:shadow-md ${
                    !notification.read ? "border-blue-500" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <Link
                        to={`/profile/${notification.relatedUser.username}`}
                      >
                        <img
                          src={
                            notification.relatedUser.profilePicture || avatar
                          }
                          alt={notification.relatedUser.name}
                          className="size-12 rounded-full object-cover"
                        />
                      </Link>

                      <div>
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-gray-100 rounded-full">
                            {renderNotificationIcon(notification.type)}
                          </div>
                          <p className="text-sm">
                            {renderNotificationContent(notification)}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDistanceToNow(
                            new Date(notification.createdAt),
                            { addSuffix: true }
                          )}
                        </p>
                        {renderRelatedPost(notification.relatedPost)}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {!notification.read && (
                        <button
                          className="p-1 text-blue-600 bg-blue-100 rounded hover:bg-blue-200 transition-colors cursor-pointer"
                          aria-label="Mark as read"
                          title="Mark as read"
                          onClick={() => markAsReadMutation(notification._id)}
                        >
                          <Eye size={16} />
                        </button>
                      )}

                      <button
                        onClick={() =>
                          deleteNotificationMutation(notification._id)
                        }
                        aria-label="Delete notification"
                        title="Delete notification"
                        className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-medium text-xl">
              No notifications at the moment :(
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
