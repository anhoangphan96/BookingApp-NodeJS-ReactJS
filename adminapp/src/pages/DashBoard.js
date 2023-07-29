import InfoBoard from "../Components/AdminPage/InfoBoard";
import SideBar from "../Components/AdminPage/SideBar";
import TransactionAdmin from "../Components/AdminPage/TransactionAdmin";
import Card from "../Components/CardContainer/Card";
import styles from "./DashBoard.module.css";
import { loginActions } from "../store/reduxstore";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const DashBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkLogin = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/user/checkloginadmin",
        {
          method: "GET",
          credentials: "include",
          mode: "cors",
        }
      );
      if (response.status === 401) {
        dispatch(loginActions.LOGOUT());
        navigate("/login");
      }
      const data = await response.json();
      console.log(data);
      if (data.isLoggedIn) {
        dispatch(
          loginActions.LOGIN({ username: data.username, isAdmin: data.isAdmin })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      <InfoBoard />
      {/* Chổ này bọc card ở đây để reuse TransactionAdmin ở cả 2 page dashboard và transactionpage */}
      <Card className={styles.transactionTable}>
        <TransactionAdmin />
      </Card>
    </>
  );
};
export default DashBoard;
