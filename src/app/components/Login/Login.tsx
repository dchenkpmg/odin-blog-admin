import { useState } from "react";
import { useLoginMutation } from "@/app/services/apiSlice";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/app/hooks";
import { setCredentials } from "@/features/auth/authSlice";
import type { LoginRequest } from "@/app/services/apiSlice";

import styles from "./Login.module.css";

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
    <main className={styles.loginMain}>
      <section className={styles.loginCard}>
        <div className={styles.loginCardHeader}>
          <img
            src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4dd.png"
            alt="Login"
            className={styles.loginIcon}
          />
          <h2>Admin Login</h2>
          <p className={styles.loginSubtitle}>Sign in to manage your blog</p>
        </div>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              autoComplete="on"
              required
              autoFocus
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              autoComplete="on"
              required
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Log In
          </button>
        </form>
        <div className={styles.loginFooter}>
          <span>Don&apos;t have an account?</span>
          <a href="/signup" className={styles.signupLink}>
            Sign Up
          </a>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
