import InfoBoard from "../Components/AdminPage/InfoBoard";
import SideBar from "../Components/AdminPage/SideBar";
import TransactionAdmin from "../Components/AdminPage/TransactionAdmin";
import Card from "../Components/CardContainer/Card";
import styles from "./DashBoard.module.css";
const DashBoard = () => {
  return (
    <>
      <InfoBoard />
      {/* Chổ này bọc card ở đây để reuse TransactionAdmin ở cả 2 page dashboard và transactionpage */}
      <Card className={styles.transactionTable}>
        <TransactionAdmin />
      </Card>
    </>
  );
};
export default DashBoard;
