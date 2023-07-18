import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import styles from "./UserForm.module.css";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/store";
const UserForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParam] = useSearchParams();
  const mode = searchParam.get("mode");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const userNameInputHandler = (event) => {
    setUserName(event.target.value);
  };
  const passwordInputHandler = (event) => {
    setPassword(event.target.value);
  };
  const fullnameInputHandler = (event) => {
    setFullname(event.target.value);
  };
  const phoneInputHandler = (event) => {
    setPhone(event.target.value);
  };
  const emailInputHandler = (event) => {
    setEmail(event.target.value);
  };
  const submitFormHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5000/user?mode=${mode}`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        userName: userName,
        password: password,
        fullname: fullname,
        phone: phone,
        email: email,
      }),
    });

    if (mode === "signup") {
      if (response.ok) {
        navigate("/user?mode=login");
      }
    } else if (mode === "login") {
      if (!response.ok) {
        const error = await response.json();
        const errorMessage = error.message;
        console.log(errorMessage);
      } else {
        const data = await response.json();
        dispatch(loginActions.LOGIN({ username: data.username }));
        navigate("/");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>
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
        {mode === "signup" && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              onChange={fullnameInputHandler}
              value={fullname}
            ></input>
            <input
              type="number"
              placeholder="Phone Number"
              onChange={phoneInputHandler}
              value={phone}
            ></input>
            <input
              type="email"
              placeholder="Example@gmail.com"
              onChange={emailInputHandler}
              value={email}
            ></input>
          </>
        )}

        <button>{mode === "login" ? "Login" : "Create Account"}</button>
      </form>
    </div>
  );
};
export default UserForm;
