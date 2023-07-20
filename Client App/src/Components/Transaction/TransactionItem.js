const TransactionItem = (props) => {
  return (
    <tr>
      <td>{props.order}</td>
      <td>{props.transaction.hotel.name}</td>
      <td>{props.transaction.room.join(",")}</td>
      <td>
        {props.transaction.dateStart} - {props.transaction.dateEnd}
      </td>
      <td>${props.transaction.price}</td>
      <td>{props.transaction.payment}</td>
      <td>{props.transaction.status}</td>
    </tr>
  );
};

export default TransactionItem;
