import React from "react";
import styles from "./HotelTypeItem.module.css";
const HotelTypeItem = function (props) {
  //Render ra các HotelType item thông qua các props truyền xuống
  return (
    <div className={styles.hotelTypeItem}>
      <img src={props.image}></img>
      <span className={styles.hotelTypeName}>{props.name}</span>
      <span className={styles.hotelTypeCount}>{props.count} hotels</span>
    </div>
  );
};
export default HotelTypeItem;
