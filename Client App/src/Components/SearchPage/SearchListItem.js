import React from "react";
import styles from "./SearchListItem.module.css";
import { useNavigate } from "react-router-dom";
const SearchListItem = function (props) {
  const navigate = useNavigate();
  //Function để viết hoa chữ cái đầu
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const seeDetailHandler = () => {
    navigate(`/detail/${props.id}`);
  };
  //2 Biến string để sử dụng hiển thị cho deal được cancel free hay không trong các khách sạn
  const cancel = "Free cancellation";
  const cancelText = "You can cancel later, so lock in this great price today!";
  // Render ra từng khách sạn thông qua props truyền xuống
  return (
    <div className={styles.searchListItem}>
      <img src={props.image_url}></img>
      <div className={styles.details}>
        <h3>{props.name}</h3>
        <span>{props.distance}m from center</span>
        <span className={styles.tag}>Free Parking</span>
        <span className={styles.description}>
          {capitalizeFirstLetter(props.description)} in {props.city}
        </span>
        <span>{props.type}</span>
      </div>
      <div className={styles.moreInfors}>
        <div className={styles.rateandtext}>
          <span className={styles.ratetext}>{props.rate.toFixed(1)}</span>
        </div>
        <div className={styles.priceandbook}>
          <span className={styles.price}>${props.price}</span>
          <span className={styles.taxfee}>Includes taxes and fees</span>
          <button onClick={seeDetailHandler}>See availability</button>
        </div>
      </div>
    </div>
  );
};
export default SearchListItem;
