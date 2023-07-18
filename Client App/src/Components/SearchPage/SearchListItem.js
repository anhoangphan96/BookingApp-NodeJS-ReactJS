import React from "react";
import styles from "./SearchListItem.module.css";
const SearchListItem = function (props) {
  //2 Biến string để sử dụng hiển thị cho deal được cancel free hay không trong các khách sạn
  const cancel = "Free cancellation";
  const cancelText = "You can cancel later, so lock in this great price today!";
  // Render ra từng khách sạn thông qua props truyền xuống
  return (
    <div className={styles.searchListItem}>
      <img src={props.image_url}></img>
      <div className={styles.details}>
        <h3>{props.name}</h3>
        <span>{props.distance} from center</span>
        <span className={styles.tag}>{props.tag}</span>
        <span className={styles.description}>{props.description}</span>
        <span>{props.type}</span>
        <span className={styles.cancel}>{props.free_cancel ? cancel : ""}</span>
        <span className={styles.cancel__text}>
          {props.free_cancel ? cancelText : ""}
        </span>
      </div>
      <div className={styles.moreInfors}>
        <div className={styles.rateandtext}>
          <span className={styles.rate}>{props.rate_text}</span>
          <span className={styles.ratetext}>{props.rate}</span>
        </div>
        <div className={styles.priceandbook}>
          <span className={styles.price}>${props.price}</span>
          <span className={styles.taxfee}>Includes taxes and fees</span>
          <button>See availability</button>
        </div>
      </div>
    </div>
  );
};
export default SearchListItem;
