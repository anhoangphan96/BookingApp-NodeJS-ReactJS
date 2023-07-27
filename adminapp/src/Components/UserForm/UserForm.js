import { useState } from "react";
import styles from "./UserForm.module.css";
import { useNavigate } from "react-router-dom";
const UserForm = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const userNameInputHandler = (event) => {
    setUserName(event.target.value);
  };
  const passwordInputHandler = (event) => {
    setPassword(event.target.value);
  };
  const submitFormHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5000/useradmin/login`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      const errorMessage = error.message;
      console.log(errorMessage);
    } else {
      const data = await response.json();
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form className={styles.formUser} onSubmit={submitFormHandler}>
        <input
          type="text"
          placeholder="User Name"
          onChange={userNameInputHandler}
          value={userName}
        ></input>
        <input
          type="password"
          placeholder="Password"
          onChange={passwordInputHandler}
          value={password}
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default UserForm;
