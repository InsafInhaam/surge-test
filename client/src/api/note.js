import axios from "axios";
import { isAuthenticated } from "../helpers/auth";

export const createNote = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    "http://localhost:5000/api/note",
    formData,
    config
  );

  return response;
};

export const getNote = async () => {
  const user_id = isAuthenticated()._id;

  const response = await axios.get(
    "http://localhost:5000/api/note/find/" + user_id
  );

  return response;
};

export const getNoteById = async (note_id) => {
  const response = await axios.get("http://localhost:5000/api/note/" + note_id);

  return response;
};

export const updateNote = async (note_id, formData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.put(
    "http://localhost:5000/api/note/" + note_id,
    formData,
    config
  );

  return response;
};
