import styles from "./modal.module.scss";

function Modal(props) {
  return <div className={styles.modalBg}>{props.children}</div>;
}

export default Modal;
