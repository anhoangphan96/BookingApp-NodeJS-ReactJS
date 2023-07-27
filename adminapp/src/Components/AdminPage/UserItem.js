import styles from "./UserItem.module.css";
const UserItem = (props) => {
  const userType = props.user.isAdmin ? "Admin" : "User";
  const postSetAdmin = async () => {
    const response = await fetch(`http://localhost:5000/useradmin/setadmin`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: props.user._id }),
    });
  };
  const setAdminHandler = () => {
    postSetAdmin();
  };
  return (
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
  );
};
export default UserItem;
