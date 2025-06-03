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

interface ValidationError {
  location: string;
  msg: string;
  path: string;
  type: string;
  value: string;
}

type ValidationErrors = ValidationError[];

const Signup = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<ValidationErrors>([
    {
      location: "",
      msg: "",
      path: "",
      type: "",
      value: "",
    },
  ]);
  const [register, { isError }] = useRegisterMutation();

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
      if (
        err &&
        typeof err === "object" &&
        "data" in err &&
        err.data &&
        typeof err.data === "object" &&
        "errors" in err.data
      ) {
        setErrorMessage(err.data.errors as ValidationErrors);
        console.error("Validation errors:", err.data.errors);
      } else {
        setErrorMessage([
          {
            location: "form",
            msg: "An unexpected error occurred. Please try again.",
            path: "",
            type: "",
            value: "",
          },
        ]);
      }
      console.error("Signup failed:", err);
    }
  };

  return (
    <main className={styles.signupMain}>
      <section className={styles.formSection}>
        <h2 className={styles.formTitle}>Admin Signup</h2>
        <div className={styles.errorMessage}>
          {isError && errorMessage.length > 0
            ? errorMessage.map((error, index) => (
                <p key={index} className={styles.errorText}>
                  {error.msg}
                </p>
              ))
            : "Please fill out the form to create an admin account."}
        </div>
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
