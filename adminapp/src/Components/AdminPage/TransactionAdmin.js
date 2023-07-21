import { useEffect, useState } from "react";
import Card from "../CardContainer/Card";
import styles from "./TransactionAdmin.module.css";
import TransactionItem from "./TransactionItem";
import { useLocation } from "react-router-dom";

const TransactionAdmin = () => {
  const urlLocation = useLocation().pathname;
  console.log(urlLocation);
  const [listTrans, setListTrans] = useState([]);
  const getDataTransactionAdmin = async () => {
    //Nếu như ở dashboard sẽ gọi đến api rout transaction adminlast8 (lấy 8 giao dịch mới nhất) còn không thì sẽ lấy full giao dịch
    const response = await fetch(
      `http://localhost:5000/transaction/transadmin${
        urlLocation === "/" ? "last8" : ""
      }`
    );
    const data = await response.json();
    setListTrans(data);
  };
  useEffect(() => {
    getDataTransactionAdmin();
  }, []);
  console.log(listTrans);
  return (
    <>
      {urlLocation === "/" && <h3>Latest Transactions</h3>}
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
    </>
  );
};
export default TransactionAdmin;
