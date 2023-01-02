import styles from "./credit.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Scanner from "../Scanner/scanner";
import { topup } from "../../StateManagement/Reducers/creditReducer";
import { getUserData } from "../../StateManagement/Reducers/userReducer";

function Credit(props) {
  const [formData, setFormData] = useState({ code: "" });
  const dispatch = useDispatch();

  const topupState = useSelector((state) => state.credit.topup);
  const { user } = useSelector((state) => state.user.getUserData);
  const [scan, setScan] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(getUserData(token));
  }, []);

  useEffect(() => {
    const { status } = topupState;
    if (status) {
      setFormData({
        code: "",
      });
    }
  }, [topupState]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        userId: user.id,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getScan = (code) => {
    setFormData((prev) => ({ ...prev, voucherId: code }));
  };

  const submit = (e) => {
    e.preventDefault();

    dispatch(topup(formData));
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      {scan && <Scanner setScan={setScan} getScan={getScan} />}
      <h2 className={styles.h2}>Top Up Credit</h2>

      <span className={styles.balSpan}>
        <label className={styles.label}>Balance:</label>
        <label className={styles.value}>{user.credit}</label>
      </span>

      <span className={styles.span}>
        <input
          className={styles.input}
          onChange={handleChange}
          name="code"
          required
          placeholder="Voucher Code"
          value={formData.code}
        ></input>
        <button id={styles.btnScan} type="button" onClick={() => setScan(true)}>
          Scan
        </button>
      </span>

      <button className={styles.submit}>
        {topupState.loading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}

export default Credit;
