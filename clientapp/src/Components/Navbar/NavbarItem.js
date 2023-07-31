import React, { useState } from "react";
import styles from "./NavbarItem.module.css";
const NavbarItem = (props) => {
  const [activePage, setActivePage] = useState(props.activeNav);
  // Hàm function để lift state up khi click vào bất kì navBar item nào
  const pageActiveCurr = () => {
    props.onChangePageActive(props.typeNav);
  };
  //Trả ra JSX để xây dựng navbar item nếu item nào đang active thì thêm class active vào để đóng khung item như yêu cầu
  return (
    <li
      onClick={pageActiveCurr}
      className={`${styles.navbar__item} ${activePage ? styles.active : ""} `}
    >
      <i className={`fa-solid ${props.iconNav}`}></i>
      <span>{props.typeNav}</span>
    </li>
  );
};
export default NavbarItem;
