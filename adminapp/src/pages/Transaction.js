import TransactionAdmin from "../Components/AdminPage/TransactionAdmin";
import styles from "./Transaction.module.css";
const Transaction = () => {
  return (
    <div className={styles.transactionContainer}>
      <h3>Transaction List</h3>
      <TransactionAdmin />
    </div>
  );
};
export default Transaction;
