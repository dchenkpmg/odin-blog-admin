import "./Home.css";
import { useGetPostsQuery } from "@/app/services/apiSlice";
import type { Post } from "@/app/services/apiSlice";
import { useMemo } from "react";
import { Link } from "react-router";
import TimeAgo from "@/app/components/Posts/TimeAgo";
import PostAuthor from "@/app/components/Posts/PostAuthor";

interface PostExcerptProps {
  post: Post;
}

function PostExcerpt({ post }: PostExcerptProps) {
  return (
    <article className="post-excerpt">
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <div>
        <PostAuthor username={post.author.username} />
        <TimeAgo timestamp={post.createdAt} />
        <span className="edit-post">
          <span>&nbsp; </span>
          <Link to={`/edit/${post.id}`}>Edit Post</Link>
          <span>&nbsp; </span>
          <Link to={`/delete/${post.id}`}>Delete Post</Link>
        </span>
        <span>&nbsp;</span>
        {post.published ? (
          <button className="change-status">
            <a href={`/post-status/${post.id}`}>Published</a>
          </button>
        ) : (
          <button className="change-status">
            <a href={`/post-status/${post.id}`}>Unpublished</a>
          </button>
        )}
      </div>
      <p className="post-content">{post.content.substring(0, 100)}...</p>
    </article>
  );
}

function Home() {
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery();

  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice();
    sortedPosts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return sortedPosts;
  }, [posts]);

  let content: React.ReactNode;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = sortedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));
  } else if (isError) {
    content = <div>Error: {error.toString()}</div>;
  }
  return (
    <>
      <h1>On the Bleeding Edge</h1>
      <span>
        <Link to="/create-post">Create New Post</Link>
      </span>
      {content}
    </>
  );
}

export default Home;
