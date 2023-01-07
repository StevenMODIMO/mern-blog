import { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCreate } from "react-icons/io";
import { CgProfile, CgLogIn } from "react-icons/cg";
import { MdOutlineAppRegistration } from "react-icons/md";
import { FaICursor, FaTimes } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Logo from "../assets/logo.png";
import "./Navbar.css";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [show, setShow] = useState(false);
  let activeStyle = {
    textDecoration: "underline",
  };
  const showNavLinks = () => setShow(!show);
  const closeMobile = () => setShow(false);
  const { user, dispatch } = useAuth();
  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
  };
  return (
    <nav>
      <header>
        <NavLink to="/">
          <img src={Logo} alt="logo" />
        </NavLink>
        <div className="burger" onClick={showNavLinks}>
          {show ? <FaTimes /> : <GiHamburgerMenu />}
        </div>
      </header>
      <motion.main className={show ? "nav-links active" : "nav-links"}>
        {user ? (
          <>
            <div className="create">
              <IoMdCreate className="nav-icon" />
              <NavLink to="/create" onClick={closeMobile}>
                Create
              </NavLink>
            </div>
            <div className="profile">
              <CgProfile className="nav-icon" />
              <NavLink to="/profile" onClick={closeMobile}>
                Profile
              </NavLink>
            </div>
            <div onClick={logout} className='logout'>
              <BiLogOut className="nav-icon" />
              <div>Logout</div>
            </div>
          </>
        ) : (
          <> 
            <div className="signup">
              <MdOutlineAppRegistration className="nav-icon" />
              <NavLink to="/signup" onClick={closeMobile}>
                Signup
              </NavLink>
            </div>
            <div className="login">
              <CgLogIn className="nav-icon" />
              <NavLink to="/login" onClick={closeMobile}>
                Login
              </NavLink>
            </div>{" "}
          </>
        )}
      </motion.main>
    </nav>
  );
}
