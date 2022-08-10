import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { isAuthenticated } from "../helpers/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api/auth";
import * as AiIcons from "react-icons/ai";
import Pagination from "../components/Pagination";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import ViewUser from "./ViewUser";
import { Table } from "react-bootstrap";

const AdminDashboard = () => {
  //navigate
  const navigate = useNavigate();
  //store user data
  const [users, setUsers] = useState([]);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  //search
  const [query, setQuery] = useState("");
  // error || success msg
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // redirection
  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().accountType === 1) {
      navigate("/admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().accountType === 0) {
      navigate("/user/dashboard");
    } else {
      navigate("/");
    }
  }, [navigate]);

  //fetch users
  getUser().then((response) => {
    setUsers(response.data);
  });

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //search data
  const search = (data) => {
    return data.filter(
      (item) =>
        item.firstName.toLowerCase().includes(query) ||
        item.lastName.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query)
    );
  };

  return (
    <div>
      <Navbar />
      <div className="content-container">
        <div className="w-container">
          <div className="container">
            <div className="table-responsive">
              {errorMsg && showErrorMsg(errorMsg)}
              {successMsg && showSuccessMsg(successMsg)}
              <div className="table-wrapper">
                <div className="table-title">
                  <div className="row">
                    <div className="col-md-6 mob-responsive-title">
                      <h2>
                        Manage <b>Users</b>
                      </h2>
                    </div>
                    <div className="col-md-6">
                      <a
                        href="/admin/create"
                        className="btn btn-success d-flex align-items-center justify-content-center mob-responsive-btn"
                        data-toggle="modal"
                      >
                        <i className="material-icons">
                          <AiIcons.AiFillPlusCircle />
                        </i>
                        <span>Add New Users</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <Table responsive className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>
                        <span className="custom-checkbox">
                          <input type="checkbox" id="selectAll" />
                          <label htmlFor="selectAll" />
                        </span>
                      </th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Date Of Birth</th>
                      <th>Mobile</th>
                      <th>Stauts</th>
                      <th>Account Type</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {search(currentUsers).map((user) => (
                      <tr key={user._id}>
                        <ViewUser user={user} />
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="clearfix">
                  <div className="hint-text">
                    Showing <b>{currentPage}</b> out of <b>{users.length}</b>{" "}
                    entries
                  </div>
                  <Pagination
                    itemsPerPage={usersPerPage}
                    totalItems={users.length}
                    paginate={paginate}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
