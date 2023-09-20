import PopupModal from "../Modal/PopupModal";
import styles from "./UserItem.module.css";
import { useState } from "react";
const UserItem = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const userType = props.user.isAdmin ? "Admin" : "User";
  const postSetAdmin = async () => {
    const response = await fetch(`${process.env.BACKEND_URL}/user/setadmin`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: props.user._id }),
    });
    const messageRes = await response.json();
    setMessage(messageRes.message);
  };
  const setAdminHandler = () => {
    setShowPopup(true);
    postSetAdmin();
  };
  const closeHandler = () => {
    setMessage("");
    setShowPopup(false);
  };
  return (
    <>
      <tr>
        <td className={styles.idColumn}>{props.user._id}</td>
        <td className={styles.usernameColumn}>{props.user.username}</td>
        <td className={styles.passwordColumn}>{props.user.password}</td>
        <td className={styles.fullNameColumn}>{props.user.fullName}</td>
        <td className={styles.phoneColumn}>{props.user.phoneNumber}</td>
        <td className={styles.emailColumn}>{props.user.email}</td>
        <td className={styles.typeColumn}>{userType}</td>
        <td>
          <button className={styles.setAdminBtn} onClick={setAdminHandler}>
            Set Admin
          </button>
        </td>
      </tr>
      {showPopup && (
        <PopupModal message={message}>
          <div className={styles.popupbuttons}>
            <button className={styles.closeBtn} onClick={closeHandler}>
              Close
            </button>
          </div>
        </PopupModal>
      )}
    </>
  );
};
export default UserItem;
