import type { Post } from "@/app/services/apiSlice";

interface PostContentProps {
  post: Post;
}

export function PostContent({ post }: PostContentProps) {
  return (
    <div className="post-content">
      <h1>{post.title}</h1>
      <div className="subtitle">
        <span className="post-author">By: {post.author.username}</span>
        <span className="post-date">
          &nbsp; Published on: {new Date(post.createdAt).toLocaleDateString()}
        </span>
        <span className="post-updated">
          &nbsp; Last updated: {new Date(post.updatedAt).toLocaleDateString()}
        </span>
      </div>
      <p>{post.content}</p>
    </div>
  );
}
