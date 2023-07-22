import { useEffect, useState } from "react";
import styles from "./Room.module.css";
import { useNavigate } from "react-router-dom";
import RoomItem from "../Components/AdminPage/RoomItem";
const Room = () => {
  const navigate = useNavigate();
  const [listRoom, setListRoom] = useState([]);
  const getListRoom = async () => {
    const response = await fetch(`http://localhost:5000/room`);
    const data = await response.json();
    setListRoom(data);
    console.log(data);
  };
  useEffect(() => {
    getListRoom();
  });
  const addnewRoomHandler = () => {
    navigate("/room/formroom?mode=add");
  };
  return (
    <div className={styles.roomListContainer}>
      <div className={styles.title}>
        <h3>Rooms List</h3>
        <button onClick={addnewRoomHandler}>Add New</button>
      </div>
      <table>
        <tbody>
          <tr>
            <th>
              <input type="checkbox"></input>
            </th>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Max people</th>
            <th>Action</th>
          </tr>
          {listRoom.length > 0 &&
            listRoom.map((room) => <RoomItem key={room._id} room={room} />)}
        </tbody>
      </table>
    </div>
  );
};
export default Room;
