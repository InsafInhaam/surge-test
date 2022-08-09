import axios from "axios";

export const login = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    "http://localhost:5000/api/auth/login",
    data,
    config
  );

  return response;
};

export const createUser = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    "http://localhost:5000/api/auth/create",
    formData,
    config
  );

  return response;
};

export const getUser = async () => {
  const response = await axios.get("http://localhost:5000/api/auth");

  return response;
};

export const getUserById = async (user_id) => {
  const response = await axios.get(
    "http://localhost:5000/api/auth/find/" + user_id
  );

  return response;
};

export const updateProfile = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    "http://localhost:5000/api/auth/updateprofile",
    formData,
    config
  );

  return response;
};
