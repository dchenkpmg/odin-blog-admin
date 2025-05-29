import { useState } from "react";
import { useNavigate } from "react-router";

interface SignupFormFields extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;
}

interface SignupFormElement extends HTMLFormElement {
  readonly elements: SignupFormFields;
}

interface SignupRequest {
  username: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignupRequest>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<SignupFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Submitting form with data:", formData);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/admin/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      if (!response.ok) {
        throw new Error("Signup failed");
      }
      const data = await response.json();
      console.log("Signup successful:", data);
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again.");
      return;
    }
    console.log("Form submitted:", formData);
    navigate("/login");
  };

  return (
    <main className="signupMain">
      <section className="formSection">
        <form className="signupForm" onSubmit={handleSubmit}>
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
          <button type="submit">Sign Up</button>
        </form>
      </section>
    </main>
  );
};

export default Signup;
