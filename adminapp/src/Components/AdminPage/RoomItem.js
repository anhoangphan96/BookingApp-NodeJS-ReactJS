import { useNavigate } from "react-router-dom";

const RoomItem = (props) => {
  const navigate = useNavigate();
  const updateRoomHandler = () => {
    navigate(`/room/formroom?mode=update&id=${props.room._id}`);
  };
  return (
    <tr>
      <td>
        <input type="checkbox"></input>
      </td>
      <td>{props.room._id}</td>
      <td>{props.room.title}</td>
      <td>{props.room.desc}</td>
      <td>{props.room.price}</td>
      <td>{props.room.maxPeople}</td>
      <td>
        <button onClick={updateRoomHandler}>Edit</button>
        <button>Delete</button>
      </td>
    </tr>
  );
};
export default RoomItem;
