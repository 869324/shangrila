import { useDispatch } from "react-redux";
import styles from "./notification.module.scss";
import { resetNotification } from "../../StateManagement/Reducers/notificationReducer";
import { MdError } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { INFO_TYPES } from "../../Constants/constants";

function Notification(props) {
  const { type, message } = props;
  const dispatch = useDispatch();

  return (
    <div
      className={styles.modalContent}
      style={{ width: "35%", height: "35%" }}
    >
      <div className={styles.modalMessage}>
        <p className={styles.message}>{message}</p>
      </div>

      {type == INFO_TYPES.SUCCESS && (
        <FaCheck className={styles.iconOk} size={70} />
      )}

      {type == INFO_TYPES.ERROR && (
        <MdError className={styles.iconError} size={70} />
      )}

      <div className={styles.modalActions}>
        <button id={styles.close} onClick={() => dispatch(resetNotification())}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Notification;
