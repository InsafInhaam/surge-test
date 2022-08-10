import React from "react";
import Login from "./Auth/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import UserDashboard from "./user/UserDashboard";
import UserCreate from "./admin/UserCreate";
import Notes from "./user/Notes";
import "./App.css";
import EditProfile from "./components/EditProfile";
import EditNote from "./user/EditNote";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
        <Route exact path="/admin/create" element={<UserCreate />} />
        <Route exact path="/user/dashboard" element={<UserDashboard />} />
        <Route exact path="/user/notes" element={<Notes />} />
        <Route exact path="/profileEdit" element={<EditProfile />} />
        <Route exact path="/Updatenotes/:id" element={<EditNote />} />
      </Routes>
    </Router>
  );
};

export default App;
