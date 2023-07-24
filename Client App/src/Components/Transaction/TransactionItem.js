import { format } from "date-fns";

const TransactionItem = (props) => {
  const stateDate = format(
    Date.parse(props.transaction.dateStart),
    "dd/MM/yyyy"
  );
  const endDate = format(Date.parse(props.transaction.dateEnd), "dd/MM/yyyy");
  return (
    <tr>
      <td>{props.order}</td>
      <td>{props.transaction.hotel.name}</td>
      <td>{props.transaction.room.join(",")}</td>
      <td>
        {stateDate} - {endDate}
      </td>
      <td>${props.transaction.price}</td>
      <td>{props.transaction.payment}</td>
      <td>{props.transaction.status}</td>
    </tr>
  );
};

export default TransactionItem;
