import { useAddPostMutation } from "@/app/services/apiSlice";
import { useNavigate } from "react-router";
import { useAppSelector } from "@/app/hooks";
import { useState } from "react";
import { type NewPost } from "@/app/services/apiSlice";
import { Link } from "react-router";

import styles from "./CreateForm.module.css";

export interface CreateFormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  content: HTMLTextAreaElement;
  published: HTMLInputElement;
}

export interface CreateForm extends HTMLFormElement {
  readonly elements: CreateFormElements;
}

export default function CreateForm() {
  const [addPost] = useAddPostMutation();
  const userId = useAppSelector((state) => state.auth.userId);
  const [formData, setFormData] = useState<NewPost>({
    title: "",
    content: "",
    userId: userId!,
    published: false,
  });
  const navigate = useNavigate();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<CreateForm>) => {
    event.preventDefault();
    try {
      await addPost(formData).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Post creation failed:", err);
    }
  };

  return (
    <div className={styles.createFormWrapper}>
      <form onSubmit={handleSubmit} className={styles.createForm}>
        <h2 className={styles.title}>Create New Post</h2>
        <span className={styles.subtitle}>
          <Link to="/">Back to Home</Link>
        </span>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content" className={styles.label}>
            Content:
          </label>
          <textarea
            id="content"
            name="content"
            onChange={handleChange}
            required
            className={styles.textarea}
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
            className={styles.checkbox}
          />
          <label htmlFor="published" className={styles.label}>
            Published
          </label>
        </div>
        <button type="submit" className={styles.createButton}>
          Submit Post
        </button>
      </form>
    </div>
  );
}
