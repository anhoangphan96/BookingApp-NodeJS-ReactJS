import { format } from "date-fns";
import styles from "./TransactionItem.module.css";

const TransactionItem = (props) => {
  let paymentMethod =
    props.transaction.payment === "credit" ? "Credit Card" : "Cash";

  const stateDate = format(
    Date.parse(props.transaction.dateStart),
    "dd/MM/yyyy"
  );
  const endDate = format(Date.parse(props.transaction.dateEnd), "dd/MM/yyyy");
  return (
    <tr>
      <td>{String(props.order).padStart(2, "0")}</td>
      <td>{props.transaction.hotel.name}</td>
      <td>{props.transaction.room.join(", ")}</td>
      <td>
        {stateDate} - {endDate}
      </td>
      <td>${props.transaction.price}</td>
      <td>{paymentMethod}</td>
      <td className={`${styles[props.transaction.status]}`}>
        <span>{props.transaction.status}</span>
      </td>
    </tr>
  );
};

export default TransactionItem;
