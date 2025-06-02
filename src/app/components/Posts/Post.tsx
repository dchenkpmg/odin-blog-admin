import React from "react";
import { useMemo } from "react";
import { useGetPostQuery, useGetCommentsQuery } from "@/app/services/apiSlice";
import { useParams } from "react-router";
import { PostContent } from "./PostContent";
import { CommentsList } from "./CommentsList";

function Post() {
  const { postId } = useParams();
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

  return (
    <div className="post-wrapper">
      <article className="post">{content}</article>
      <section className="post-comments">
        <h3>Comments</h3>
        {commentList}
      </section>
      <form className="comment-form">
        <textarea
          className="comment-input"
          placeholder="Add a comment..."
        ></textarea>
        <button type="submit" className="comment-submit">
          Submit Comment
        </button>
      </form>
    </div>
  );
}

export default Post;
