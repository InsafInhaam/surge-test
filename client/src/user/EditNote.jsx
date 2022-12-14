import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { isAuthenticated } from "../helpers/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getNoteById, updateNote } from "../api/note";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import { useLocation } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import showLoading from "../helpers/loading";

const EditNote = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().accountType === 1) {
      navigate("/admin/dashboard");
    } else if (!isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    errorMsg: false,
    successMsg: false,
    loading: false,
  });

  const { title, description, errorMsg, successMsg, loading } = formData;

  const handleNoteChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      errorMsg: "",
    });
  };

  const location = useLocation();
  const note_id = location.pathname.split("/")[2];

  useEffect(() => {
    // your api data
    getNoteById(note_id).then((response) => {
      setFormData(response.data);
    });
  }, []);

  const handleNoteSubmit = (evt) => {
    evt.preventDefault();
    if (isEmpty(title) || isEmpty(description)) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else {
      const data = { title, description };
      setFormData({ ...formData, loading: true });
      updateNote(note_id, data)
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
          <div className="Auth-form-container" nonValidate>
            {loading && (
              <div className="text-center pb-4 position-absolute">
                {showLoading()}
              </div>
            )}
            <form className="Auth-form" onSubmit={handleNoteSubmit}>
              <div className="Auth-form-content">
                <h3 className="Auth-form-title">Create a Note</h3>
                {errorMsg && showErrorMsg(errorMsg)}
                {successMsg && showSuccessMsg(successMsg)}
                <div className="form-group mt-3">
                  <label>Note title</label>
                  <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Enter note title"
                    name="title"
                    onChange={handleNoteChange}
                    value={title}
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Description</label>
                  <textarea
                    name="description"
                    className="form-control mt-1"
                    placeholder="Enter description"
                    cols="30"
                    rows="10"
                    onChange={handleNoteChange}
                    value={description}
                  ></textarea>
                </div>

                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="btn btn-primary">
                    Update
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

export default EditNote;
