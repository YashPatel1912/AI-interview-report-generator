import React from "react";
import "../auth.form.scss";
import { useNavigate, Link } from "react-router";

export const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <main>
      <div className="form-container">
        <h1>Login Page</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
            />
          </div>
          <button type="submit" className="button primary-button">
            Login
          </button>
        </form>

        <p>
          Don't have an Account? <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </main>
  );
};
