import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { getUserData } from "../../StateManagement/Reducers/userReducer";
import NavBar from "../NavBar/navBar";
import styles from "./user.module.scss";
import Readings from "../Readings/readings";
import Bills from "../Bills/bills";

function User() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(getUserData(token));
  }, []);

  return (
    <div className={styles.main}>
      <NavBar />
      <div
        className={styles.panel}
        style={{ backgroundImage: `url("/icons/shangri.jpg")` }}
      >
        <div className={styles.overlay}>
          <Routes>
            <Route path="/" element={<Navigate to={"readings-user"} />} />
            <Route path="readings-user" element={<Readings />} />
            <Route path="bills" element={<Bills />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default User;
