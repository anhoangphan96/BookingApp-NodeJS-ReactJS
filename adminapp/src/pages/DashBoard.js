import InfoBoard from "../Components/AdminPage/InfoBoard";
import SideBar from "../Components/AdminPage/SideBar";
import TransactionAdmin from "../Components/AdminPage/TransactionAdmin";
import styles from "./DashBoard.module.css";
const DashBoard = () => {
  return (
    <>
      <InfoBoard />
      <TransactionAdmin />
    </>
  );
};
export default DashBoard;
