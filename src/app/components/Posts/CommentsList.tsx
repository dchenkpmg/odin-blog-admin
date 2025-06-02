import type { Comment } from "@/app/services/apiSlice";

interface CommentsListProps {
  comments: Comment[];
}

export function CommentsList({ comments }: CommentsListProps) {
  return (
    <div className="comments-list">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>
              <strong>{comment.author.username}</strong>:
            </p>
            <p>{comment.content}</p>
            <span className="comment-date">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
}
