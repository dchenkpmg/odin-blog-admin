import React, { useState, useMemo } from "react";
import { useAppSelector } from "@/app/hooks";
import type { NewComment } from "@/app/services/apiSlice";
import {
  useGetPostQuery,
  useGetCommentsQuery,
  usePostCommentMutation,
} from "@/app/services/apiSlice";
import { useParams } from "react-router";
import { PostContent } from "./PostContent";
import { CommentsList } from "./CommentsList";
import styles from "./Post.module.css";

function Post() {
  const [addComment] = usePostCommentMutation();
  const userId = useAppSelector((state) => state.auth.userId);
  const { postId } = useParams();
  const [formData, setFormData] = useState<NewComment>({
    postId: parseInt(postId!),
    userId: userId!,
    content: "",
  });
  const {
    data: post,
    isLoading: postIsLoading,
    isSuccess: postIsSuccess,
    isError: postIsError,
    error: postError,
  } = useGetPostQuery(parseInt(postId!));

  const {
    data: comments = [],
    isLoading: commentsIsLoading,
    isSuccess: commentsIsSuccess,
    isError: commentsIsError,
    error: commentsError,
  } = useGetCommentsQuery(parseInt(postId!));

  const sortedComments = useMemo(() => {
    const sortedComments = comments.slice();
    sortedComments.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return sortedComments;
  }, [comments]);

  let content: React.ReactNode;
  let commentList: React.ReactNode;

  if (postIsLoading) {
    content = <div className={styles.loading}>Loading...</div>;
  } else if (postIsSuccess) {
    content = <PostContent post={post} />;
  } else if (postIsError) {
    content = <div className={styles.error}>Error: {postError.toString()}</div>;
  }

  if (commentsIsLoading) {
    commentList = <div className={styles.loading}>Comments are loading...</div>;
  } else if (commentsIsSuccess) {
    commentList = <CommentsList comments={sortedComments} />;
  } else if (commentsIsError) {
    commentList = (
      <div className={styles.error}>Error: {commentsError.toString()}</div>
    );
  }

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await addComment({
        postId: parseInt(postId!),
        newComment: formData,
      }).unwrap();
      setFormData((prev) => ({ ...prev, content: "" }));
    } catch (err) {
      console.error("Comment submission failed:", err);
    }
  };

  return (
    <div className={styles.postWrapper}>
      <article className={styles.post}>{content}</article>
      <section className={styles.postComments}>
        <h3 className={styles.commentsTitle}>Comments</h3>
        {commentList}
      </section>
      <form className={styles.commentForm} onSubmit={handleSubmit}>
        <textarea
          className={styles.commentInput}
          placeholder="Add a comment..."
          onChange={handleChange}
          value={formData.content}
        ></textarea>
        <button type="submit" className={styles.commentSubmit}>
          Submit Comment
        </button>
      </form>
    </div>
  );
}

export default Post;
