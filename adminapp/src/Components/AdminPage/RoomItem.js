import { useNavigate } from "react-router-dom";
import styles from "./RoomItem.module.css";
const RoomItem = (props) => {
  const navigate = useNavigate();
  const updateRoomHandler = () => {
    navigate(`/room/formroom?mode=update&id=${props.room._id}`);
  };
  const postDeleteRoom = async () => {
    const response = await fetch(`http://localhost:5000/room/deleteroom`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId: props.room._id }),
    });
  };

  const deleteRoomHandler = () => {
    postDeleteRoom();
  };
  return (
    <tr>
      <td>
        <input type="checkbox"></input>
      </td>
      <td className={styles.idColumn}>{props.room._id}</td>
      <td className={styles.titleColumn}>{props.room.title}</td>
      <td className={styles.descColumn}>{props.room.desc}</td>
      <td className={styles.priceColumn}>${props.room.price}</td>
      <td className={styles.maxPeopleColumn}>{props.room.maxPeople}</td>
      <td>
        <button onClick={updateRoomHandler} className={styles.editBtn}>
          Edit
        </button>
        <button className={styles.deleteBtn} onClick={deleteRoomHandler}>
          Delete
        </button>
      </td>
    </tr>
  );
};
export default RoomItem;
