import type { Comment } from "@/app/services/apiSlice";
import { useDeleteCommentMutation } from "@/app/services/apiSlice";
import styles from "./CommentsList.module.css";

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
    <div className={styles.commentsList}>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <div className={styles.commentHeader}>
              <span className={styles.author}>
                <strong>{comment.author.username}</strong>
              </span>
              <button
                className={styles.deleteComment}
                onClick={() => handleDelete(comment)}
              >
                Delete
              </button>
            </div>
            <div className={styles.content}>{comment.content}</div>
            <span className={styles.commentDate}>
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))
      ) : (
        <p className={styles.noComments}>No comments yet.</p>
      )}
    </div>
  );
}
