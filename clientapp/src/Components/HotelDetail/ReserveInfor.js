import { useEffect, useState } from "react";
import styles from "./ReserveInfor.module.css";

const ReserveInfor = () => {
  const [username, setUserName] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const getDataUser = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/infor`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );
    const data = await response.json();
    console.log(data);
    setUserName(data.username);
    setUserFullName(data.fullName);
    setUserPhone(data.phoneNumber);
    setUserEmail(data.email);
  };
  useEffect(() => {
    getDataUser();
  }, []);

  const usernameChangeHandler = (event) => {
    setUserName(event.target.value);
  };
  const userFullNameChangeHandler = (event) => {
    setUserFullName(event.target.value);
  };
  const userPhoneChangeHandler = (event) => {
    setUserPhone(event.target.value);
  };
  const userEmailChangeHandler = (event) => {
    setUserEmail(event.target.value);
  };
  return (
    <div className={styles.infor}>
      <h3>Reserve Info</h3>

      <label htmlFor="fullName">Your Full Name:</label>
      <input
        id="fullName"
        placeholder="Full Name"
        value={username}
        onChange={usernameChangeHandler}
      ></input>
      <label htmlFor="email">Your Email:</label>
      <input
        id="email"
        placeholder="Email"
        value={userFullName}
        onChange={userFullNameChangeHandler}
      ></input>
      <label htmlFor="phone">Your Phone Number:</label>
      <input
        id="phone"
        placeholder="Phone Number"
        value={userPhone}
        onChange={userPhoneChangeHandler}
      ></input>
      <label htmlFor="cardnumber">Your Your Identity Card Number:</label>
      <input
        id="cardnumber"
        placeholder="Card Number"
        value={userEmail}
        onChange={userEmailChangeHandler}
      ></input>
    </div>
  );
};
export default ReserveInfor;
