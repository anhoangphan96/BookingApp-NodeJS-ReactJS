const RoomItem = (props) => {
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
        <button>Edit</button>
        <button>Delete</button>
      </td>
    </tr>
  );
};
export default RoomItem;
