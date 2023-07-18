import React from "react";
import HeaderSearch from "./HeaderSearch";
import styles from "./Header.module.css";
const Header = (props) => {
  //Xây dựng component header gồm các phần tử như trong JSX,
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>A lifetime of discounts? It's Genius</h1>
        <p>
          Get rewarded your travels - unlock instant saveing of 10% or more with
          a free acount
        </p>
        <button className={styles.btnSignin}>Sign in/Register</button>
        <HeaderSearch
          isOpenSub={props.isOpenSub}
          finishPick={props.finishPick}
        />
      </div>
    </div>
  );
};
export default Header;
