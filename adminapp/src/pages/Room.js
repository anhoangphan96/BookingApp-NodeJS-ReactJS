import { useEffect, useState } from "react";
import styles from "./Room.module.css";
import { useNavigate } from "react-router-dom";
import RoomItem from "../Components/AdminPage/RoomItem";
import Pagination from "../Components/CardContainer/Pagination";
const Room = () => {
  const navigate = useNavigate();
  const [listRoom, setListRoom] = useState([]);
  const getListRoom = async () => {
    const response = await fetch(`http://localhost:5000/room`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
    });
    const data = await response.json();
    setListRoom(data);
    console.log(data);
  };
  useEffect(() => {
    getListRoom();
  }, []);
  const addnewRoomHandler = () => {
    navigate("/room/formroom?mode=add");
  };
  return (
    <div className={styles.roomListContainer}>
      <div className={styles.title}>
        <h3>Rooms List</h3>
        <button onClick={addnewRoomHandler} className={styles.addNewBtn}>
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
            <th className={styles.titleColumn}>
              <span>Title</span>
            </th>
            <th className={styles.descColumn}>
              <span>Description</span>
            </th>
            <th className={styles.priceColumn}>
              <span>Price</span>
            </th>
            <th className={styles.maxPeopleColumn}>
              <span>Max people</span>
            </th>
            <th>
              <span>Action</span>
            </th>
          </tr>
          {listRoom.length > 0 &&
            listRoom.map((room) => (
              <RoomItem key={room._id} room={room} getListRoom={getListRoom} />
            ))}
          <Pagination listLength={listRoom.length}></Pagination>
        </tbody>
      </table>
    </div>
  );
};
export default Room;

export async function loader() {
  const response = await fetch(`http://localhost:5000/room`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
  });
  return response;
}
