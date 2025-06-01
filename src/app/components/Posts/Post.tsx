import { useGetPostQuery } from "@/app/services/apiSlice";
import type { Post } from "@/app/services/apiSlice";

interface PostContentProps {
  post: Post;
}

function PostContent({ post }: PostContentProps) {
  return (
    <div className="post-content">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p className="post-author">By: {post.username}</p>
      <p className="post-date">Published on: {new Date(post.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
    </div>
  )

export default function Post() {
  const {
    data: post,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostQuery();

  let content: React.ReactNode;

  if (isLoading) {
    content = <div>Loading...</div>
  } else if (isSuccess) {
    content = (
      <article className="post'>
        <h2>{post.title}></h2>

    )

}
