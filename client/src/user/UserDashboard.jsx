import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { isAuthenticated } from "../helpers/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import { getNote } from "../api/note";
import Pagination from "../components/Pagination";
import axios from "axios";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import { Table } from "react-bootstrap";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().accountType === 1) {
      navigate("/admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().accountType === 0) {
      navigate("/user/dashboard");
    } else {
      navigate("/");
    }
  }, [navigate]);

  getNote().then((response) => {
    setNotes(response.data);
  });

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentNotes = notes.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //search data
  const search = (data) => {
    return data.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  };

  const deleteRow = (id) => {
    axios
      .delete(`http://localhost:5000/api/note/${id}`)
      .then((response) => {
        setSuccessMsg(response.data.successMessage);
      })
      .catch((err) => {
        setErrorMsg(err.response.data.errorMessage);
      });
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
                        Manage <b>Notes</b>
                      </h2>
                    </div>
                    <div className="col-md-6">
                      <a
                        href="/user/notes"
                        className="btn btn-success d-flex align-items-center justify-content-center mob-responsive-btn"
                        data-toggle="modal"
                      >
                        <i className="material-icons">
                          <AiIcons.AiFillPlusCircle />
                        </i>
                        <span>Add New Note</span>
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
                      <th>Title</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {search(currentNotes).map((note) => (
                      <tr>
                        <td>
                          <span className="custom-checkbox">
                            <input
                              type="checkbox"
                              id="checkbox1"
                              name="options[]"
                              defaultValue={1}
                              value={note._id}
                            />
                            <label htmlFor="checkbox1" />
                          </span>
                        </td>
                        <td>{note.title}</td>
                        <td>{note.description}</td>
                        <td>
                          <a
                            href={"/Updatenotes/" + note._id}
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
                          <button
                            className="delete outline-none border-0 bg-transparent"
                            data-toggle="modal"
                            onClick={(e) => deleteRow(note._id)}
                          >
                            <i
                              className="material-icons text-danger"
                              data-toggle="tooltip"
                              title="Delete"
                            >
                              <AiIcons.AiTwotoneDelete />
                            </i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="clearfix">
                  <div className="hint-text">
                    Showing <b>{currentPage}</b> out of <b>{notes.length}</b>{" "}
                    entries
                  </div>
                  <Pagination
                    itemsPerPage={usersPerPage}
                    totalItems={notes.length}
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

export default UserDashboard;
