import { useNavigate } from "react-router-dom";
import styles from "./HotelItem.module.css";
const HotelItem = (props) => {
  const navigate = useNavigate();
  const editHotelHandler = () => {
    navigate(`/hotel/formhotel?mode=update&id=${props.hotel._id}`);
  };
  const postDeleteHotel = async () => {
    const response = await fetch(`http://localhost:5000/hotel/deletehotel`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hotelId: props.hotel._id }),
    });
  };

  const deleteHotelHandler = () => {
    postDeleteHotel();
  };
  return (
    <tr>
      <td>
        <input type="checkbox"></input>
      </td>
      <td className={styles.idColumn}>{props.hotel._id}</td>
      <td className={styles.nameColumn}>{props.hotel.name}</td>
      <td className={styles.typeColumn}>{props.hotel.type}</td>
      <td className={styles.titleColumn}>{props.hotel.title}</td>
      <td>{props.hotel.city}</td>
      <td>
        <button onClick={editHotelHandler} className={styles.editBtn}>
          Edit
        </button>
        <button className={styles.deleteBtn} onClick={deleteHotelHandler}>
          Delete
        </button>
      </td>
    </tr>
  );
};
export default HotelItem;
