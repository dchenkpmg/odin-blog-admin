import type { Post } from "@/app/services/apiSlice";
import { Link } from "react-router";

interface PostContentProps {
  post: Post;
}

export function PostContent({ post }: PostContentProps) {
  return (
    <div className="post-content">
      <h1>{post.title}</h1>
      <span className="subtitle">
        <Link to={"/"}>Back to Front Page</Link>
        &nbsp;|&nbsp;
        <Link to={`/edit/${post.id}`}>Edit Post</Link>
        &nbsp;|&nbsp;
        {post.published ? (
          <span className="post-status">Published</span>
        ) : (
          <span className="post-status">Unpublished</span>
        )}
      </span>
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
