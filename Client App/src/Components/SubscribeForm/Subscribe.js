import React from "react";
import styles from "./Subscribe.module.css";
const Subscribe = function () {
  //Trả ra JSX code hiển thị phần subcribe
  return (
    <div className={styles.container}>
      <div className={styles.subscribe}>
        <h2>Save time, save money!</h2>
        <p>Sign up and we'll send the best deals to you</p>
        <form>
          <input type="email" placeholder="Your Email" size="40"></input>
          <button>Subscribe</button>
        </form>
      </div>
    </div>
  );
};
export default Subscribe;
