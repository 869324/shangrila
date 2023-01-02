import styles from "./details.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUserReadings } from "../../../StateManagement/Reducers/readingReducer";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

function Details(props) {
  const dispatch = useDispatch();
  const { user, setSelectedUser } = props;
  const { readings } = useSelector((state) => state.reading.getUserReadings);

  useEffect(() => {
    if (user) {
      dispatch(getUserReadings(user.id));
    }
  }, [user]);

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h2 className={styles.h2}> {user.email}</h2>

        <AiOutlineClose
          className={styles.close}
          size={28}
          onClick={() => setSelectedUser(null)}
        />
      </div>

      <table className={styles.table}>
        <thead>
          <tr className={styles.rowHeader}>
            <th>No</th>
            <th>Date</th>
            <th>Gas</th>
            <th>Electricity (Day)</th>
            <th>Electricity (Night)</th>
          </tr>
        </thead>

        <tbody className={styles.tbody}>
          {readings.map((reading, id) => {
            return (
              <tr className={styles.rowData} key={id}>
                <td>{id + 1}</td>
                <td>{reading.date}</td>
                <td>{reading.gas}</td>
                <td>{reading.electricityDay}</td>
                <td>{reading.electricityNight}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Details;
