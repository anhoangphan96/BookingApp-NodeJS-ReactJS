import InfoBoard from "../Components/AdminPage/InfoBoard";
import SideBar from "../Components/AdminPage/SideBar";
import TransactionAdmin from "../Components/AdminPage/TransactionAdmin";
import styles from "./DashBoard.module.css";
const DashBoard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <SideBar />
      <div className={styles.infoAndTracs}>
        <InfoBoard />
        <TransactionAdmin />
      </div>
    </div>
  );
};
export default DashBoard;
