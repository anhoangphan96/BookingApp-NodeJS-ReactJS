import { Link } from "react-router-dom";
import styles from "./SideBar.module.css";

const SideBar = () => {
  return (
    <div className={styles.sidebarContainer}>
      <Link to="/">
        <h2>Admin Page</h2>
      </Link>
      <ul>
        <h4>MAIN</h4>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-layout-dashboard"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 4h6v8h-6z"></path>
            <path d="M4 16h6v4h-6z"></path>
            <path d="M14 12h6v8h-6z"></path>
            <path d="M14 4h6v4h-6z"></path>
          </svg>
          <Link to="/">DashBoard</Link>
        </li>
      </ul>
      <ul>
        <h4>LISTS</h4>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-user"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
          </svg>
          <Link>Users</Link>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-building-skyscraper"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 21l18 0"></path>
            <path d="M5 21v-14l8 -4v18"></path>
            <path d="M19 21v-10l-6 -4"></path>
            <path d="M9 9l0 .01"></path>
            <path d="M9 12l0 .01"></path>
            <path d="M9 15l0 .01"></path>
            <path d="M9 18l0 .01"></path>
          </svg>
          <Link to="/hotel">Hotels</Link>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-door"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M14 12v.01"></path>
            <path d="M3 21h18"></path>
            <path d="M6 21v-16a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v16"></path>
          </svg>
          <Link to="/room">Rooms</Link>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-truck"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
            <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
            <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"></path>
          </svg>
          <Link to="/transaction">Transactions</Link>
        </li>
      </ul>
      <ul>
        <h4>NEW</h4>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-building-skyscraper"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 21l18 0"></path>
            <path d="M5 21v-14l8 -4v18"></path>
            <path d="M19 21v-10l-6 -4"></path>
            <path d="M9 9l0 .01"></path>
            <path d="M9 12l0 .01"></path>
            <path d="M9 15l0 .01"></path>
            <path d="M9 18l0 .01"></path>
          </svg>
          <Link to="/hotel/formhotel?mode=add">New Hotel</Link>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-door"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M14 12v.01"></path>
            <path d="M3 21h18"></path>
            <path d="M6 21v-16a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v16"></path>
          </svg>
          <Link to="/room/formroom?mode=add">New Room</Link>
        </li>
      </ul>
      <ul>
        <h4>USER</h4>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-logout"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
            <path d="M9 12h12l-3 -3"></path>
            <path d="M18 15l3 -3"></path>
          </svg>
          <Link>Logout</Link>
        </li>
      </ul>
    </div>
  );
};
export default SideBar;
