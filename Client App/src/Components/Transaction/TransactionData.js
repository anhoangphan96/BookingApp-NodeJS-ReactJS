import { useEffect, useState } from "react";
import styles from "./TransactionData.module.css";
import TransactionItem from "./TransactionItem";

const TransactionData = () => {
  const [dataTransaction, setdataTransaction] = useState([]);
  const getTransactionData = async () => {
    const response = await fetch(`http://localhost:5000/transaction/data`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    setdataTransaction(data);
  };
  useEffect(() => {
    getTransactionData();
  }, []);
  return (
    <div className={styles.container}>
      <table>
        <tbody>
          <tr>
            <th>#</th>
            <th>Hotel</th>
            <th>Room</th>
            <th>Date</th>
            <th>Price</th>
            <th>Payment Method</th>
            <th>Status</th>
          </tr>
          {dataTransaction.map((trans, i) => (
            <TransactionItem
              transaction={trans}
              key={i + 1}
              order={i + 1}
            ></TransactionItem>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TransactionData;
