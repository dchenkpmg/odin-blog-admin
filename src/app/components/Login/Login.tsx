import "./Login.module.css";

function Login() {
  return (
    <main>
      <section className="formSection">
        <form className="loginForm" action="/login" method="POST">
          <h2>Log in to access the admin view</h2>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
          <button type="submit">Log In</button>
        </form>
      </section>
    </main>
  );
}

export default Login;
