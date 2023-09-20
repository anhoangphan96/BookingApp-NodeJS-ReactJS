import { useEffect } from "react";
import Card from "../CardContainer/Card";
import styles from "./InfoBoard.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/reduxstore";
const InfoBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userAmount, setUserAmount] = useState(0);
  const [orderAmount, setOrderAmount] = useState(0);
  const [earning, setEarning] = useState(0);
  const [balance, setBalance] = useState(0);
  const getListUser = async () => {
    const response = await fetch(`${process.env.BACKEND_URL}/user/listuser`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    const data = await response.json();
    setUserAmount(data.length);
  };

  const getDataTransactionAdmin = async () => {
    //Nếu như ở dashboard sẽ gọi đến api rout transaction adminlast8 (lấy 8 giao dịch mới nhất) còn không thì sẽ lấy full giao dịch
    const response = await fetch(
      `${process.env.BACKEND_URL}/transaction/transadmin`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );
    if (response.status === 401) {
      dispatch(loginActions.LOGOUT());
      navigate("/login");
    } else {
      const data = await response.json();
      console.log(data);
      const totalEarning = data.reduce(
        (total, trans) => total + trans.price,
        0
      );
      //Tính doanh thu trung bình hằng tháng theo số tháng hiện tại trong năm
      const monthNumber = new Date().getMonth() + 1;
      setOrderAmount(data.length);
      setEarning(totalEarning);
      setBalance((totalEarning / monthNumber).toFixed(2));
    }
  };
  useEffect(() => {
    getListUser();
    getDataTransactionAdmin();
  }, []);
  return (
    <div className={styles.infoBoardContainer}>
      <Card className={styles.inforType}>
        <h3>USERS</h3>
        <h4>{userAmount}</h4>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`icon icon-tabler icon-tabler-user ${styles.iconuser}`}
          width={18}
          height={18}
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          fill="none"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
        </svg>
      </Card>
      <Card className={styles.inforType}>
        <h3>ORDERS</h3>
        <h4>{orderAmount}</h4>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`icon icon-tabler icon-tabler-shopping-cart ${styles.iconorder}`}
          width={18}
          height={18}
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          fill="none"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
          <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
          <path d="M17 17h-11v-14h-2"></path>
          <path d="M6 5l14 1l-1 7h-13"></path>
        </svg>
      </Card>
      <Card className={styles.inforType}>
        <h3>EARNINGS</h3>
        <h4>${earning}</h4>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`icon icon-tabler icon-tabler-coin ${styles.iconearning}`}
          width={18}
          height={18}
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          fill="none"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
          <path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1"></path>
          <path d="M12 7v10"></path>
        </svg>
      </Card>
      <Card className={styles.inforType}>
        <h3>BALANCE</h3>
        <h4>${balance}</h4>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`icon icon-tabler icon-tabler-wallet ${styles.iconbalance}`}
          width={18}
          height={18}
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          fill="none"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12"></path>
          <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4"></path>
        </svg>
      </Card>
    </div>
  );
};
export default InfoBoard;
