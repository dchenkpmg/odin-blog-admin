import { useState } from "react";
import { useNavigate } from "react-router";
import { useRegisterMutation } from "@/app/services/apiSlice";
import styles from "./Signup.module.css";

interface SignupFormFields extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;
  adminCode: HTMLInputElement;
}

interface SignupFormElement extends HTMLFormElement {
  readonly elements: SignupFormFields;
}

interface SignupRequest {
  username: string;
  password: string;
  confirmPassword: string;
  adminCode: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  const [formData, setFormData] = useState<SignupRequest>({
    username: "",
    password: "",
    confirmPassword: "",
    adminCode: "",
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<SignupFormElement>) => {
    e.preventDefault();
    try {
      await register(formData).unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <main className={styles.signupMain}>
      <section className={styles.formSection}>
        <h2 className={styles.formTitle}>Admin Signup</h2>
        <form className={styles.signupForm} onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <label htmlFor="adminCode">Admin Code</label>
          <input
            type="password"
            id="adminCode"
            name="adminCode"
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </section>
    </main>
  );
};

export default Signup;
