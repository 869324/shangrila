import styles from "./login.module.scss";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, userReset } from "../../StateManagement/Reducers/userReducer";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({});
  const loginState = useSelector((state) => state.user.login);

  useEffect(() => {
    const { status } = loginState;
    if (status) {
      navigate("/shangrila");
    }
  }, [loginState]);

  useEffect(() => {
    return () => {
      dispatch(userReset("login"));
    };
  }, []);

  const handleChange = (e) => {
    setLoginData((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginData));
  };

  return (
    <div
      className={styles.main}
      style={{ backgroundImage: `url("/icons/shangri.jpg")` }}
    >
      <form onSubmit={onSubmit} className={styles.form}>
        <h2 className={styles.loginHeader2}>Login</h2>

        <div className={styles.inputDiv}>
          <label className={styles.inputLable}>Username</label>

          <input
            type="email"
            className={styles.input}
            onChange={handleChange}
            placeholder="Your Email"
            name="username"
            required
          ></input>
        </div>

        <div className={styles.inputDiv}>
          <label className={styles.inputLable}>Password</label>
          <input
            type="password"
            className={styles.input}
            onChange={handleChange}
            placeholder="Password"
            name="password"
            required
          ></input>
        </div>

        <button type="submit" id={styles.login}>
          {loginState.loading ? "Loading ..." : "Login"}
        </button>

        <Link to="/signup">Create Account</Link>
      </form>
    </div>
  );
}

export default Login;
