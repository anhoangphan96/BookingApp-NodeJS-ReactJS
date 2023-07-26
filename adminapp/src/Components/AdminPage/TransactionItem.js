import { format } from "date-fns";
import styles from "./TransactionItem.module.css";
import React from "react";

const TransactionItem = (props) => {
  const rooms = props.transaction.room.join(", ");
  const startDate = format(
    Date.parse(props.transaction.dateStart),
    "dd/MM/yyyy"
  );
  const paymentMethod =
    props.transaction.payment === "credit" ? "Credit Card" : "Cash";

  const endDate = format(Date.parse(props.transaction.dateEnd), "dd/MM/yyyy");
  return (
    <tr>
      <td>
        <input type="checkbox"></input>
      </td>
      <td className={styles.transId}>{props.transaction._id}</td>
      <td className={styles.transUser}>{props.transaction.user}</td>
      <td className={styles.transHotel}>{props.transaction.hotel.name}</td>
      <td className={styles.transRoom}>{rooms}</td>
      <td className={styles.transDate}>
        {startDate} - {endDate}
      </td>
      <td className={styles.transPrice}>${props.transaction.price}</td>
      <td className={styles.transPayMethod}>{paymentMethod}</td>
      <td className={`${styles[props.transaction.status]}`}>
        <span>{props.transaction.status}</span>
      </td>
    </tr>
  );
};
export default React.memo(TransactionItem);
