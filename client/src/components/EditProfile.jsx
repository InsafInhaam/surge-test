import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isAuthenticated } from "../helpers/auth";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import showLoading from "../helpers/loading";
import { updateProfile, getUserById } from "../api/auth";

const EditProfile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/profileEdit");
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

  const user_id = isAuthenticated()._id;
  //   console.log(user_id);

  useEffect(() => {
    // your api data
    getUserById(user_id).then((response) => {
      setFormData(response.data);
    });
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      dateOfBirth === "" ||
      mobile === "" ||
      status === "" ||
      accountType === "" ||
      password === ""
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
      };

      setFormData({ ...formData, loading: true });

      updateProfile(user_id, data)
        .then((response) => {
          setFormData({
            ...formData,

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
                <h3 className="Auth-form-title">Update Profile</h3>
                {errorMsg && showErrorMsg(errorMsg)}
                {successMsg && showSuccessMsg(successMsg)}
                <div className="row">
                  <div className="form-group col-md-6 mt-3">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      placeholder="Enter first name"
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
                      placeholder="Enter email"
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
                      placeholder="Enter Date Of Birth"
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
                      <option>Select account type</option>
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
                    Update Profile
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

export default EditProfile;
