import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import showLoading from "../helpers/loading";
import { isAuthenticated, setAuthentication } from "../helpers/auth";
import { showErrorMsg } from "../helpers/message";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import { login } from "../api/auth";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().accountType === 1) {
      navigate("/admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().accountType === 0) {
      navigate("/user/dashboard");
    } else {
      navigate("/");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errorMsg: false,
    loading: false,
  });

  const { email, password, errorMsg, loading } = formData;

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      errorMsg: "",
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    //login validation
    if (isEmpty(email) || isEmpty(password)) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid email",
      });
    } else {
      const { email, password } = formData;
      const data = { email, password };

      setFormData({ ...formData, loading: true });

      login(data)
        .then((response) => {
          setAuthentication(response.data.token, response.data.user);

          if (isAuthenticated() && isAuthenticated().accountType === 1) {
            // console.log("redirect to admin page");
            navigate("/admin/dashboard");
          } else {
            // console.log("redirect to user page");
            navigate("/user/dashboard");
          }
        })
        .catch((err) => {
          console.log("login api function error: ", err);
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          });
          console.log(err.response.data.errorMessage);
        });
    }
  };

  return (
    <div>
      <div
        className="Auth-form-container-login"
        onSubmit={handleSubmit}
        nonValidate
      >
        {loading && (
          <div className="text-center pb-4 position-absolute">
            {showLoading()}
          </div>
        )}
        <form className="Auth-form-login">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>

            {errorMsg && showErrorMsg(errorMsg)}

            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email}
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
