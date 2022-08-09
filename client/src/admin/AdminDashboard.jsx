import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { isAuthenticated } from "../helpers/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api/auth";
import * as AiIcons from "react-icons/ai";
import Pagination from "../components/Pagination";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().accountType === 1) {
      navigate("/admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().accountType === 0) {
      navigate("/user/dashboard");
    } else {
      navigate("/");
    }
  }, [navigate]);

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
        <div>
          <div className="container">
            <div className="table-responsive">
              <div className="table-wrapper">
                <div className="table-title">
                  <div className="row">
                    <div className="col-md-6">
                      <h2>
                        Manage <b>Users</b>
                      </h2>
                    </div>
                    <div className="col-md-6">
                      <a
                        href="/admin/create"
                        className="btn btn-success d-flex align-items-center"
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
                <table className="table table-striped table-hover">
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
                      <tr>
                        <td>
                          <span className="custom-checkbox">
                            <input
                              type="checkbox"
                              id="checkbox1"
                              name="options[]"
                              defaultValue={1}
                            />
                            <label htmlFor="checkbox1" />
                          </span>
                        </td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.dateOfBirth}</td>
                        <td>{user.mobile}</td>
                        <td>{user.status}</td>
                        {user.accountType === 0 ? (
                          <td>User</td>
                        ) : (
                          <td>Admin</td>
                        )}
                        <td>
                          <a
                            href="#editEmployeeModal"
                            className="edit"
                            data-toggle="modal"
                          >
                            <i
                              className="material-icons"
                              data-toggle="tooltip"
                              title="Edit"
                            >
                              <AiIcons.AiTwotoneEdit />
                            </i>
                          </a>
                          <a href="/delete-user/${user.id}" className="delete">
                            <i
                              className="material-icons"
                              data-toggle="tooltip"
                              title="Delete"
                            >
                              <AiIcons.AiTwotoneDelete />
                            </i>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="clearfix">
                  <div className="hint-text">
                    Showing <b>5</b> out of <b>25</b> entries
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
          {/* Edit Modal HTML */}
          <div id="editEmployeeModal" className="modal fade">
            <div className="modal-dialog">
              <div className="modal-content">
                <form>
                  <div className="modal-header">
                    <h4 className="modal-title">Edit Employee</h4>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-hidden="true"
                    >
                      ×
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" className="form-control" required />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" className="form-control" required />
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <textarea
                        className="form-control"
                        required
                        defaultValue={""}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input type="text" className="form-control" required />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <input
                      type="button"
                      className="btn btn-default"
                      data-dismiss="modal"
                      defaultValue="Cancel"
                    />
                    <input
                      type="submit"
                      className="btn btn-info"
                      defaultValue="Save"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
