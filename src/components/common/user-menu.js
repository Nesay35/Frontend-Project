import React, { useState } from "react";
import userMenuData from "../../helpers/data/user-menu.json";
import { useSelector } from "react-redux";
import { Button, Offcanvas } from "react-bootstrap";
import { AiFillLock, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./user-menu.scss";


const UserMenu = () => {
  const { isUserLogin, user } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);
  const handleClose = () => setShowMenu(false);
  const handleOpen = () => setShowMenu(true);
  
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








