import "./Header.scss";
import { Drawer, useMediaQuery } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width:768px)");

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
  const renderMenuItems = () => {
    return (
      <ul className="headerList">
        <li>
          <Link to="/">
            <span>Switch user</span>
          </Link>
        </li>
        <li>
          <Link to="/excercises">
            <span>Excercises</span>
          </Link>
        </li>
        <li>
          <Link to="/create">
            <span>Create Excercice</span>
          </Link>
        </li>
        <li>
          <Link to="/register">
            <span>Register performance</span>
          </Link>
        </li>
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
