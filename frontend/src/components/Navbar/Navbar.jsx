import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classes from "./navbar.module.css";
import {
  AiOutlineContainer,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { CiDiscount1 } from "react-icons/ci";
import swal from "sweetalert";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { clear } from "../../redux/cartSlice";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import "./res.css";
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { products, price } = useSelector((state) => state.cart);
  const isAdmin = user && user.isAdmin;
  const handleCreate = () => {
    // alert(user.isAdmin);
    if (user === null) {
      return swal({
        title: "You need to login",
        icon: "warning",
      });
    }
    if (user.isAdmin === true) {
      navigate("/create");
    } else {
      return swal({
        title: "You are not Admin",
        icon: "error",
      });
    }
  };
  const logoutHandler = () => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(logout());
        dispatch(clear());
        swal("You have been logged out successfully", {
          icon: "success",
        });
      } else {
      }
    });
  };
  return (
    <>
      <div className={`${classes.container}`}>
        <div className={classes.wrapper}>
          <div className={classes.left}>
            <Link to="/" className={classes.title}>
              Best <span>Recipies</span>
            </Link>
          </div>
          <div className={classes.center}>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <a href="#">Home</a>
              </li>
              <li className={classes.listItem}>
                <a href="#foods">Recepies</a>
              </li>
              <li className={classes.listItem}>
                <a href="#feature">About</a>
              </li>
              <li className={classes.listItem}>
                <a href="#contacts">
                  <CiDiscount1 />
                  &nbsp; Offers
                </a>
              </li>
              {isAdmin && (
                <li className={classes.listItem}>
                  <div onClick={handleCreate}>Create</div>
                </li>
              )}
            </ul>
          </div>
          <div className={classes.right}>

            <div className={classes.cartContainer}>
              <AiOutlineShoppingCart
                className={classes.cartIcon}
                onClick={() => {
                  user
                    ? navigate("/cart")
                    : swal({ title: "You need to login", icon: "warning" });
                }}
              />
              <div className={classes.cartQuantity}>
                {user ? products.length : 0}
              </div>
            </div>
            {user === null ? (
              <Link
                to="/auth"
                className={classes.logout}
                style={{ textDecoration: "none", color: "#191919" }}
              >
                Login/Register
              </Link>
            ) : (
              <button className={classes.logout} onClick={logoutHandler}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
