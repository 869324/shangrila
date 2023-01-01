import styles from "./signup.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signup } from "../../StateManagement/Reducers/userReducer";
import { PROPERTY_TYPES } from "../../Constants/constants";
import Scanner from "../Scanner/scanner";
import { showNotification } from "../../StateManagement/Reducers/notificationReducer";
import Modal from "../Modal/modal";
import { getPropertyTypes } from "../../StateManagement/Reducers/utilsReducer";

function Signup(props) {
  const [formData, setFormData] = useState({ role: 2 });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signupState = useSelector((state) => state.user.signup);
  const { propertyTypes } = useSelector(
    (state) => state.utils.getPropertyTypes
  );
  const [scan, setScan] = useState(false);

  useEffect(() => {
    dispatch(getPropertyTypes());
  }, []);

  useEffect(() => {
    const { status } = signupState;
    if (status) {
      navigate("/login");
    }
  }, [signupState]);

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

    if (!formData.propertyType) {
      dispatch(showNotification("Choose valid property type!"));
    } else if (formData.password !== formData.confirmPassword) {
      dispatch(showNotification("Your passwords do not match!"));
    } else {
      dispatch(signup(formData));
    }
  };

  return (
    <div
      className={styles.main}
      style={{ backgroundImage: `url("/icons/shangri.jpg")` }}
    >
      {scan && (
        <Modal>
          <Scanner setScan={setScan} getScan={getScan} />
        </Modal>
      )}

      <div className={styles.overlay}>
        <form className={styles.form} onSubmit={submit}>
          <h2 className={styles.h2}>Signup</h2>
          <span className={styles.span}>
            <input
              className={styles.input}
              onChange={handleChange}
              name="email"
              required
              placeholder="Email Address"
            />
          </span>

          <span className={styles.span}>
            <input
              className={styles.input}
              onChange={handleChange}
              name="address"
              required
              placeholder="Home Address"
            />
          </span>

          <span className={styles.span}>
            <select
              className={styles.input}
              onChange={handleChange}
              name="propertyType"
              required
              placeholder="Property Type"
            >
              <option value={null}>PropertyType</option>;
              {propertyTypes.map((type) => {
                return <option value={type.id}>{type.name}</option>;
              })}
            </select>
          </span>

          <span className={styles.span}>
            <input
              className={styles.input}
              onChange={handleChange}
              name="numOfBedrooms"
              required
              placeholder="Num of Bedrooms"
            />
          </span>

          <span className={styles.span}>
            <input
              className={styles.input}
              onChange={handleChange}
              name="voucher"
              required
              placeholder="Voucher"
            ></input>
            <button
              id={styles.btnScan}
              type="button"
              onClick={() => setScan(true)}
            >
              Scan
            </button>
          </span>

          <span className={styles.span}>
            <input
              className={styles.input}
              onChange={handleChange}
              name="password"
              required
              type="password"
              placeholder="Password"
            />
          </span>

          <span className={styles.span}>
            <input
              className={styles.input}
              onChange={handleChange}
              name="confirmPassword"
              required
              type="password"
              placeholder="Confirm Password"
            />
          </span>

          <button className={styles.login}>
            {signupState.loading ? "Loading..." : "Signup"}
          </button>

          <Link to="/Login" className={styles.signup}>
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
