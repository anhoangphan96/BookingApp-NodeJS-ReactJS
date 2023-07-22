import { useEffect, useState } from "react";
import styles from "./Hotel.module.css";
import HotelItem from "../Components/AdminPage/HotelItem";
import { useNavigate } from "react-router-dom";

const Hotel = () => {
  const navigate = useNavigate();
  const [listHotel, setListHotel] = useState([]);
  const getListHotel = async () => {
    const response = await fetch(`http://localhost:5000/hotel`);
    const data = await response.json();
    setListHotel(data);
    console.log(data);
  };
  useEffect(() => {
    getListHotel();
  });
  const addnewHotelHandler = () => {
    navigate("/hotel/formhotel?mode=add");
  };
  return (
    <div className={styles.hotelListContainer}>
      <div className={styles.title}>
        <h3>Hotels List</h3>
        <button onClick={addnewHotelHandler}>Add New</button>
      </div>
      <table>
        <tbody>
          <tr>
            <th>
              <input type="checkbox"></input>
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Title</th>
            <th>City</th>
            <th>Action</th>
          </tr>
          {listHotel.length > 0 &&
            listHotel.map((hotel) => (
              <HotelItem key={hotel._id} hotel={hotel} />
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default Hotel;
