import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isAuthenticated } from "../helpers/auth";
import isEmpty from "validator/lib/isEmpty";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import showLoading from "../helpers/loading";
import { createUser } from "../api/auth";
import { getCookie } from "../helpers/cookies";
import emailjs from "@emailjs/browser";

const UserCreate = () => {
  //navigate
  const navigate = useNavigate();

  //redirection
  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().accountType === 1) {
      navigate("/admin/create");
    } else if (isAuthenticated() && isAuthenticated().accountType === 0) {
      navigate("/user/dashboard");
    } else {
      navigate("/");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    mobile: "",
    status: "",
    accountType: "",
    password: "",
    errorMsg: false,
    successMsg: false,
    loading: false,
  });

  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    mobile,
    status,
    accountType,
    password,
    errorMsg,
    successMsg,
    loading,
  } = formData;

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      errorMsg: "",
    });
  };

  const token = getCookie("token");
  // console.log(token);

  //submit the form
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (
      isEmpty(firstName) ||
      isEmpty(lastName) ||
      isEmpty(email) ||
      isEmpty(dateOfBirth) ||
      isEmpty(mobile) ||
      isEmpty(status) ||
      isEmpty(accountType) ||
      isEmpty(password)
    ) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else {
      const data = {
        firstName,
        lastName,
        email,
        dateOfBirth,
        mobile,
        status,
        accountType,
        password,
        token,
      };

      setFormData({ ...formData, loading: true });

      //send data to backend
      createUser(data)
        .then((response) => {
          //send email
          var templateParams = {
            from_name: "login credential",
            to_name: firstName,
            message: `Your account has been successfully created and the password is ${password} and the login link is http://localhost:3000/profileEdit`,
            to_email: email,
            from_email: "surge.test@gmail.com",
          };

          emailjs
            .send(
              process.env.EMAIL_SERVICE_ID,
              process.env.EMAIL_TEMPLATE_ID,
              templateParams,
              process.env.EMAIL_USER_ID
            )
            .then(
              function (response) {
                console.log("SUCCESS!", response.status, response.text);
              },
              function (error) {
                console.log("FAILED...", error);
              }
            );

          setFormData({
            ...formData,
            firstName: "",
            lastName: "",
            email: "",
            dateOfBirth: "",
            mobile: "",
            status: "",
            accountType: "",
            password: "",
            loading: false,
            successMsg: response.data.successMessage,
          });
        })
        .catch((err) => {
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          });
        });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="content-container">
        <div className="w-container">
          <div className="Auth-form-container">
            {loading && (
              <div className="text-center pb-4 position-absolute">
                {showLoading()}
              </div>
            )}
            <form className="Auth-form" onSubmit={handleSubmit}>
              <div className="Auth-form-content">
                <h3 className="Auth-form-title">Create an User</h3>
                {errorMsg && showErrorMsg(errorMsg)}
                {successMsg && showSuccessMsg(successMsg)}
                <div className="row">
                  <div className="form-group col-md-6 mt-3">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      placeholder="Enter First name"
                      value={firstName}
                      name="firstName"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6  mt-3">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      placeholder="Enter Last Name"
                      value={lastName}
                      name="lastName"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6 mt-3">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control mt-1"
                      placeholder="Enter Email"
                      value={email}
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6 mt-3">
                    <label>Date Of Birth</label>
                    <input
                      type="date"
                      className="form-control mt-1"
                      placeholder="Enter Date Of Birth"
                      value={dateOfBirth}
                      name="dateOfBirth"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6 mt-3">
                    <label>Mobile</label>
                    <input
                      type="number"
                      className="form-control mt-1"
                      placeholder="Enter Mobile"
                      value={mobile}
                      name="mobile"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6 mt-3">
                    <label>Status</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      placeholder="Enter Status"
                      value={status}
                      name="status"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6 mt-3">
                    <label>Account Type</label>
                    <select
                      className="form-control mt-1"
                      value={accountType}
                      name="accountType"
                      onChange={handleChange}
                    >
                      <option>Select Account type</option>
                      <option value={0}>User</option>
                      <option value={1}>Admin</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6 mt-3">
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
      </div>
    </div>
  );
};

export default UserCreate;
