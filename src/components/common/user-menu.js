import React, { useEffect, useState } from "react";
import userMenuData from "../../helpers/data/user-menu.json";
import { useSelector } from "react-redux";
import { Button, Nav, Offcanvas } from "react-bootstrap";
import { AiFillLock, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "./user-menu.scss";


const UserMenu = () => {
  const { isUserLogin, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  const handleClose = () => setShowMenu(false);
  const handleOpen = () => setShowMenu(true);
  

  const handleMenuItems = () => {
    if(!userMenuData || !user.role) return;
    const menu = userMenuData[user.role.toLowerCase()];
    if(!menu) return;

    setMenuItems(menu);
  }

  const handleMenuClick = (link) => {
    navigate(link);
    handleClose();
  };

  useEffect(() => {
    if (isUserLogin) handleMenuItems();
  }, []);

  return (
    <>
      <div className="user-menu">
        {isUserLogin ? (
            <>
            <Button variant="primary" size="sm" onClick={handleOpen}>
                {user.name} <AiOutlineMenu/>
            </Button>
            <Offcanvas show={showMenu} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                <Nav className="flex-column">
                  <Nav.Link onClick={() => handleMenuClick("/dashboard")}>
                    Dashboard
                  </Nav.Link>
                  {menuItems.map((item) => 
                    <Nav.Link
                      key={item.title}
                      onClick={() => handleMenuClick(item.link)}
                    >
                      {item.title}
                    </Nav.Link>
                  )}
                </Nav>
                </Offcanvas.Body>
            </Offcanvas>
            </>
        ) : (
          <Link to="/login">
            <AiFillLock /> Login
          </Link>
        )}
      </div>
    </>
  );
};
export default UserMenu;








