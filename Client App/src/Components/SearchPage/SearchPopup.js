import React from "react";
import styles from "./SearchPopup.module.css";
import DateRageInput from "../Header/DateRangeInput";
const SearchPopup = function () {
  //Render ra Search PopUp có tái sử dụng lại thẻ Daterange input
  return (
    <div className={styles.searchPopup}>
      <h2>Search</h2>
      <form>
        <label>Destination</label>
        <input type="text" />
        <label>Check-in Date</label>
        <DateRageInput />
        <div>Options</div>
        <div className={styles.options}>
          <div>
            <label>
              Min price <span>per night</span>
            </label>
            <input type="number" size="4"></input>
          </div>
          <div>
            <label>
              Max price <span>per night</span>
            </label>
            <input type="number"></input>
          </div>
          <div>
            <label>Adult</label>
            <input type="number" size="4" placeholder="1"></input>
          </div>
          <div>
            <label>Children</label>
            <input type="number" size="4" placeholder="0"></input>
          </div>
          <div>
            <label>Room</label>
            <input type="number" size="4" placeholder="1"></input>
          </div>
        </div>
        <button className={styles.search}>Search</button>
      </form>
    </div>
  );
};
export default SearchPopup;
