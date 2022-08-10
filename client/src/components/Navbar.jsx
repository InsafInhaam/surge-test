import React, { Fragment, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { isAuthenticated, logout } from "../helpers/auth";

function Navbar() {
  const navigate = useNavigate();

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  //logout
  const handleLogout = (evt) => {
    logout(() => {
      navigate("/");
    });
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          {isAuthenticated() && (
            <DropdownButton
              id="dropdown-basic-button"
              title={isAuthenticated().firstName}
            >
              <Dropdown.Item onClick={handleLogout}>
                <AiIcons.AiOutlineLogout style={{ color: "#000" }} /> Logout
              </Dropdown.Item>
              <Dropdown.Item href="/profileEdit">
                <AiIcons.AiFillSetting style={{ color: "#000" }} /> Settings
              </Dropdown.Item>
            </DropdownButton>
          )}
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {isAuthenticated().accountType === 1 && (
              <Fragment>
                <li className="nav-text">
                  <Link to="/admin/dashboard" className="nav-text">
                    <AiIcons.AiOutlineTeam />
                    <span>Users</span>
                  </Link>
                </li>
                <li className="nav-text">
                  <Link to="/admin/create" className="nav-text">
                    <AiIcons.AiOutlineUserAdd />
                    <span>Create User</span>
                  </Link>
                </li>
              </Fragment>
            )}
            {isAuthenticated().accountType === 0 && (
              <Fragment>
                <li className="nav-text">
                  <Link to="/user/dashboard" className="nav-text">
                    <AiIcons.AiOutlineFileText />
                    <span>Notes</span>
                  </Link>
                </li>
                <li className="nav-text">
                  <Link to="/user/notes">
                    <AiIcons.AiOutlineFileAdd />
                    <span>Create Note</span>
                  </Link>
                </li>
              </Fragment>
            )}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
