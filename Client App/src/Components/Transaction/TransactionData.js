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
    //Đặt lại state chứa list transaction và sort theo thứ tự start date giảm dần
    setdataTransaction(
      data.sort(
        (a, b) =>
          Number(Date.parse(b.dateStart)) - Number(Date.parse(a.dateStart))
      )
    );
  };
  useEffect(() => {
    getTransactionData();
  }, []);
  return (
    <div className={styles.transactionContainer}>
      <h3>Your Transactions</h3>
      <table className={styles.tableTransactions}>
        <tbody>
          <tr>
            <th>#</th>
            <th className={styles.hotelColumn}>Hotel</th>
            <th className={styles.roomColumn}>Room</th>
            <th className={styles.dateColumn}>Date</th>
            <th>Price</th>
            <th>Payment Method</th>
            <th className={styles.stutusColumn}>Status</th>
          </tr>
          {dataTransaction.map((trans, i) => (
            <TransactionItem
              transaction={trans}
              key={trans._id}
              order={i + 1}
            ></TransactionItem>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TransactionData;
