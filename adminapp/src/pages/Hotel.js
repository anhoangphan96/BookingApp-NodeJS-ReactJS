import { useEffect, useState } from "react";
import styles from "./Hotel.module.css";
import HotelItem from "../Components/AdminPage/HotelItem";
import { useNavigate } from "react-router-dom";
import Pagination from "../Components/CardContainer/Pagination";

const Hotel = () => {
  const navigate = useNavigate();
  const [listHotel, setListHotel] = useState([]);

  const getListHotel = async () => {
    const response = await fetch(`http://localhost:5000/hotel`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
    });
    const data = await response.json();
    setListHotel(data);
    console.log(data);
  };
  useEffect(() => {
    getListHotel();
  }, []);
  const addnewHotelHandler = () => {
    navigate("/hotel/formhotel?mode=add");
  };

  return (
    <div className={styles.hotelListContainer}>
      <div className={styles.title}>
        <h3>Hotels List</h3>
        <button onClick={addnewHotelHandler} className={styles.addNewBtn}>
          Add New
        </button>
      </div>
      <table className={styles.tabledata}>
        <tbody>
          <tr>
            <th className={styles.firstCheckbox}>
              <input type="checkbox"></input>
            </th>
            <th className={styles.idColumn}>
              <span>ID</span>
            </th>
            <th className={styles.nameColumn}>
              <span>Name</span>
            </th>
            <th className={styles.typeColumn}>
              <span>Type</span>
            </th>
            <th className={styles.titleColumn}>
              <span>Title</span>
            </th>
            <th className={styles.cityColumn}>
              <span>City</span>
            </th>
            <th>
              <span>Action</span>
            </th>
          </tr>
          {listHotel.length > 0 &&
            listHotel.map((hotel) => (
              <HotelItem
                key={hotel._id}
                hotel={hotel}
                getListHotel={getListHotel}
              />
            ))}
          <Pagination listLength={listHotel.length}></Pagination>
        </tbody>
      </table>
    </div>
  );
};
export default Hotel;
