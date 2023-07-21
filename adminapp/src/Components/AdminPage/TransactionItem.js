import styles from "./TransactionItem.module.css";
import React from "react";
const TransactionItem = (props) => {
  const rooms = props.transaction.room.join(", ");

  return (
    <tr>
      <td>
        <input type="checkbox"></input>
      </td>
      <td>{props.transaction._id}</td>
      <td>{props.transaction.user}</td>
      <td>{props.transaction.hotel.name}</td>
      <td>{rooms}</td>
      <td>
        {props.transaction.dateStart} - {props.transaction.dateEnd}
      </td>
      <td>{props.transaction.price}</td>
      <td>{props.transaction.payment}</td>
      <td>{props.transaction.status}</td>
    </tr>
  );
};
export default React.memo(TransactionItem);
