import styles from "./scanner.module.scss";

import React from "react";
import QrReader from "react-qr-scanner";
import { useDispatch } from "react-redux";
import { showModal } from "../../StateManagement/Reducers/modalReducer";
import { AiOutlineClose } from "react-icons/ai";

function Scanner(props) {
  const dispatch = useDispatch();

  const { setScan, getScan } = props;
  const scanError = () => {
    dispatch(showModal({ showModal: true, action: "error" }));
  };

  return (
    <div className={styles.modalCont}>
      <div className={styles.header} onClick={() => setScan(false)}>
        <h3>Scan QR</h3>
        <AiOutlineClose
          id={styles.close}
          size={21}
          onClick={() => setScan(false)}
        />
      </div>

      <QrReader
        className="scanner"
        delay={100}
        onError={scanError}
        onScan={getScan}
      />
    </div>
  );
}

export default Scanner;
