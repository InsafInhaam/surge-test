import React, { useState } from "react";
import { useEffect } from "react";
import * as AiIcons from "react-icons/ai";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import axios from "axios";
import { Form, Button, Modal } from "react-bootstrap";

const ViewUser = ({ user }) => {
  //store user data
  const [users, setUsers] = useState([]);
  // error || success msg
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  //model show
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    handleClose();
  }, [users]);

  //delete user
  const deleteRow = (id) => {
    axios
      .delete(`http://localhost:5000/api/auth/delete/${id}`)
      .then((response) => {
        setSuccessMsg(response.data.successMessage);
      })
      .catch((err) => {
        setErrorMsg(err.response.data.errorMessage);
      });
  };
  return (
    <>
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
      {user.accountType === 0 ? <td>User</td> : <td>Admin</td>}
      <td>
        <a href="#editEmployeeModal" className="edit" data-toggle="modal">
          <i className="material-icons" data-toggle="tooltip" title="Edit">
            <AiIcons.AiTwotoneEdit />
          </i>
        </a>
        <button
          className="delete outline-none border-0 bg-transparent"
          data-toggle="modal"
          onClick={(e) => deleteRow(user._id)}
        >
          <i
            className="material-icons text-danger"
            data-toggle="tooltip"
            title="Delete"
          >
            <AiIcons.AiTwotoneDelete />
          </i>
        </button>

        <Button
          variant="success"
          className="view outline-none border-0 bg-transparent"
          onClick={handleShow}
        >
          <i
            className="material-icons text-success"
            data-toggle="tooltip"
            title="Delete"
          >
            <AiIcons.AiFillEye />
          </i>
        </Button>
      </td>

      {/* view user modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="name"
                value={user.firstName}
                disabled
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="name"
                value={user.lastName}
                disabled
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={user.email}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control
                type="text"
                placeholder="Date Of Birth"
                value={user.dateOfBirth}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="number"
                placeholder="Mobile"
                value={user.mobile}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Status"
                value={user.status}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Account Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Account Type"
                value={user.accountType === 0 ? "User" : "Admin"}
                disabled
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewUser;
