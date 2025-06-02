import React from "react";
import { useState } from "react";
import { useMemo } from "react";
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
    content = <div>Loading...</div>;
  } else if (postIsSuccess) {
    content = <PostContent post={post} />;
  } else if (postIsError) {
    content = <div>Error: {postError.toString()}</div>;
  }

  if (commentsIsLoading) {
    commentList = <div>Comments are loading...</div>;
  } else if (commentsIsSuccess) {
    commentList = <CommentsList comments={sortedComments} />;
  } else if (commentsIsError) {
    commentList = <div>Error: {commentsError.toString()}</div>;
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
    } catch (err) {
      console.error("Comment submission failed:", err);
    }
  };

  return (
    <div className="post-wrapper">
      <article className="post">{content}</article>
      <section className="post-comments">
        <h3>Comments</h3>
        {commentList}
      </section>
      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          className="comment-input"
          placeholder="Add a comment..."
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="comment-submit">
          Submit Comment
        </button>
      </form>
    </div>
  );
}

export default Post;
