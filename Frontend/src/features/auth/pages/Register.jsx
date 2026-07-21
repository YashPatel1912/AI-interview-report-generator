import React from "react";
import { useNavigate, Link } from "react-router";

export const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <main>
      <div className="form-container">
        <h1>Register Page</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="test"
              id="username"
              name="username"
              placeholder="Enter Username"
            />
          </div>
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
            Register
          </button>
        </form>

        <p>
          Already have an Account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </main>
  );
};
