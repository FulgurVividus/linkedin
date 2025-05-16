import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import Post from "../components/Post";

const PostPage = () => {
  const { postId } = useParams();
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  // get the post
  const { data: post, isLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => axiosInstance.get(`/posts/${postId}`),
  });

  if (isLoading) return <p className="font-semibold">Loading post...</p>;
  if (!post?.data) return <p className="font-semibold">Post not found</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="hidden lg:block lg:col-span-1">
        <Sidebar user={authUser} />
      </div>

      <div className="col-span-1 lg:col-span-3">
        <Post post={post.data} />
      </div>
    </div>
  );
};

export default PostPage;
