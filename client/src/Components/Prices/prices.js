import styles from "./prices.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getPrices,
  updatePrices,
} from "../../StateManagement/Reducers/pricesReducer";

function Prices(props) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    gas: 0,
    electricityDay: 0,
    electricityNight: 0,
  });

  const { prices } = useSelector((state) => state.prices.getPrices);
  const updateState = useSelector((state) => state.prices.updatePrices);

  useEffect(() => {
    dispatch(getPrices());
  }, []);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      ...prices,
    }));
  }, [prices]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(updatePrices(formData));
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2 className={styles.h2}>Energy Prices</h2>

      <div className={styles.formDiv}>
        <span className={styles.formDiv2}>
          <span className={styles.inputDiv}>
            <label className={styles.label}>Electricity (Day) Per kWh</label>
            <input
              type="number"
              step="any"
              className={styles.input}
              onChange={handleChange}
              name="electricityDay"
              required
              value={formData.electricityDay}
            />
          </span>
        </span>

        <span className={styles.formDiv2}>
          <span className={styles.inputDiv}>
            <label className={styles.label}>Electricity (Night) Per kWh</label>
            <input
              type="number"
              step="any"
              className={styles.input}
              onChange={handleChange}
              name="electricityNight"
              required
              value={formData.electricityNight}
            />
          </span>
        </span>
      </div>

      <div className={styles.formDiv}>
        <span className={styles.formDiv2}>
          <span className={styles.inputDiv}>
            <label className={styles.label}>Gas Per kWh</label>
            <input
              type="number"
              step="any"
              className={styles.input}
              onChange={handleChange}
              name="gas"
              required
              value={formData.gas}
            />
          </span>
        </span>
      </div>

      <button className={styles.submit}>Update</button>
    </form>
  );
}

export default Prices;
