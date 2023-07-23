import React from "react";
import HeaderSearch from "./HeaderSearch";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
const Header = (props) => {
  const navigate = useNavigate();
  //Xây dựng component header gồm các phần tử như trong JSX,
  const landToSignInPage = () => {
    navigate("/user?mode=login");
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>A lifetime of discounts? It's Genius</h1>
        <p>
          Get rewarded your travels - unlock instant saveing of 10% or more with
          a free acount
        </p>
        <button className={styles.btnSignin} onClick={landToSignInPage}>
          Sign in/Register
        </button>
        <HeaderSearch
          isOpenSub={props.isOpenSub}
          finishPick={props.finishPick}
        />
      </div>
    </div>
  );
};
export default Header;
