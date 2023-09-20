import { Outlet } from "react-router-dom";
import SideBar from "../Components/AdminPage/SideBar";
import styles from "./RootLayout.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../store/reduxstore";
import { useEffect } from "react";
const RootLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkLogin = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/checkloginadmin`,
        {
          method: "GET",
          credentials: "include",
          mode: "cors",
        }
      );
      if (response.status === 401) {
        dispatch(loginActions.LOGOUT());
        navigate("/login");
      } else {
        const data = await response.json();
        console.log(data);
        if (data.isLoggedIn) {
          dispatch(
            loginActions.LOGIN({
              username: data.username,
              isAdmin: data.isAdmin,
            })
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <div className={styles.rootContainer}>
      <SideBar />
      <main className={styles.contentSection}>
        <Outlet />
      </main>
    </div>
  );
};
export default RootLayout;
