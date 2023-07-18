import React from "react";
import styles from "./HotelItem.module.css";
const HotelItem = function (props) {
  //Render ra các Hotel Item thông qua các props được truyền xuống, khi nhấn vào bất cứ link của hotel nào sẽ được chuyển đến trang hotel detail
  return (
    <div className={styles.hotelItem}>
      <img src={props.image}></img>
      <a
        href={`/detail/${props.id}`}
        target="_blank"
        className={styles.hotelName}
      >
        {props.name}
      </a>
      <span className={styles.hotelCity}>{props.city}</span>
      <span className={styles.hotelPrice}>Starting from ${props.price}</span>
    </div>
  );
};
export default React.memo(HotelItem);
