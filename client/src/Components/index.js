import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserData,
  verifyToken,
} from "../StateManagement/Reducers/userReducer";
import User from "./User/user";
import Admin from "./Admin/admin";

function UserRouter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tokenState = useSelector((state) => state.user.verifyToken);
  const { user } = useSelector((state) => state.user.getUserData);

  useEffect(() => {
    navigate("/shangrila");
  }, []);

  useEffect(() => {
    if (!Object.keys(user).length) {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(getUserData(token));
      }
    }
  }, [user]);

  useEffect(() => {
    const { isValid, loading } = tokenState;
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else if (!isValid && !loading) {
      dispatch(verifyToken(token));
    }
  }, [tokenState]);

  return user.role ? (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={user.role == 1 ? "admin" : "user"} />}
      />
      <Route path="user/*" element={<User />} />
      <Route path="admin/*" element={<Admin />} />
    </Routes>
  ) : (
    <Routes></Routes>
  );
}

export default UserRouter;
