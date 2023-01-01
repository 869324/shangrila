import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import UserRouter from "./Components";
import { useSelector } from "react-redux";
import Login from "./Components/Login/login";
import Notification from "./Components/Notification/notification";
import Modal from "./Components/Modal/modal";
import Signup from "./Components/Signup/signup";

function App() {
  const notification = useSelector((state) => state.notification);

  return (
    <div>
      {notification.show && (
        <Modal>
          <Notification {...notification} />
        </Modal>
      )}

      <Routes>
        <Route path="/" element={<Navigate to={"shangrila"} />} />
        <Route path="/shangrila/*" element={<UserRouter />} />
        <Route path="/login" element={<Login />} />
        {<Route path="/signup" element={<Signup />} />}
      </Routes>
    </div>
  );
}

export default App;
