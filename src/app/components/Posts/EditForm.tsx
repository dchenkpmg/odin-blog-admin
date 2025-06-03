import { useEditPostMutation } from "@/app/services/apiSlice";
import { useNavigate, useParams } from "react-router";
import { useAppSelector } from "@/app/hooks";
import { useState, useEffect } from "react";
import { type NewPost, useGetPostQuery } from "@/app/services/apiSlice";
import { Link } from "react-router";
import styles from "./EditForm.module.css";

export interface EditFormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  content: HTMLTextAreaElement;
  published: HTMLInputElement;
}

export interface EditForm extends HTMLFormElement {
  readonly elements: EditFormElements;
}

export default function CreateForm() {
  const [editPost] = useEditPostMutation();
  const { postId } = useParams();
  const { data: post, isSuccess } = useGetPostQuery(parseInt(postId!));
  const userId = useAppSelector((state) => state.auth.userId);
  const [formData, setFormData] = useState<NewPost>({
    title: "",
    content: "",
    userId: userId!,
    published: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && post) {
      setFormData({
        title: post.title,
        content: post.content,
        userId: userId!,
        published: post.published,
      });
    }
  }, [isSuccess, post, userId]);

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<EditForm>) => {
    event.preventDefault();
    try {
      await editPost({ post: formData, id: parseInt(postId!) }).unwrap();
      navigate(`/posts/${postId}`);
    } catch (err) {
      console.error("Post edit failed:", err);
    }
  };

  return (
    <div className={styles.editFormWrapper}>
      <form onSubmit={handleSubmit} className={styles.editForm}>
        <h2>Edit Post</h2>
        <span className={styles.subtitle}>
          <Link to={`/posts/${postId}`}>Back to Post</Link>
        </span>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="published"
            name="published"
            checked={formData.published}
            onChange={({ target: { name, checked } }) =>
              setFormData((prev) => ({
                ...prev,
                [name]: checked,
              }))
            }
          />
          <label htmlFor="published">Published</label>
        </div>
        <button type="submit" className={styles.editButton}>
          Submit Post
        </button>
      </form>
    </div>
  );
}
