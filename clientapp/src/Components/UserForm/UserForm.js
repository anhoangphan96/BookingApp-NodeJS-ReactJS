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
  const [errorInput, setErrorInput] = useState({
    userName: "",
    password: "",
    fullname: "",
    phone: "",
    email: "",
  });
  const [errorWrongData, setErrorWrongData] = useState("");
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
    setErrorInput({
      userName: "",
      password: "",
      fullname: "",
      phone: "",
      email: "",
    });
    setErrorWrongData("");
    let dataUser = {
      userName: userName,
      password: password,
      fullname: fullname,
      phone: phone,
      email: email,
    };
    if (mode === "login") {
      dataUser = {
        userName: userName,
        password: password,
      };
    }
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/access?mode=${mode}`,
      {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(dataUser),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      if (response.status === 400) {
        setErrorInput(error);
      } else if (response.status === 401) {
        setErrorWrongData(error.message);
      } else if (response.status === 409) {
        setErrorInput((prev) => {
          return { ...prev, userName: error.message };
        });
      }
    } else {
      if (mode === "signup") {
        navigate("/user?mode=login");
      } else if (mode === "login") {
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
        {errorInput.userName && <p>{errorInput.userName}</p>}

        <input
          type="password"
          placeholder="Password"
          onChange={passwordInputHandler}
          value={password}
        ></input>
        {errorInput.password && <p>{errorInput.password}</p>}
        {mode === "signup" && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              onChange={fullnameInputHandler}
              value={fullname}
            ></input>
            {errorInput.fullname && <p>{errorInput.fullname}</p>}
            <input
              type="text"
              placeholder="Phone Number"
              onChange={phoneInputHandler}
              value={phone}
            ></input>
            {errorInput.phone && <p>{errorInput.phone}</p>}
            <input
              type="email"
              placeholder="Example@gmail.com"
              onChange={emailInputHandler}
              value={email}
            ></input>
            {errorInput.email && <p>{errorInput.email}</p>}
          </>
        )}
        {errorWrongData && <p>{errorWrongData}</p>}
        <button>{mode === "login" ? "Login" : "Create Account"}</button>
      </form>
    </div>
  );
};
export default UserForm;
