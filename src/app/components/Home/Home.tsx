import styles from "./Home.module.css";
import {
  useGetPostsQuery,
  useDeletePostMutation,
} from "@/app/services/apiSlice";
import type { Post } from "@/app/services/apiSlice";
import { useMemo } from "react";
import { Link } from "react-router";
import TimeAgo from "@/app/components/Posts/TimeAgo";
import PostAuthor from "@/app/components/Posts/PostAuthor";

interface PostExcerptProps {
  post: Post;
}

function PostExcerpt({ post }: PostExcerptProps) {
  const [deletePost] = useDeletePostMutation();

  const handleDelete = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this comment?")) {
        await deletePost(post.id).unwrap();
      }
      // await deletePost(post.id).unwrap();
    } catch (err) {
      console.error("Failed to delete the post:", err);
    }
  };

  return (
    <article className={styles.postExcerpt}>
      <h3 className={styles.postTitle}>
        <Link to={`/posts/${post.id}`} className={styles.postLink}>
          {post.title}
        </Link>
      </h3>
      <div className={styles.postMeta}>
        <PostAuthor username={post.author.username} />
        <TimeAgo timestamp={post.createdAt} />
        <span className={styles.postStatus}>
          &nbsp;|&nbsp;
          {post.published ? "Published" : "Unpublished"}
        </span>
        <span className={styles.editPost}>
          <Link to={`/edit/${post.id}`} className={styles.editLink}>
            Edit Post
          </Link>
          <button className={styles.deletePost} onClick={handleDelete}>
            Delete Post
          </button>
        </span>
      </div>
      <p className={styles.postContent}>{post.content.substring(0, 100)}...</p>
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
    content = <div className={styles.loading}>Loading...</div>;
  } else if (isSuccess) {
    content = sortedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));
  } else if (isError) {
    content = <div className={styles.error}>Error: {error.toString()}</div>;
  }

  return (
    <div className={styles.homeWrapper}>
      <span className={styles.createPostLink}>
        <Link to="/create-post">Create New Post</Link>
      </span>
      {content}
    </div>
  );
}

export default Home;
