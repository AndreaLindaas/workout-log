import "./Header.scss";
import { Drawer, useMediaQuery } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { isUserLoggedIn, logout } from "../../lib/utils";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width:768px)");
  const navigate = useNavigate();

  const menuClose = () => {
    setMenuOpen(false);
  };
  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };

  const logoutUser = () => {
    logout();
    navigate("/");
  };

  const renderMenuItems = () => {
    return (
      <ul className="headerList">
        {isUserLoggedIn() && (
          <>
            <li>
              <Link to="/excercises">
                <span>Excercises</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <span>Workout log</span>
              </Link>
            </li>
            <li>
              <Link to="/create">
                <span>Create Excercice</span>
              </Link>
            </li>
            <li>
              <Link to="/register-performance">
                <span>Register performance</span>
              </Link>
            </li>
            <li onClick={logoutUser}>
              <span>Logout</span>
            </li>
          </>
        )}
        {!isUserLoggedIn() && (
          <>
            <li>
              <Link to="/login">
                <span>Login</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <span>Sign up</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    );
  };

  if (!isDesktop) {
    return (
      <>
        <div className="menuIcon" onClick={toggleMenu}>
          <MenuIcon />
        </div>

        <Drawer
          anchor="top"
          open={menuOpen}
          onClose={menuClose}
          onClick={closeMenu}
        >
          {renderMenuItems()}
        </Drawer>
      </>
    );
  } else {
    return <>{renderMenuItems()}</>;
  }
}
