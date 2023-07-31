import React from "react";
import styles from "./CityItem.module.css";
const CityItem = function (props) {
  //Render ra các city item theo yêu cầu đê bài bằng các props data truyền xuống
  return (
    <div
      className={styles.cityItem}
      style={{ backgroundImage: `url(${props.image})` }}
    >
      <span className={styles.cityName}>{props.name}</span>
      <span className={styles.cityText}>{props.subText}</span>
    </div>
  );
};
export default CityItem;
