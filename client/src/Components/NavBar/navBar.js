import { NavLink, useNavigate } from "react-router-dom";

import styles from "./navBar.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { AiFillCaretDown } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdPersonPin } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { showModal } from "../../StateManagement/Reducers/modalReducer";
import { logout } from "../../StateManagement/Reducers/userReducer";
import Modal from "../../Components/Modal/modal";

function NavBar() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useSelector((state) => state.user.getUserData);

  const userLinks = [
    <NavLink
      to="readings-user"
      className={(navData) => (navData.isActive ? styles.active : styles.link)}
      key={0}
    >
      Readings
    </NavLink>,

    <NavLink
      to="bills"
      className={(navData) => (navData.isActive ? styles.active : styles.link)}
      key={1}
    >
      Bills
    </NavLink>,

    <NavLink
      to="credit"
      className={(navData) => (navData.isActive ? styles.active : styles.link)}
      key={2}
    >
      Credit
    </NavLink>,
  ];

  const adminLinks = [
    <NavLink
      to="prices"
      className={(navData) => (navData.isActive ? styles.active : styles.link)}
      key={0}
    >
      Prices
    </NavLink>,

    <NavLink
      to="readings-admin"
      className={(navData) => (navData.isActive ? styles.active : styles.link)}
      key={1}
    >
      Meter Readings
    </NavLink>,

    <NavLink
      to="stats"
      className={(navData) => (navData.isActive ? styles.active : styles.link)}
      key={2}
    >
      Statistics
    </NavLink>,
  ];

  return (
    <div className={styles.main}>
      <h1 id={styles.h1}>Shangri-La Energy</h1>

      <div className={styles.links}>
        {user.role == 1 ? adminLinks : userLinks}
      </div>

      <div className={styles.accDiv}>
        <div
          className={styles.menuDiv}
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
        >
          <MdPersonPin className={styles.avatar} size={35} />
          <AiFillCaretDown className={styles.dropIcon} />
          {showMenu && (
            <div className={styles.menu}>
              <div
                className={styles.menuItem}
                onClick={() => {
                  dispatch(logout());
                }}
              >
                <BiLogOut className={styles.menuIcon} />
                <label className={styles.menuText}>Logout</label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
