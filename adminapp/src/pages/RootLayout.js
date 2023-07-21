import { Outlet } from "react-router-dom";
import SideBar from "../Components/AdminPage/SideBar";
import styles from "./RootLayout.module.css";
const RootLayout = () => {
  return (
    <div className={styles.rootContainer}>
      <SideBar />
      <main className={styles.contentSection}>
        <Outlet />
      </main>
    </div>
  );
};
export default RootLayout;
