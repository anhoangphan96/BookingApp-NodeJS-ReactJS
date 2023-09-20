import Card from "../Components/CardContainer/Card";
import styles from "./User.module.css";
import { useState, useEffect } from "react";
import Pagination from "../Components/CardContainer/Pagination";
import UserItem from "../Components/AdminPage/UserItem";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginActions } from "../store/reduxstore";
const User = () => {
  const [listUser, setListUser] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getListUser = async () => {
    const response = await fetch(`${process.env.BACKEND_URL}/user/listuser`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    if (response.status === 401) {
      dispatch(loginActions.LOGOUT());
      navigate("/login");
    }
    const data = await response.json();
    setListUser(data);
  };
  useEffect(() => {
    getListUser();
  });
  return (
    <Card className={styles.userListInfor}>
      <div className={styles.userListContainer}>
        <div className={styles.title}>
          <h3>Users List</h3>
        </div>
        <table className={styles.tabledata}>
          <tbody>
            <tr>
              <th className={styles.idColumn}>ID</th>
              <th className={styles.usernameColumn}>
                <span>Username</span>
              </th>
              <th className={styles.passwordColumn}>
                <span>Password</span>
              </th>
              <th className={styles.fullNameColumn}>
                <span>Full Name</span>
              </th>
              <th className={styles.phoneColumn}>
                <span>Phone Number</span>
              </th>
              <th className={styles.emailColumn}>
                <span>Email</span>
              </th>
              <th className={styles.typeColumn}>
                <span>User Type</span>
              </th>
              <th>
                <span>Action</span>
              </th>
            </tr>
            {listUser.length > 0 &&
              listUser.map((user) => (
                <UserItem user={user} key={user._id}></UserItem>
              ))}
            <Pagination listLength={listUser.length}></Pagination>
          </tbody>
        </table>
      </div>
    </Card>
  );
};
export default User;
