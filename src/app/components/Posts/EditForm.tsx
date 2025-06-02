import { useAddPostMutation } from "@/app/services/apiSlice";
import { useNavigate } from "react-router";
import { useAppSelector } from "@/app/hooks";
import { useState } from "react";
import { type NewPost } from "@/app/services/apiSlice";

export interface CreateFormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  content: HTMLTextAreaElement;
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
    <form onSubmit={handleSubmit}>
      <h2>Create New Post</h2>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="published">Published:</label>
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
      </div>
      <button type="submit">Create Post</button>
    </form>
  );
}
