import { Navigate, Route, Routes } from "react-router-dom";
import MeterReadings from "../MeterReadings/meterReadings";
//import MeterReadings from "../MeterReadings/meterReadings";
import NavBar from "../NavBar/navBar";
import Prices from "../Prices/prices";
import Stats from "../Stats/stats";
//import Prices from "../Prices/prices";
import styles from "./admin.module.scss";
//import Stats from "../Stats/stats";

function Admin(props) {
  return (
    <div className={styles.main}>
      <NavBar />
      <div
        className={styles.panel}
        style={{ backgroundImage: `url("/icons/shangri.jpg")` }}
      >
        <div className={styles.overlay}>
          <Routes>
            <Route path="/" element={<Navigate to={"prices"} />} />
            <Route path="prices" element={<Prices />} />
            <Route path="readings-admin" element={<MeterReadings />} />
            <Route path="stats" element={<Stats />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
export default Admin;
