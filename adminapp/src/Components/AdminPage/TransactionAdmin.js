import { useEffect, useState } from "react";
import Card from "../CardContainer/Card";
import styles from "./TransactionAdmin.module.css";
import TransactionItem from "./TransactionItem";

const TransactionAdmin = () => {
  const [listTrans, setListTrans] = useState([]);
  const getDataTransactionAdmin = async () => {
    const response = await fetch(
      `http://localhost:5000/transaction/transadmin`
    );
    const data = await response.json();
    setListTrans(data);
  };
  useEffect(() => {
    getDataTransactionAdmin();
  }, []);
  console.log(listTrans);
  return (
    <Card className={styles.transactionTable}>
      <h3>Latest Transactions</h3>
      <table className={styles.tabledata}>
        <tbody>
          <tr>
            <th>
              <input type="checkbox"></input>
            </th>
            <th>ID</th>
            <th>User</th>
            <th>Hotel</th>
            <th>Room</th>
            <th>Date</th>
            <th>Price</th>
            <th>Payment Method</th>
            <th>Status</th>
          </tr>
          {listTrans.length > 0 &&
            listTrans.map((trans, i) => (
              <TransactionItem transaction={trans} />
            ))}
        </tbody>
      </table>
    </Card>
  );
};
export default TransactionAdmin;
