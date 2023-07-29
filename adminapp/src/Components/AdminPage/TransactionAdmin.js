import { useEffect, useState } from "react";
import Card from "../CardContainer/Card";
import styles from "./TransactionAdmin.module.css";
import TransactionItem from "./TransactionItem";
import { useLocation } from "react-router-dom";
import Pagination from "../CardContainer/Pagination";

const TransactionAdmin = () => {
  const urlLocation = useLocation().pathname;

  const [listTrans, setListTrans] = useState([]);
  const getDataTransactionAdmin = async () => {
    //Nếu như ở dashboard sẽ gọi đến api rout transaction adminlast8 (lấy 8 giao dịch mới nhất) còn không thì sẽ lấy full giao dịch
    const response = await fetch(
      `http://localhost:5000/transaction/transadmin${
        urlLocation === "/" ? "last8" : ""
      }`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );
    const data = await response.json();
    setListTrans(data);
  };
  useEffect(() => {
    getDataTransactionAdmin();
  }, []);

  return (
    <>
      {urlLocation === "/" && <h3>Latest Transactions</h3>}
      <table className={styles.tabledata}>
        <tbody>
          <tr>
            <th className={styles.firstCheckbox}>
              <input type="checkbox"></input>
            </th>
            <th className={styles.transId}>
              <span>ID</span>
            </th>
            <th className={styles.transUser}>
              <span>User</span>
            </th>
            <th className={styles.transHotel}>
              <span>Hotel</span>
            </th>
            <th className={styles.transRoom}>
              <span>Room</span>
            </th>
            <th className={styles.transDate}>
              <span>Date</span>
            </th>
            <th className={styles.transPrice}>
              <span>Price</span>
            </th>
            <th className={styles.transPayMethod}>
              <span>Payment Method</span>
            </th>
            <th>
              <span>Status</span>
            </th>
          </tr>
          {listTrans.length > 0 &&
            listTrans.map((trans, i) => (
              <TransactionItem transaction={trans} key={trans._id} />
            ))}
          <Pagination listLength={listTrans.length}></Pagination>
        </tbody>
      </table>
    </>
  );
};
export default TransactionAdmin;
