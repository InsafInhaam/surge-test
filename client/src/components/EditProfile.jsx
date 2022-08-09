import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isAuthenticated } from "../helpers/auth";
import isEmpty from "validator/lib/isEmpty";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import showLoading from "../helpers/loading";
import { updateProfile, getUserById } from "../api/auth";
import { getCookie } from "../helpers/cookies";

const EditProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/profileEdit");
    } else {
      navigate("/");
    }
  }, [navigate]);

  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   dateOfBirth: "",
  //   mobile: "",
  //   status: "",
  //   accountType: "",
  //   password: "",
  //   errorMsg: false,
  //   successMsg: false,
  //   loading: false,
  // });

  //   const {
  //     firstName,
  //     lastName,
  //     email,
  //     dateOfBirth,
  //     mobile,
  //     status,
  //     accountType,
  //     password,
  //     errorMsg,
  //     successMsg,
  //     loading,
  //   } = formData;

  //   const handleChange = (evt) => {
  //     // setFormData({
  //     //   ...formData,
  //     //   [evt.target.name]: evt.target.value,
  //     //   errorMsg: "",
  //     // });

  //     setUser(evt.target.value);
  //   };

  const user_id = isAuthenticated()._id;
  //   console.log(user_id);

  //   getUserById(user_id).then((response) => {
  //     // loading = true;
  //     // setFormData(response.data);
  //     formData.firstName = response.data.firstName;
  //     formData.lastName = response.data.lastName;
  //     formData.email = response.data.email;
  //     formData.mobile = response.data.mobile;
  //     //formData.dateOfBirth = response.data.dateOfBirth;
  //     formData.status = response.data.status;
  //     formData.accountType = response.data.accountType;
  //   });

  //   const token = getCookie("token");
  // console.log(token);

  //   const handleSubmit = (evt) => {
  //     evt.preventDefault();
  //     if (
  //       isEmpty(firstName) ||
  //       isEmpty(lastName) ||
  //       isEmpty(email) ||
  //       isEmpty(dateOfBirth) ||
  //       isEmpty(mobile) ||
  //       isEmpty(status) ||
  //       isEmpty(accountType) ||
  //       isEmpty(password)
  //     ) {
  //       setFormData({
  //         ...formData,
  //         errorMsg: "All fields are required",
  //       });
  //     } else {
  //       const data = {
  //         firstName,
  //         lastName,
  //         email,
  //         dateOfBirth,
  //         mobile,
  //         status,
  //         accountType,
  //         password,
  //         token,
  //       };

  //       setFormData({ ...formData, loading: true });

  //       updateProfile(data)
  //         .then((response) => {
  //           setFormData({
  //             ...formData,
  //             firstName: "",
  //             lastName: "",
  //             email: "",
  //             dateOfBirth: "",
  //             mobile: "",
  //             status: "",
  //             accountType: "",
  //             password: "",
  //             loading: false,
  //             successMsg: response.data.successMessage,
  //           });
  //         })
  //         .catch((err) => {
  //           setFormData({
  //             ...formData,
  //             loading: false,
  //             errorMsg: err.response.data.errorMessage,
  //           });
  //         });
  //     }
  //   };

  // useEffect(() => {
  //   // your api data
  //   setConsumer(data);
  // }, []);

  const handleChange = (event) => {
    // here set change value
    setUser(event.target.value);
  };

  useEffect(() => {
    // your api data
    getUserById(user_id).then((response) => {
      setUser(response.data);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="content-container">
        <div>
          <div className="Auth-form-container">
            {/* {loading && (
              <div className="text-center pb-4 position-absolute">
                {showLoading()}
              </div>
            )} */}

            <form className="Auth-form" /*onSubmit={handleSubmit}*/>
              <div className="Auth-form-content">
                <h3 className="Auth-form-title">Update Profile</h3>
                {/* {errorMsg && showErrorMsg(errorMsg)}
                {successMsg && showSuccessMsg(successMsg)} */}
                <div className="row">
                  <div className="form-group col-md-6 mt-3">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      placeholder="Enter first name"
                      value={user.firstName}
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
                      value={user.lastName}
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
                      value={user.email}
                      name="email"
                      onChange={handleChange}
                      disabled
                    />
                  </div>
                  <div className="form-group col-md-6 mt-3">
                    <label>Date Of Birth</label>
                    <input
                      type="date"
                      className="form-control mt-1"
                      placeholder="Enter Date Of Birth"
                      value={user.dateOfBirth}
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
                      value={user.mobile}
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
                      value={user.status}
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
                      value={user.accountType}
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
                      value={user.password}
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

export default EditProfile;
