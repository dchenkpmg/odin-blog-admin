import type { Comment } from "@/app/services/apiSlice";
import { useDeleteCommentMutation } from "@/app/services/apiSlice";

interface CommentsListProps {
  comments: Comment[];
}

export function CommentsList({ comments }: CommentsListProps) {
  const [deleteComment] = useDeleteCommentMutation();

  const handleDelete = async (comment: Comment) => {
    try {
      if (window.confirm("Are you sure you want to delete this comment?")) {
        await deleteComment(comment.id).unwrap();
      }
    } catch (err) {
      console.error("Failed to delete the comment:", err);
    }
  };

  return (
    <div className="comments-list">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>
              <strong>{comment.author.username}</strong>:
            </p>
            <button
              className="delete-comment"
              onClick={() => handleDelete(comment)}
            >
              Delete
            </button>
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
