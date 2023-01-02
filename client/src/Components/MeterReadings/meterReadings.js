import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReadings } from "../../StateManagement/Reducers/readingReducer";
import { getUsers } from "../../StateManagement/Reducers/userReducer";
import styles from "./meterReadings.module.scss";

function MeterReadings() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user.getUsers);
  const { readings } = useSelector((state) => state.reading.getReadings);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (users.length && !selectedUser) {
      setSelectedUser(users[0]);
    }
  }, [users]);

  useEffect(() => {
    if (selectedUser) {
      dispatch(getReadings(selectedUser.id));
    }
  }, [selectedUser]);

  return (
    <div className={styles.main}>
      <div className={styles.users}>
        <h2>Users</h2>

        {users.map((user, id) => {
          return (
            <div
              className={
                selectedUser && selectedUser.id == user.id
                  ? styles.userActive
                  : styles.user
              }
              key={id}
              onClick={() => setSelectedUser(user)}
            >
              <label className={styles.label}>{`${id + 1}:`}</label>
              <label className={styles.value}>{user.email}</label>
            </div>
          );
        })}
      </div>

      <div className={styles.readings}>
        <h2>Readings</h2>

        <div className={styles.table}>
          <div className={styles.thead}>
            <span className={styles.th}>Num</span>
            <span className={styles.th}>Date</span>
            <span className={styles.th}>Gas</span>
            <span className={styles.th}>Electricity (Day)</span>
            <span className={styles.th}>Electricity (Night)</span>
          </div>

          {readings.map((reading, id) => {
            return (
              <div className={styles.reading} key={id}>
                <span className={styles.infoDiv}>
                  <label className={styles.value}>{id + 1}</label>
                </span>

                <span className={styles.infoDiv}>
                  <label className={styles.value}>{reading.date}</label>
                </span>

                <span className={styles.infoDiv}>
                  <label className={styles.value}>{reading.gas}</label>
                </span>

                <span className={styles.infoDiv}>
                  <label className={styles.value}>
                    {reading.electricityDay}
                  </label>
                </span>

                <span className={styles.infoDiv}>
                  <label className={styles.value}>
                    {reading.electricityNight}
                  </label>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MeterReadings;
