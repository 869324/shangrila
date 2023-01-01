import styles from "./bills.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getBills, pay } from "../../StateManagement/Reducers/billReducer";
import { useEffect } from "react";

function Bills() {
  const dispatch = useDispatch();
  const payState = useSelector((state) => state.bill.pay);
  const { user } = useSelector((state) => state.user.getUserData);
  const { bills } = useSelector((state) => state.bill.getBills);

  useEffect(() => {
    if (user.id) {
      dispatch(getBills(user.id));
    }
  }, [user]);

  return (
    <div className={styles.main}>
      {bills.map((bill, id) => {
        return (
          <div className={styles.bill} key={id}>
            <div className={styles.billDiv}>
              <span className={styles.billDiv2}>
                <span className={styles.infoDiv}>
                  <label className={styles.label}>From Date:</label>
                  <label className={styles.value}>{bill.fromDate}</label>
                </span>
              </span>

              <span className={styles.billDiv2}>
                <span className={styles.infoDiv}>
                  <label className={styles.label}>To Date:</label>
                  <label className={styles.value}>{bill.toDate}</label>
                </span>
              </span>
            </div>

            <div className={styles.billDiv}>
              <span className={styles.billDiv2}>
                <span className={styles.infoDiv}>
                  <label className={styles.label}>Electricity Day:</label>
                  <label className={styles.value}>{bill.electricityDay}</label>
                </span>
              </span>

              <span className={styles.billDiv2}>
                <span className={styles.infoDiv}>
                  <label className={styles.label}>Electricity Night:</label>
                  <label className={styles.value}>
                    {bill.electricityNight}
                  </label>
                </span>
              </span>
            </div>

            <div className={styles.billDiv}>
              <span className={styles.billDiv2}>
                <span className={styles.infoDiv}>
                  <label className={styles.label}>Gas:</label>
                  <label className={styles.value}>{bill.gas}</label>
                </span>
              </span>

              <span className={styles.billDiv2}>
                <span className={styles.infoDiv}>
                  <label className={styles.label}>Standing Charge:</label>
                  <label className={styles.value}>{bill.standingCharge}</label>
                </span>
              </span>
            </div>

            <div className={styles.billDiv}>
              <span className={styles.billDiv2}>
                <span className={styles.infoDiv}>
                  <label className={styles.label}>Total</label>
                  <label className={styles.value}>{bill.total}</label>
                </span>
              </span>
            </div>

            <button className={styles.pay} onClick={() => dispatch(pay(bill))}>
              {payState.loading && payState.currentBill.id == bill.id
                ? "Processing ..."
                : "Pay"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Bills;
