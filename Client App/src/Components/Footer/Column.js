import React from "react";
import styles from "./Column.module.css";
const Column = function (props) {
  //Trả ra JSX code hiển thị từng cột column có các link trong từng cột
  return (
    <div className={styles.column}>
      {props.value.map((value) => (
        <a key={value} href="#">
          {value}
        </a>
      ))}
    </div>
  );
};
export default Column;
