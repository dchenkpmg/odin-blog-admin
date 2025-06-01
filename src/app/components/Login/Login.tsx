import { useState } from "react";
import { useLoginMutation } from "@/app/services/apiSlice";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/app/hooks";
import { setCredentials } from "@/features/auth/authSlice";
import type { LoginRequest } from "@/app/services/apiSlice";

import "./Login.module.css";

interface LoginFormFields extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
}

interface LoginFormElement extends HTMLFormElement {
  readonly elements: LoginFormFields;
}

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const [formData, setFormData] = useState<LoginRequest>({
    username: "",
    password: "",
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<LoginFormElement>) => {
    e.preventDefault();
    try {
      const user = await login(formData).unwrap();
      console.log("User returned successfully!");
      dispatch(setCredentials(user));
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <main>
      <section className="formSection">
        <form className="loginForm" onSubmit={handleSubmit}>
          <h2>Log in to access the admin view</h2>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            autoCorrect="on"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            autoComplete="on"
            required
          />
          <button type="submit">Log In</button>
        </form>
        <a href="/signup" className="homeLink">
          Sign Up
        </a>
      </section>
    </main>
  );
};

export default LoginPage;
